import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getDoctorsCall = async () => {
    const requestUrl = `users`;
    const params = { kind: "doctors" }
    return getRequest({
        requestUrl,
        params,
    })
}

export const getPatientsCall = async (id) => {
    const requestUrl = `doctors/${id}/patients`;
    const headers = await buildAuthHeader();
    return getRequest({
        requestUrl,
        headers,
    });
}

export const getDoctorSummary = async () => {
    const requestUrl = `doctors/summary`;
    const headers = await buildAuthHeader();
    return getRequest({
        requestUrl,
        headers,
    });
}