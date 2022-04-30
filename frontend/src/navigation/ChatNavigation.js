import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatContact } from "../screens/Chat/ChatContact";
import { ChatSplash } from "../screens/Chat/ChatSplash";

const Stack = createNativeStackNavigator();

export const ChatNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false, unmountOnBlur: true }} name="Chat" component={ChatSplash} />
            <Stack.Screen options={{ headerShown: false, unmountOnBlur: true }} name="ChatContact" component={ChatContact} />
        </Stack.Navigator>
    )
}