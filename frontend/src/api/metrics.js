import axios from "axios";
import config from "./config";
import { buildAuthHeader } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getLatestMetrics = async (id) => {
    const headers = await buildAuthHeader();
    const params = {
        last: true,
    }
    try {
        const { data } = await axios.get(
            `users/${id}/metrics`, {
                headers,
                params,
            }
        );
        return data;
    }
    catch (err) {
        throw err;
    }
}

export const postMetrics = async (id, data) => {
    const requestUrl = `users/${id}/metrics`;
    const headers = await buildAuthHeader();
    return axios.post(requestUrl, data, { headers });
}