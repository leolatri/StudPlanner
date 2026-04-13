import { API_BASE, apiClient } from "./client";
import apiUrls from "../urls";
import { UserDTO } from "../types";

class AuthAPI {
    async register(userData: UserDTO): Promise<UserDTO> {
        return apiClient.post<UserDTO>(apiUrls.auth.register, userData);
    }

    async login(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await fetch(`${API_BASE}${apiUrls.auth.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed');
        }
        return response.json();
    }
}

export default new AuthAPI();