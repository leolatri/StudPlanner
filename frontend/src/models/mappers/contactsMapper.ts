import { API_BASE } from "../../services/api/client";
import { ContactDTO } from "../../services/types";
import { ContactModel } from "../types";
import mapperReview from "./feedbackMapper";

export default function mapperContacts(rowData?: ContactDTO[]): ContactModel[] {
    if(!rowData) return [];

    return rowData.map((el) => {
        const email = el.email.length > 0 ? el.email : 'example@mail.com'
        let imgSource: any;
        if (el.img && typeof el.img === 'string') {
            const imgUrl = el.img.startsWith('/static') ? `${API_BASE}${el.img}` : el.img;
            imgSource = { uri: imgUrl };
        } else {
            imgSource = require('../../../assets/teacherDefault.jpg');
        }
        return {
            id: el.id,
            fio: el.fio,
            img: imgSource,
            email: email,
            uniSubjects: el.uniSubjects,
            feedbacks: mapperReview(el.feedbacks),
            feedbackIsLeaved: el.feedbackIsLeaved,
        };
    });
}