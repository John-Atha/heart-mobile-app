import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkLoggedCall = async () => {
    // return Boolean(localStorage.getItem("token"));
    return await Boolean(AsyncStorage.getItem("@token"));
}