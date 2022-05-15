import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getUserMetrics = async ({ id, last=false }) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${id}/metrics`;
    const params = {
        ...(last && { last }),
    };
    return getRequest({
        requestUrl,
        headers,
        params,
    });
}

export const postMetrics = async (id, data) => {
    const requestUrl = `users/${id}/metrics`;
    const headers = await buildAuthHeader();
    return axios.post(requestUrl, data, { headers });
}