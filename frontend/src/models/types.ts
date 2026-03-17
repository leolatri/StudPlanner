import { ImageSourcePropType } from "react-native";

export interface BookModel {
    id: string;
    name: string;
    autors: string[];
    isPersonal: boolean;
};

export interface ContactModel {
    id: string;
    fio: string;
    email: string;
    uniSubjects: string[];
    img: ImageSourcePropType;

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

export interface AddDataModel {
    library: BookModel[];
    gropList: GroupModel[];
    contacts: ContactModel[];
    subjects: SubjectModel[];
}


export interface UserWithAddData {
    user: UserModel;
    addData: AddDataModel;
}