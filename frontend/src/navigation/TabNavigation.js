import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginRegisterScreen } from "../screens/LoginRegisterScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { checkLogged, selectAuth } from "../redux/slices/authSlice";
import { AccountScreen } from "../screens/AccountScreen";
import { useEffect } from "react";
import { ChatScreen } from "../screens/ChatScreen";
import { DoctorsScreen } from "../screens/DoctorsScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DiseasesScreen } from "../screens/DiseasesScreen";
import { selectPatient } from "../redux/slices/patientSlice";
import { PatientProfileScreen } from "../screens/PatientProfileScreen";
import { Text } from "react-native";
import { Caption } from "react-native-paper";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { logged, isDoctor } = useSelector(selectAuth);
    const { selectedPatient } = useSelector(selectPatient);

    useEffect(() => {
        dispatch(checkLogged());
    }, [])
    
    const getTabs = () => {
        if (logged) {
            if (!isDoctor) {
                return (
                    <>
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name="Chat" component={ChatScreen} options={{unmountOnBlur: true}} />
                        <Tab.Screen name="Doctors" component={DoctorsScreen} options={{unmountOnBlur: true}} />
                        <Tab.Screen name="Diseases" component={DiseasesScreen} options={{unmountOnBlur: true}} />
                        <Tab.Screen name="Account" component={AccountScreen} options={{unmountOnBlur: true}} />
                    </>
                )
            }
            return (
                <>
                    <Tab.Screen name="Chat" component={ChatScreen} options={{unmountOnBlur: true}} />
                    { selectedPatient &&
                        <Tab.Screen name="Patient" component={PatientProfileScreen} options={{unmountOnBlur: true}} />
                    }
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
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route}) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let color2 = focused ? "green" : color; 
                            let iconName = icons[route.name];
                            return <Ionicons name={iconName} size={size} color={color2} />;
                        },
                        tabBarLabel: ({ focused, color, position, }) => {
                            let color2 = focused ? "green" : color; 
                            return <Caption position={position} style={{ color: color2 }}>{route.name}</Caption>;
                        },
                        // tabBarStyle: {
                        //     color: "green",
                        // },
                    })}
                >
                    { getTabs() }
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}


const icons = {
    Home: "home",
    Login: "person",
    Account: "person",
    Chat: "send",
    Diseases: "medical",
    Patient: "medical",
    Doctors: "medkit"
}
