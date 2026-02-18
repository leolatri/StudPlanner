import { ImageSourcePropType } from "react-native";

export interface BookDTO {
    id: string;
    name: string;
    autors: string[];
};

export interface ContactDTO {
    id: string;
    // img: string; нужно потом для исп из бд
    img: ImageSourcePropType;
    fio: string;
    email: string;
    uniSubjects: string[];
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