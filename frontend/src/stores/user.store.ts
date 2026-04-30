import { makeAutoObservable, runInAction } from "mobx";
import { UserWithAddData } from "../models/types";
import { mergeUserWithAdditional } from "../models/mappers/mergeUserWithAddData";
import RootStore from "./root.store";
import UserAPI from '../services/api/user';
import AddDataAPI from '../services/api/addData';
import AuthAPI from '../services/api/auth';
import { UserDTO } from "../services/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
    user: UserWithAddData | null = null;
    loading: boolean = false;
    error: string | null = null;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    async fetchUser() {
        this.loading = true;
        this.error = null;
        try {
            const data = await UserAPI.getUser();
            const add = await AddDataAPI.getAdditionData();
            const fullUser = mergeUserWithAdditional(data, add);
            runInAction(() => {
                this.user = fullUser;
                console.log('Пользователь загружен:', {
                    email: fullUser.user.email,
                    firstName: fullUser.user.first_name,
                    lastName: fullUser.user.second_name,
                    isAdmin: fullUser.user.is_admin,
                    hasAddData: !!fullUser.addData
                });
            });

            await this.rootStore.contactsStore.loadData();
            await this.rootStore.libraryStore.loadData();
            await this.rootStore.timetableStore.loadData();
            await this.rootStore.groupsStors.loadData();

        } catch (error: any) {
            runInAction(() => this.error = error.message);
            if (error.message.includes('401')) {
                await AsyncStorage.removeItem('access_token');
                this.user = null;
            }
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async register(userData: UserDTO): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            await AuthAPI.register(userData);
            console.log('✅ Регистрация успешна, выполняю вход для:', userData.email);
            await this.login(userData.email, userData.password);
        } catch (error: any) {
            runInAction(() => this.error = error.message);
            throw error;
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async login(email: string, password: string): Promise<void> {
        console.log('🔐 Login attempt for:', email);
        this.loading = true;
        this.error = null;
        try {
            const tokenData = await AuthAPI.login(email, password);
            console.log('✅ Login success, token:', tokenData.access_token);
            await AsyncStorage.setItem('access_token', tokenData.access_token);
            await this.fetchUser();
        } catch (error: any) {
            console.error('❌ Login error:', error.message);
            runInAction(() => this.error = error.message);
            throw error;
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async updateUser(updates: { phone_number?: string | null; telegram?: string | null }) {
        this.loading = true;
        this.error = null;
        try {
            const updated = await UserAPI.updateUser(updates);
            runInAction(() => {
                if (this.user) {
                    this.user.user.phone_number = updated.phone_number;
                    this.user.user.telegram = updated.telegram;
                }
            });
            console.log('✅ Профиль обновлён');
        } catch (error: any) {
            runInAction(() => this.error = error.message);
            throw error;
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async logout() {
        this.user = null;
        await AsyncStorage.removeItem('access_token');
    }
}

export default UserStore;