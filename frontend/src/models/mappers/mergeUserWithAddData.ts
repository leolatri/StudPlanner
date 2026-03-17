import { AddintionDataDTO, UserDTO } from "../../api/types";
import { AddDataModel, UserWithAddData } from "../types";
import mapperBooks from "./booksMapper";
import mapperContacts from "./contactsMapper";
import mapperGroups from "./groupsMapper";
import mapperSubjects from "./subMapper";
import mapperUser from "./userMapper";

export const mergeUserWithAdditional = (user: UserDTO, additional: AddintionDataDTO): UserWithAddData => {
    console.log('log4:');

    const addData: AddDataModel = {
        library: mapperBooks(additional.library).filter((el) => el.isPersonal === true),
        gropList:  mapperGroups(additional.gropList).filter((el) => el.isSelected === true),
        contacts: mapperContacts(additional.contacts),
        subjects: mapperSubjects(additional.subjects),
    }

    console.log('log3:', addData);

    return (
        {
            user: mapperUser(user),
            addData: addData,
        }
    )
};
