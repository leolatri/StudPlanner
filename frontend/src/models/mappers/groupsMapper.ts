import { GroupDTO } from "../../api/types";
import { GroupModel, GroupsCollection } from "../types";

export default function mapperGroups(rowData?: GroupDTO[]): GroupsCollection {
    if (!rowData) return {} as GroupsCollection;

    const allGroups: GroupModel[] = rowData.map((el) => (
        {
            id: el.id,
            name: el.name,
            isActive: el.isActive,
            isSelected: el.isSelected,
        }
    ));

    const selectedGroups = allGroups.filter((el) => el.isSelected === true);
    const notSelectedGroups = allGroups.filter((el) => el.isSelected !== true);

    return {
        allGroups,
        selectedGroups,
        notSelectedGroups,
    }
};