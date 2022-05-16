import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getUserLimits = async (id) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${id}/limits`;
    return getRequest({
        requestUrl,
        headers,
    });
}

export const postUserLimits = async (id, body) => {
    const requestUrl = `users/${id}/limits`;
    const headers = await buildAuthHeader();
    return axios.post(requestUrl, body, { headers });
}

export const updateUserLimits = async (group_id, body) => {
    const requestUrl = `limits/${group_id}`;
    const headers = await buildAuthHeader();
    return axios.put(requestUrl, body, { headers });
}