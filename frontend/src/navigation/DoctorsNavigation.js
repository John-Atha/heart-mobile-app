import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DoctorProfile } from "../screens/Doctors/DoctorProfile";
import { DoctorsSplash } from "../screens/Doctors/DoctorsSplash";

const Stack = createNativeStackNavigator();

export const DoctorsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false, unmountOnBlur: true }} name="Doctors" component={DoctorsSplash} />
            <Stack.Screen options={{ headerShown: false, unmountOnBlur: true }} name="DoctorProfile" component={DoctorProfile} />
        </Stack.Navigator>
    )
}