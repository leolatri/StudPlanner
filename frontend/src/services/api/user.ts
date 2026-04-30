import { UserDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class UserAPI {
    async getUser(): Promise<UserDTO> {
        const data = await apiClient.get<UserDTO>(apiUrls.user);
        return data;
    }

    async updateUser(updates: { phone_number?: string | null; telegram?: string | null }): Promise<UserDTO> {
        return apiClient.put<UserDTO>(apiUrls.user, updates);
    }
}

export default new UserAPI();