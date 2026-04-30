import { makeAutoObservable, runInAction } from 'mobx';
import { SubjectModel } from '../models/types';
import { testSubjects } from '../testData';
import mapperSubjects from '../models/mappers/subMapper';
import GroupsStore from './groups.store';
import RootStore from './root.store';
import SubjectsAPI from '../services/api/subjects';
import { SubjectDTO } from '../services/types';

class TimetableStore {
    groupStore: GroupsStore;
    subjects: SubjectModel[] = [];
    error: string | null = null;
    loading = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.groupStore = new GroupsStore(rootStore);
        this.rootStore = rootStore;
    }

    async loadData() {
        await this.loadSubjects();
    }

    async loadSubjects() {
        this.loading = true;
        try {
            const data = await SubjectsAPI.getAllSubjects();
            runInAction(() => {
                this.subjects = mapperSubjects(data);
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

    async addSubject(data: Omit<SubjectDTO, 'id'>) {
        this.loading = true;
        try {
            const newSubjectDTO = await SubjectsAPI.addSubject(data);
            runInAction(() => {
                const mapped = mapperSubjects([newSubjectDTO])[0];
                this.subjects.push(mapped);
            });
        } catch (error: any) {
            runInAction(() => this.error = error);
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async deleteSubject(subjectId: string) {
        this.loading = true;
        try {
            await SubjectsAPI.deleteSubject(subjectId);
            runInAction(() => {
                this.subjects = this.subjects.filter((el) => el.id !== subjectId);
            })
        } catch (error: any) {
            runInAction(() => this.error = error)

            console.log('error whth fetch Subs in Timetable');
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    async deleteDay(date: number) {
        this.loading = true;
        try {
            await SubjectsAPI.deleteDay(date);
            runInAction(() => {
                this.subjects = this.subjects.filter(subject => {
                    const subjectDate = subject.timeAndDate;

                    if (!subjectDate) return true;

                    const startOfDay = date;
                    const endOfDay = date + 86400000;

                    return subjectDate < startOfDay || subjectDate >= endOfDay;
                });
            });
        } catch (error: any) {
            runInAction(() => this.error = error);
            console.log('Error deleting day', error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
}

export default TimetableStore;