import { makeAutoObservable } from 'mobx';
import { SubjectModel } from '../models/types';
import { testSubjects } from '../testData';
import mapperSubjects from '../models/mappers/subMapper';
import GroupsStore from './groups.store';
import RootStore from './root.store';

class TimetableStore {
    groupStore: GroupsStore;
    subjects: SubjectModel[] = [];
    error: string | null = null;
    loading = false;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.groupStore = new GroupsStore(rootStore);
        this.loadSubjects();
    }


    async loadSubjects() {
        this.loading = true;
        try {
            //get ...
            this.subjects = mapperSubjects(testSubjects);
        } catch (error: any) {
            this.error = error;
            console.log('error whth fetch Subs in Timetable');
        } finally {
            this.loading = false;
        }

    }

    toggleGroup(groupId: string) {
        this.groupStore.toggleGroup(groupId);
    }

    get selectedGroups() {
        return this.groupStore.selectedGroupIds;
    }
}

export default TimetableStore;