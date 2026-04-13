import { Platform } from 'react-native';

export const API_BASE = 'http://127.0.0.1:8000';

// --- остальной код без изменений ---
function getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function headers(extra: Record<string, string> = {}): HeadersInit {
    return {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...extra,
    };
}

async function baseRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const config = {
        ...options,
        headers: {
            ...headers(),
            ...options.headers,
        },
    };
    const response = await fetch(`${API_BASE}${url}`, config);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        return response.json();
    }
    return response.text() as T;
}

export const apiClient = {
    get: <T>(url: string): Promise<T> => baseRequest<T>(url, { method: 'GET' }),
    post: <T>(url: string, body?: any): Promise<T> =>
        baseRequest<T>(url, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body?: any): Promise<T> =>
        baseRequest<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(url: string): Promise<T> => baseRequest<T>(url, { method: 'DELETE' }),
};