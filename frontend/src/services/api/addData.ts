import { AddintionDataDTO, GroupDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class AddDataAPI {
    async getAdditionData(): Promise<AddintionDataDTO> {
        const data = await apiClient.get<AddintionDataDTO>(apiUrls.addition);
        return data;
    };

    async getGroups(): Promise<GroupDTO[]> {
        const data = await apiClient.get<GroupDTO[]>(apiUrls.groups);
        return data;
    };

};

export default new AddDataAPI();