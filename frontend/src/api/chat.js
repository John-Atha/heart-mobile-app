import axios from "axios";
import config from "./config";
import { buildAuthHeader } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getMessagesSummaryCall = async () => {
    const headers = await buildAuthHeader();
    try {
        const { data } = await axios.get("/messages/summary", { headers });
        return data;
    } catch (err) {
        throw err;
    }
}

export const getMessagesCall = async (contact) => {
    const headers = await buildAuthHeader();
    const params = { contact }
    try {
        const { data } = await axios.get("/messages", { headers, params });
        return data;
    } catch (err) {
        throw err;
    }
}

export const markAllMessagesSeen = async () => {
    const headers = await buildAuthHeader();
    return axios.put("/messages/seen", {}, { headers });
}

export const sendMessageCall = async ({ text, receiver }) => {
    const headers = await buildAuthHeader();
    return axios.post("/messages", { text, receiver }, { headers });
}