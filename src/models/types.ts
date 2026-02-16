import { ImageSourcePropType } from "react-native";

export interface BookModel {
    id: string;
    name: string;
    autors: string[];
};

export interface ContactModel {
    id: string;
    img: ImageSourcePropType;
    fio: string;
    email: string;
    uniSubjects: string[];
};