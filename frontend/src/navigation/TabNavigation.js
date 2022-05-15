import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginRegisterScreen } from "../screens/LoginRegisterScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { checkLogged, selectAuth } from "../redux/slices/authSlice";
import { AccountScreen } from "../screens/AccountScreen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { selectPatient } from "../redux/slices/patientSlice";
import { Caption } from "react-native-paper";
import { ChatNavigator } from "./ChatNavigation";
import { DoctorsNavigator } from "./DoctorsNavigation";
import { LogoTitle } from "./Header";
import { PatientMetrics } from "../screens/PatientMetrics";
import { PatientsNavigation } from "./PatientsNavigation";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { logged, isDoctor } = useSelector(selectAuth);
    const { selectedPatient } = useSelector(selectPatient);

    const options = {
        headerTitle: (props) => <LogoTitle {...props} />,
    }

    useEffect(() => {
        dispatch(checkLogged());
    }, [])
    
    const getTabs = () => {
        if (logged) {
            if (!isDoctor) {
                return (
                    <>
                        <Tab.Screen name="Home" component={HomeScreen} options={{ ...options, unmountOnBlur: true}} />
                        <Tab.Screen name="Chat" component={ChatNavigator} options={{ ...options, unmountOnBlur: true}} />
                        <Tab.Screen name="Doctors" component={DoctorsNavigator} options={{ ...options, unmountOnBlur: true}} />
                        {/* <Tab.Screen name="Diseases" component={DiseasesScreen} options={{ ...options, unmountOnBlur: true}} /> */}
                        <Tab.Screen name="Metrics" component={PatientMetrics} options={{ ...options, unmountOnBlur: true}} />
                        <Tab.Screen name="Account" component={AccountScreen} options={{ ...options, unmountOnBlur: true}} />
                    </>
                )
            }
            return (
                <>
                    <Tab.Screen name="Chat" component={ChatNavigator} options={{ ...options, unmountOnBlur: true}} />
                    <Tab.Screen name="Patients" component={PatientsNavigation} options={{ ...options, unmountOnBlur: true}} />
                    <Tab.Screen name="Account" component={AccountScreen} options={{ ...options, unmountOnBlur: true}} />
                </>
            )
        }
        return (
            <>
                <Tab.Screen name="Login" options={options}>
                    {(props) => <LoginRegisterScreen page={"login"} {...props} />}
                </Tab.Screen>
                <Tab.Screen name="Register" options={options}>
                    {(props) => <LoginRegisterScreen page={"register"} {...props} />}
                </Tab.Screen>
            </>
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
    Register: "person",
    Account: "person",
    Chat: "send",
    Diseases: "medical",
    Patients: "medical",
    Doctors: "medkit",
    Metrics: "stats-chart",
}
