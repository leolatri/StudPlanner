import { AddintionDataDTO } from "../../api/types";
import mapperContacts from "./contactsMapper";
import mapperGroups from "./groupsMapper";
import { AddDataModel } from "../types";
import mapperBook from "./booksMapper";
import mapperSubjects from "./subMapper";

export default function mapperAddData(rowData?: AddintionDataDTO): AddDataModel {
    if (!rowData) return {} as AddDataModel;

    return (
        {
            library: mapperBook(rowData.library),
            contacts: mapperContacts(rowData.contacts),
            gropList: mapperGroups(rowData.gropList),
            subjects: mapperSubjects(rowData.subjects),
        }
    );

};