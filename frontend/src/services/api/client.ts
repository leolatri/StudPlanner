import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export let API_BASE: string;


if (Platform.OS === 'android') {
    // Для физического телефона – используйте IP вашего компьютера
    API_BASE = 'http://localhost:8080';  // ваш IP из вывода ifconfig
} else if (Platform.OS === 'ios') {
    API_BASE = 'http://localhost:8080';
} else {
    API_BASE = 'http://localhost:8080';
}

async function getAuthHeader(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('access_token');
    console.log('🔑 Токен из AsyncStorage на Android:', token);
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function headers(extra: Record<string, string> = {}): Promise<HeadersInit> {
    const authHeader = await getAuthHeader();
    return {
        'Content-Type': 'application/json',
        ...authHeader,
        ...extra,
    };
}

async function baseRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = `${API_BASE}${url}`;
    console.log(`🌐 Запрос: ${options.method || 'GET'} ${fullUrl}`);

    const config = {
        ...options,
        headers: await headers(options.headers as Record<string, string>),
    };

    try {
        const response = await fetch(fullUrl, config);
        console.log(`✅ Ответ: ${response.status} ${fullUrl}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return response.json();
        }
        return response.text() as T;
    } catch (error: any) {
        console.error(`❌ Ошибка сети: ${fullUrl}`, error.message);
        throw error;
    }
}

export const apiClient = {
    get: <T>(url: string): Promise<T> => baseRequest<T>(url, { method: 'GET' }),
    post: <T>(url: string, body?: any): Promise<T> =>
        baseRequest<T>(url, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body?: any): Promise<T> =>
        baseRequest<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(url: string): Promise<T> => baseRequest<T>(url, { method: 'DELETE' }),

    postFormData: async <T>(url: string, formData: FormData): Promise<T> => {
        const token = await AsyncStorage.getItem('access_token');
        console.log(`📤 POST ${API_BASE}${url}`);
        for (let pair of (formData as any)._parts) {
            console.log(pair[0], pair[1]);
        }
        const response = await fetch(`${API_BASE}${url}`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
        });
        const text = await response.text();
        console.log('📥 Response:', response.status, text);
        if (!response.ok) throw new Error(text);
        return JSON.parse(text);
    }
};