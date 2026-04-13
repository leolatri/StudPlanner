import { ContactDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class ContactsAPI {
    async getAllContacts(): Promise<ContactDTO[]> {
        const data = await apiClient.get<ContactDTO[]>(apiUrls.contacts);
        return data;
    };

    async getContact(contactId: string): Promise<ContactDTO> {
        const data = await apiClient.get<ContactDTO>(`${apiUrls.contacts}/${contactId}`);
        return data;
    }

};

export default new ContactsAPI;