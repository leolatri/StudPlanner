import { UserDTO } from "../../services/types";
import { UserModel } from "../types";

export default function mapperUser(rowData?: UserDTO): UserModel {
    if (!rowData) return {} as UserModel;

    return (
        {
            id: rowData.id,
            email: rowData.email,
            password: rowData.password,
            first_name: rowData.first_name,
            middle_name: rowData.middle_name,
            second_name: rowData.second_name,
            telegram: rowData.telegram,
            phone_number: rowData.phone_number,
            is_admin: rowData.is_admin,
        }
    )
};