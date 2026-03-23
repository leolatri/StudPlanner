import { makeAutoObservable, runInAction } from 'mobx';
import { ContactModel, FeedbackModel } from '../models/types';
import { testContacts } from '../testData';
import mapperContacts from '../models/mappers/contactsMapper';

class ContactsStore {
    contacts: ContactModel[] = [];
    feedbackIsLeaved: boolean = false;

    error: string | null = null;
    searchQuery: string = "";
    loading = false;

    constructor(rootStore: any) {
        makeAutoObservable(this);
        this.loadContacts();
    }


    async loadContacts() {
        this.loading = true;
        try {
            //get ...
            runInAction(() => {
                this.contacts = mapperContacts(testContacts);
            })
        } catch (error: any) {
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

    getContact(contactId: string) {
        console.log(this.contacts.find((el) => el.id === contactId));
        return this.contacts.find((el) => el.id === contactId) || null;
    }

    setSearchQuery(val: string) {
        this.searchQuery = val;
    }

    setFeedbackStatus(contactId: string) {
        const contact = this.contacts.find((el) => el.id === contactId);
        if(contact) contact.feedbackIsLeaved = ! contact?.feedbackIsLeaved;

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

    // getFeedbacks(contactId: string): FeedbackModel[] {
    //     if(!this.contacts) return [];

    //     const contact = this.contacts.find((el) => el.id === contactId);

    //     return contact?.feedbacks || [];
    // }

    // getFeedbackCount(contactId: string): number {
    //     return this.getFeedbacks(contactId).length
    // }

    getContactGrade(contactId: string): number {
        if(!this.contacts) return 0;

        const feedbacks = this.getContact(contactId)?.feedbacks;

        if(!feedbacks) return 0;
        let sum = 0;

        feedbacks.forEach((el) => sum += el.grade);

        const res = Math.floor(Math.floor((sum / feedbacks.length) * 10) / 10);

        return res;
    }

}

export default ContactsStore;