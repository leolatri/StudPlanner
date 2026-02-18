import { ImageSourcePropType } from "react-native";

export interface BookModel {
    id: string;
    name: string;
    autors: string[];
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
    duration: number;
    professor: string;
    startTime: string;
    endTime: string;
    date: string;
}