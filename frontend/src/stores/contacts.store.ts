import { makeAutoObservable, runInAction } from 'mobx';
import { ContactModel, FeedbackModel } from '../models/types';
import { testContacts } from '../testData';
import mapperContacts from '../models/mappers/contactsMapper';
import ContactsAPI from '../services/api/contacts';
import { ContactDTO } from '../services/types';

class ContactsStore {
    contacts: ContactModel[] = [];
    feedbackIsLeaved: boolean = false;

    error: string | null = null;
    searchQuery: string = "";
    loading = false;

    constructor(rootStore: any) {
        makeAutoObservable(this);
    }

    async loadData() {
        await this.loadContacts();
    }

    async loadContacts() {
        this.loading = true;
        try {
            const data = await ContactsAPI.getAllContacts();
            console.log('RAW API response:', JSON.stringify(data, null, 2));
            runInAction(() => {
                this.contacts = mapperContacts(data);
            })
        } catch (error: any) {
            console.log('ERROR');
            runInAction(() => {
                this.error = error;
            })
            console.log('error whth fetch Contacts');
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    async reloadContact(contactId: string) {
        try {
            const data = await ContactsAPI.getContact(contactId);

            const updatedContacts = mapperContacts([data]);
            const updatedContact = updatedContacts[0];
            const index = this.contacts.findIndex(c => c.id === contactId);
            if (index !== -1) {
                this.contacts = [...this.contacts];
                this.contacts[index] = updatedContact;
            } else {
                this.contacts.push(updatedContact);
            }
        } catch (error) {
            console.error('Failed to reload contact', error);
        }
    }

    async addContact(data: Omit<ContactDTO, 'id'>) {
        this.loading = true;
        try {
            const newContactDTO = await ContactsAPI.addContact(data);
            const newContactModel = mapperContacts([newContactDTO])[0];
            runInAction(() => {
                this.contacts.push(newContactModel);
            });
        } catch (error: any) {
            runInAction(() => this.error = error);
            console.error('Failed to add contact', error);
            throw error;
        } finally {
            runInAction(() => { this.loading = false; });
        }
    }

    async updateContact(contactId: string, data: Partial<ContactDTO>) {
        try {
            const updatedDTO = await ContactsAPI.updateContact(contactId, data);
            const updatedModel = mapperContacts([updatedDTO])[0];
            runInAction(() => {
                const index = this.contacts.findIndex(c => c.id === contactId);
                if (index !== -1) {
                    this.contacts[index] = updatedModel;
                }
            });
        } catch (error: any) {
            runInAction(() => { this.error = error; });
            console.error('Failed to update contact', error);
            throw error;
        }
    }

    async deleteContact(contactId: string) {
        this.loading = true;
        try {
            await ContactsAPI.deleteContact(contactId);
            runInAction(() => {
                this.contacts = this.contacts.filter(c => c.id !== contactId);
            });
        } catch (error: any) {
            runInAction(() => this.error = error);
            console.error('Failed to delete contact', error);
            throw error;
        } finally {
            runInAction(() => { this.loading = false; });
        }
    }

    async deleteAllContacts() {
        this.loading = true;
        try {
            await ContactsAPI.deleteAllContacts();
            runInAction(() => {
                this.contacts = [];
            });
        } catch (error: any) {
            runInAction(() => this.error = error);
            console.error('Failed to delete contacts', error);
            throw error;
        } finally {
            runInAction(() => { this.loading = false; });
        }
    }

    getContact(contactId: string) {
        console.log(this.contacts.find((el) => el.id === contactId));
        return this.contacts.find((el) => el.id === contactId) || null;
    }

    setSearchQuery(val: string) {
        this.searchQuery = val;
    }

    setFeedbackStatus(contactId: string) {
        const contact = this.contacts.find((el) => el.id === contactId);
        if (contact) contact.feedbackIsLeaved = !contact?.feedbackIsLeaved;

    }

    // getFeedbackStatus(contactId: string) {
    //     return this.contacts.find((el) => el.id === contactId)?.feedbackIsLeaved;
    // }

    get filteredContacts(): ContactModel[] {
        if (!this.contacts) return [];

        const allContacts = this.contacts;
        const query = this.searchQuery.trim().toLowerCase();

        if (!query) return allContacts;

        return allContacts.filter((el) => el.fio.toLowerCase().includes(query));
    }

    getContactGrade(contactId: string): number {
        if (!this.contacts) return 0;

        const feedbacks = this.getContact(contactId)?.feedbacks;

        if (!feedbacks) return 0;
        let sum = 0;

        feedbacks.forEach((el) => sum += el.grade);

        const res = Math.floor((sum / feedbacks.length) * 10) / 10;

        return res;
    }

}

export default ContactsStore;