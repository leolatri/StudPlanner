import { UserDTO } from "../../api/types";
import { UserModel } from "../types";

export default function mapperUser(rowData?: UserDTO): UserModel {
    if (!rowData) return {} as UserModel;

    return (
        {
            id: rowData.id,
            email: rowData.email,
            password: rowData.password,
            firstName: rowData.firstName,
            middleName: rowData.middleName,
            secondName: rowData.secondName,
            telegram: rowData.telegram,
            phoneNumber: rowData.phoneNumber,
        }
    )
};