import axios from "axios";
import config from "./config";
import { buildAuthHeader } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getLatestMetrics = async (id) => {
    const headers = await buildAuthHeader();
    try {
        const { data } = await axios.get(
            `patients/${id}/metrics/latest`, {
                headers
            }
        );
        return data;
    }
    catch (err) {
        throw err;
    }
}