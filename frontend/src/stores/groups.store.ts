import { makeAutoObservable } from "mobx";
import { GroupModel, UserModel } from "../models/types";
import mapperGroups from "../models/mappers/groupsMapper";
import { testGroups } from "../testData";
import RootStore from "./root.store";

class GroupsStore {
    loading: boolean = false;
    groups: GroupModel[] | null = null;
    selectedGroupIds: string[] = [];
    error: string | null = null;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadGroups();
    }

    async loadGroups() {
        this.loading = true;
        try {
            this.groups = mapperGroups(testGroups);

        } catch (error: any) {
            console.log('Error with fetching Grops', error);
        } finally {
            this.loading = false;
        }
    }

    toggleGroup(groupId: string) {
        const group = this.groups?.find((g) => g.id === groupId);
        if (group) {
            group.isSelected = !group.isSelected;
            if (group.isSelected) {
                this.selectedGroupIds.push(groupId);
            } else {
                this.selectedGroupIds = this.selectedGroupIds.filter((id) => id !== groupId);
            }
        }
    }
};

export default GroupsStore;