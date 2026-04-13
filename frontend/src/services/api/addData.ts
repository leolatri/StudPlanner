import { AddintionDataDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class AddDataAPI {
    async getAdditionData(): Promise<AddintionDataDTO> {
        const data = await apiClient.get<AddintionDataDTO>(apiUrls.addition);
        return data;
    };

};

export default new AddDataAPI;