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

export const getUserMetricsStats = async ({ id }) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${id}/metrics/stats`;
    return getRequest({
        requestUrl,
        headers,
    });
}

export const postMetrics = async (id, data) => {
    const requestUrl = `users/${id}/metrics`;
    const headers = await buildAuthHeader();
    return axios.post(requestUrl, data, { headers });
}