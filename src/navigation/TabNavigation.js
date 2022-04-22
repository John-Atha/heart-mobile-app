import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginRegisterScreen } from "../screens/LoginRegisterScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { checkLogged, selectAuth } from "../redux/slices/authSlice";
import { AccountScreen } from "../screens/AccountScreen";
import { useEffect } from "react";
import { ChatScreen } from "../screens/ChatScreen";
import { DoctorsScreen } from "../screens/DoctorsScreen";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    const dispatch = useDispatch();

    const { logged } = useSelector(selectAuth);

    useEffect(() => {
        dispatch(checkLogged());
    }, [])
    
    const getTabs = () => {
        if (logged) {
            return (
                <>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Chat" component={ChatScreen} />
                    <Tab.Screen name="Doctors" component={DoctorsScreen} />
                    <Tab.Screen name="Account" component={AccountScreen} />
                </>
            )
        }
        return (
            <Tab.Screen name="Login">
                {(props) => <LoginRegisterScreen page={"login"} {...props} />}
            </Tab.Screen>
        )
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = icons[route.name];
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                })}
            >
                { getTabs() }
            </Tab.Navigator>
        </NavigationContainer>
    )
}


const icons = {
    Home: "home",
    Login: "person",
    Account: "person",
    Chat: "send",
    Doctors: "medkit"
}
