import { makeAutoObservable, runInAction } from "mobx";
import { UserWithAddData } from "../models/types";
import { testAdditionData, testUser } from "../testData";
import { mergeUserWithAdditional } from "../models/mappers/mergeUserWithAddData";
import RootStore from "./root.store";

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

        try {
            //get ...
            const userDTO = testUser;
            const addition = testAdditionData;
            const fullUser = mergeUserWithAdditional(userDTO, addition);

            runInAction(() => {
                this.user = fullUser;
            });
        } catch (error: any) {
            runInAction(() => this.error = error.message);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    logout() {
        this.user = null;
    }
}

export default UserStore;