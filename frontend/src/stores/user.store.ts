import { makeAutoObservable, runInAction } from "mobx";
import { UserWithAddData } from "../models/types";
import { mergeUserWithAdditional } from "../models/mappers/mergeUserWithAddData";
import RootStore from "./root.store";
import UserAPI from '../services/api/user';
import AddDataAPI from '../services/api/addData';
import AuthAPI from '../services/api/auth';
import { UserDTO } from "../services/types";

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
                console.log('user: ', fullUser);
            });
        } catch (error: any) {
            runInAction(() => this.error = error.message);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async register(userData: UserDTO): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            await AuthAPI.register(userData);
            await this.login(userData.email, userData.password);
        } catch (error: any) {
            runInAction(() => this.error = error.message);
            throw error;
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async login(email: string, password: string): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            const tokenData = await AuthAPI.login(email, password);
            localStorage.setItem('access_token', tokenData.access_token);
            await this.fetchUser();
        } catch (error: any) {
            runInAction(() => this.error = error.message);
            throw error;
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('access_token');
    }
}

export default UserStore;

/*
 процесс авторизации не завершен

 1) привязать функцию авторизации и регистрации
 2) если пользователь зарегестрирован welcome не показывать
 3) запрос предметов по датам

*/