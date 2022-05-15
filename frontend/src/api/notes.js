import axios from "axios";
import config from "./config";
import { buildAuthHeader, getRequest } from "./helpers";

export const getNotesCall = async (patient_id) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${patient_id}/notes`;
    return getRequest({
        requestUrl,
        headers,
    });
}

export const createNoteCall = async (patient_id, text) => {
    const headers = await buildAuthHeader();
    const requestUrl = `users/${patient_id}/notes`;
    return axios.post(requestUrl, { text }, { headers })
}

export const updateNoteCall = async (note_id, text) => {
    const headers = await buildAuthHeader();
    const requestUrl = `notes/${note_id}`;
    return axios.put(requestUrl, { text }, { headers });
}

export const deleteNoteCall = async (note_id) => {
    const headers = await buildAuthHeader();
    const requestUrl = `notes/${note_id}`;
    return axios.delete(requestUrl, { headers });
}