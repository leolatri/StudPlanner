import { GroupDTO } from "../../api/types";
import { GroupModel } from "../types";

export default function mapperGroups(rowData?: GroupDTO[]): GroupModel[] {
    if (!rowData) return [];

    const groups: GroupModel[] = rowData.map((el) => (
        {
            id: el.id,
            name: el.name,
            isSelected: el.isSelected,
        }
    ));
    console.log('fetch data1', groups);

    return groups;
};