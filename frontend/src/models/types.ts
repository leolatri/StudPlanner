import { ImageSourcePropType } from "react-native";

export const FilterMap = {
    0: 'Все',
    1: 'Добавленные мной',
    2: 'Библиотека университета'
} as const;

export type FilterValue = keyof typeof FilterMap;

export interface BookModel {
    id: string;
    name: string;
    autors: string[];
    isPersonal: boolean;
    url: string;
};

export interface FeedbackModel {
    id: string;
    text: string;
    grade: number;
    autor: string;
    isPersonal: boolean;
}

export interface ContactModel {
    id: string;
    fio: string;
    email: string;
    uniSubjects: string[];
    img: ImageSourcePropType | string;
    feedbacks: FeedbackModel[];
    feedbackIsLeaved: boolean;

};

export interface SubjectModel {
    id: string;
    type: string;
    name: string;
    room: string;
    index: number;
    professor: string;
    startTime: string;
    endTime: string;
    date: string;
}

export interface GroupModel {
    id: string;
    name: string;
    isActive: boolean;
    isSelected: boolean;
}

export interface UserModel {
    id: string;
    email: string;
    password: string;
    firstName: string;
    middleName: string;
    secondName: string;
    telegram: string | null;
    phoneNumber: string | null;

    // personLibrary: BookModel[];
    // selectedGrops: GroupModel[];
}

export interface BooksCollection {
    personalBooks: BookModel[];
    uniBooks: BookModel[];
    allBooks: BookModel[];
}

export interface GroupsCollection {
    notSelectedGroups: GroupModel[];
    selectedGroups: GroupModel[];
    allGroups: GroupModel[];
}

export interface AddDataModel {
    library: BooksCollection;
    groupList: GroupsCollection;
    contacts: ContactModel[];
    subjects: SubjectModel[];
}


export interface UserWithAddData {
    user: UserModel;
    addData: AddDataModel;
}