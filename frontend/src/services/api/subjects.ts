import { SubjectDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class SubjectsAPI {
    async getAllSubjects(date?: string): Promise<SubjectDTO[]> {
        let url = apiUrls.subjects;
        if (date) {
            url += `?date=${date}`;
        }
        return await apiClient.get<SubjectDTO[]>(url);
    }

    async addSubject(data: Omit<SubjectDTO, 'id'>): Promise<SubjectDTO> {
        return apiClient.post<SubjectDTO>('/admin/subjects', data);
    }

    async deleteSubject(subjectId: string): Promise<void> {
        await apiClient.delete(`/admin/subjects/${subjectId}`);
    }

    async deleteDay(time: number): Promise<void> {
        await apiClient.delete(`/admin/subjects/by-date?date=${time}`);
    }
};

export default new SubjectsAPI;