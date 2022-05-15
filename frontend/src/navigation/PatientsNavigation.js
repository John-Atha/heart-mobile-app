import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PatientProfile } from "../components/Patients/PatientProfile";
import { PatientsSplash } from "../screens/patients/PatientsSplash";

const Stack = createNativeStackNavigator();

export const PatientsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false, unmountOnBlur: true }}
                name="Patients"
                component={PatientsSplash}
            />
            <Stack.Screen
                options={{ headerShown: false, unmountOnBlur: true }}
                name="PatientProfile"
                component={PatientProfile}
            />
        </Stack.Navigator>
    )
}