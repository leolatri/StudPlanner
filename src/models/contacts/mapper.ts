import { ContactDTO } from "../../api/types";
import { ContactModel } from "../types";

export default function mapperContacts(rowData?: ContactDTO[]): ContactModel[] {
    if(!rowData) return [];

    return rowData.map((el) => ({
        id: el.id,
        fio: el.fio,
        img: {uri: el.img},
        email: el.email,
        uniSubjects: el.uniSubjects,
    }))
} 