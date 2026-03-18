import { makeAutoObservable, runInAction } from 'mobx';
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
            runInAction(() => {
                this.subjects = mapperSubjects(testSubjects);
            })
        } catch (error: any) {
            runInAction(() => this.error = error)

            console.log('error whth fetch Subs in Timetable');
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    get selectedGroups() {
        return this.groupStore.selectedGroups;
    }
}

export default TimetableStore;