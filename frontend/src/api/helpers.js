import AsyncStorage from "@react-native-async-storage/async-storage";

export const buildAuthHeader = async () => {
    const token = await AsyncStorage.getItem('@token');
    const headers = {
        "Authorization": "Bearer "+ token,
    }
    return headers;
}
