import { ImageSourcePropType } from "react-native";

export interface BookDTO {
    id: string;
    name: string;
    owner_id: string | null;
    autors: string[];
    url: string;
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
    img: string;
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
    groups: string[]
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
    first_name: string;
    middle_name: string;
    second_name: string;
    telegram: string | null;
    phone_number: string | null;
    is_admin: boolean;
}

export interface AddintionDataDTO {
    library: BookDTO[];
    groupList: GroupDTO[];
    contacts: ContactDTO[];
    subjects: SubjectDTO[];
}