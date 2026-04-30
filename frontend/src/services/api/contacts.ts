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


    async addContact(data: Omit<ContactDTO, 'id'>): Promise<ContactDTO> {
        return apiClient.post<ContactDTO>(`/admin${apiUrls.contacts}`, data);
    }

    async updateContact(contactId: string, data: Partial<ContactDTO>): Promise<ContactDTO> {
        return apiClient.put<ContactDTO>(`/admin${apiUrls.contacts}/${contactId}`, data);
    }

    async deleteContact(contactId: string): Promise<void> {
        await apiClient.delete(`/admin${apiUrls.contacts}/${contactId}`);
    }

    async deleteAllContacts(): Promise<void> {
        await apiClient.delete(`/admin/contacts/all`);
    }

};

export default new ContactsAPI;