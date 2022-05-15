import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "./config";

export const buildAuthHeader = async () => {
    const token = await AsyncStorage.getItem('@token');
    const headers = {
        "Authorization": "Bearer "+ token,
    }
    return headers;
}

axios.defaults.baseURL = config.apiUrl;
export const getRequest = async ({ requestUrl, headers, params }) => {
    return axios.get(
        requestUrl,
        {
            ...(headers && { headers }),
            ...(params && { params }),
        }
    ).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(err => {
        console.log(err);
        throw err;
    })
}