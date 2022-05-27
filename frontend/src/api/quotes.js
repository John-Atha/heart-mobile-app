import axios from "axios";
import config from "./config";
import { getRequest } from "./helpers";

axios.defaults.baseURL = config.apiUrl;

export const getQuotes = async () => {
    const requestUrl = "quotes";
    return getRequest({
        requestUrl,
    });
}