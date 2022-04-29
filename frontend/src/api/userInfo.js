import axios from "axios";
import config from "./config";
import { buildAuthHeader } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const updateUserInfoCall = async (body, id) => {
    const headers = await buildAuthHeader();
    return axios.put(`/users/${id}`, body, { headers });
}