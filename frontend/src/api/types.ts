import { ImageSourcePropType } from "react-native";

export interface BookDTO {
    id: string;
    name: string;
    autors: string[];
    isPersonal: boolean;
};

export interface FeedbackDTO {
    id: string;
    text: string;
    grade: number;
    autor: string;
    isPersonal: boolean;
}

export interface ContactDTO {
    id: string;
    // img: string; нужно потом для исп из бд
    img: ImageSourcePropType;
    fio: string;
    email: string;
    uniSubjects: string[];
    feedbacks: FeedbackDTO[];
    feedbackIsLeaved: boolean;
};

export interface SubjectDTO {
    id: string;
    type: string;
    name: string;
    room: string;
    index: number;
    duration: number;
    professor: string;
    timeAndDate: number;
};

export interface GroupDTO {
    id: string;
    name: string;
    isActive: boolean;
    isSelected: boolean;
}

export interface UserDTO {
    id: string;
    email: string;
    password: string;
    firstName: string;
    middleName: string;
    secondName: string;
    telegram: string | null;
    phoneNumber: string | null;
}

export interface AddintionDataDTO {
    library: BookDTO[];
    gropList: GroupDTO[];
    contacts: ContactDTO[];
    subjects: SubjectDTO[];
}