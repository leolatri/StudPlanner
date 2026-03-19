import { ContactDTO } from "../../api/types";
import { ContactModel } from "../types";
import mapperReview from "./feedbackMapper";

export default function mapperContacts(rowData?: ContactDTO[]): ContactModel[] {
    if(!rowData) return [];

    return rowData.map((el) => ({
        id: el.id,
        fio: el.fio,
        img: el.img,
        email: el.email,
        uniSubjects: el.uniSubjects,
        feedbacks: mapperReview(el.feedbacks),
    }))
} 