import { AddintionDataDTO, UserDTO } from "../../services/types";
import { AddDataModel, UserWithAddData } from "../types";
import mapperAddData from "./addDataMapper";
import mapperUser from "./userMapper";

export const mergeUserWithAdditional = (user: UserDTO, additional: AddintionDataDTO): UserWithAddData => {
    return (
        {
            user: mapperUser(user),
            addData: mapperAddData(additional),
        }
    )
};
