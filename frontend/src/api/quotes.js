import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.apiUrl;

export const getQuotes = async () => {
    try {
        const { data } = await axios.get(`quotes`);
        return data;
    }
    catch (err) {
        throw err;
    }
}