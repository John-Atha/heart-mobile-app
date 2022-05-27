import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getMessagesSummaryCall = async () => {
    const headers = await buildAuthHeader();
    const requestUrl = "/messages/summary";
    return getRequest({
        requestUrl,
        headers,
    });
}

export const getMessagesCall = async (contact) => {
    const headers = await buildAuthHeader();
    const requestUrl = "/messages";
    const params = { contact };
    return getRequest({
        requestUrl,
        params,
        headers,
    });
}

export const markAllMessagesSeen = async () => {
    const headers = await buildAuthHeader();
    return axios.put("/messages/seen", {}, { headers });
}

export const sendMessageCall = async ({ text, receiver }) => {
    const headers = await buildAuthHeader();
    return axios.post("/messages", { text, receiver }, { headers });
}