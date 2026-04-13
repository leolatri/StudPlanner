import { UserDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class UserAPI {
    async getUser(): Promise<UserDTO> {
        const data = await apiClient.get<UserDTO>(apiUrls.user);
        return data;
    };

};

export default new UserAPI;