import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.apiUrl;

export const getDoctorsCall = async () => {
    try {
        const params = { kind: "doctors "}
        const { data } = await axios.get("/users", { params });
        return data;
    } catch (err) {
        console.log({ err });
        throw err;
    }
}