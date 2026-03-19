import { makeAutoObservable, runInAction } from "mobx";
import { GroupModel, GroupsCollection } from "../models/types";
import mapperGroups from "../models/mappers/groupsMapper";
import { testGroups } from "../testData";
import RootStore from "./root.store";

class GroupsStore {
    loading: boolean = false;
    groups: GroupsCollection | null = null;
    error: string | null = null;
    searchQuery: string = "";

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadGroups();
    }

    async loadGroups() {
        this.loading = true;
        try {
            runInAction(() => {
                this.groups = mapperGroups(testGroups);
            })
        } catch (error: any) {
            runInAction(() => {
                this.error = error;
            })
            console.log('Error with fetching Grops', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setSearchQuery(val: string) {
        this.searchQuery = val;
    }

    get filteredGroups(): GroupModel[] {
        if (!this.groups) return [];

        const notSelectedGroups = this.groups.notSelectedGroups;
        const query = this.searchQuery.trim().toLowerCase();

        if (!query) return notSelectedGroups;

        return notSelectedGroups.filter((el) => el.name.toLowerCase().includes(query));
    }

    
    toggleGroupSelection(id: string) {
        if (!this.groups) return;

        const group = this.groups.allGroups.find((g) => g.id === id);
        if (!group) return;

        group.isSelected = !group.isSelected;

        if (group.isSelected) {
            if (!this.groups.selectedGroups.includes(group)) {
                this.groups.selectedGroups.push(group);
            }
            this.groups.notSelectedGroups = this.groups.notSelectedGroups.filter((g) => g.id !== id);
            console.log('selected: ', this.groups.selectedGroups);
            console.log('NOT selected: ', this.groups.notSelectedGroups);
        } else {
            if (!this.groups.notSelectedGroups.includes(group)) {
                this.groups.notSelectedGroups.push(group);
            }
            console.log('selected: ', this.groups.selectedGroups);
            console.log('NOT selected: ', this.groups.notSelectedGroups);


            this.groups.selectedGroups = this.groups.selectedGroups.filter((g) => g.id !== id);
        }

    }

    setActiveGroup(id: string) {
        if (!this.groups) return;

        this.groups.selectedGroups.forEach((g) => g.isActive = false);

        const group = this.groups.selectedGroups.find((g) => g.id === id);

        if (group) {
            group.isActive = true;
        }
    }

    get selectedGroups(): GroupModel[] {
        return this.groups?.selectedGroups ?? [];
    }

    get notSelectedGroups(): GroupModel[] {
        return this.groups?.notSelectedGroups ?? [];
    }

    get allGroups(): GroupModel[] {
        return this.groups?.allGroups ?? [];
    }
};

export default GroupsStore;