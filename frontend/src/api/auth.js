import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkLoggedCall = async () => {
    // return Boolean(localStorage.getItem("token"));
    const token = await AsyncStorage.getItem("@token");
    console.log({ token });
    return Boolean(token);
}