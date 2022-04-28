import axios from "axios";
import config from "./config";
import { buildAuthHeader } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const checkLoggedCall = async () => {
    const headers = await buildAuthHeader();
    return axios.get("/logged", { headers });
}

export const loginCall = (body) => {
    return axios.post("/login", body);
}

export const registerCall = (body) => {
    return axios.post("/users", body);
}