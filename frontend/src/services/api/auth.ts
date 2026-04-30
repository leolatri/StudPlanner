import { API_BASE } from './client';
import apiUrls from '../urls';

class AuthAPI {
    async register(userData: any): Promise<any> {
        const response = await fetch(`${API_BASE}${apiUrls.auth.register}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return response.json();
    }
    async login(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
        const response = await fetch(`${API_BASE}${apiUrls.auth.login}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed');
        }
        return response.json();
    }
}

export default new AuthAPI();