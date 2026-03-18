import { makeAutoObservable, runInAction } from 'mobx';
import { ContactModel } from '../models/types';
import { testContacts } from '../testData';
import mapperContacts from '../models/mappers/contactsMapper';

class ContactsStore {
    contacts: ContactModel[] = [];
    error: string | null = null;
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
}

export default ContactsStore;