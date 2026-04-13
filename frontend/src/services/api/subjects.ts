import { SubjectDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class SubjectsAPI {
    async getAllSubjects(date?: string): Promise<SubjectDTO[]> {
        let url = apiUrls.subjects;
        if (date) {
            url += `?date=${date}`;
        }
        return apiClient.get<SubjectDTO[]>(url);
    }
};

export default new SubjectsAPI;