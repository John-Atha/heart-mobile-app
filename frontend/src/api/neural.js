import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getAverages = async (id) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${id}/metrics/average`;
    return getRequest({
        requestUrl,
        headers,
    });
}

export const postToModel = async (body) => {
    const requestUrl = `/model/predict`;
    return axios.post(requestUrl, body);
}