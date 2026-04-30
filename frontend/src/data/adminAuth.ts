import * as Crypto from 'expo-crypto';

const SECRET_KEY = 'your-secret-key-min-16-chars';

const hashPassword = async (password: string): Promise<string> => {
    const input = password + SECRET_KEY;
    const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        input
    );
    return hash;
};

let adminPasswordHash: string | null = null;

const init = async () => {
    if (!adminPasswordHash) {
        adminPasswordHash = await hashPassword('admin123');
    }
};
init();

export const ADMIN_CREDENTIALS = {
    username: 'admin',
    get passwordHash() {
        return adminPasswordHash;
    },
};

export const authenticateAdmin = async (username: string, password: string): Promise<boolean> => {
    const hashedInputPassword = await hashPassword(password);
    return (
        username === ADMIN_CREDENTIALS.username &&
        hashedInputPassword === ADMIN_CREDENTIALS.passwordHash
    );
};