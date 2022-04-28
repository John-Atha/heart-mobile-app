import { HelperText } from "react-native-paper";
import { getFieldErrors } from "./getFieldErrors";

export const renderHelperText = ({name, errors, touched, msg=""}) => {
    const { error, helperText } = getFieldErrors({name, errors, touched});
    if (error) {
        return (
            <HelperText type="error" visible>
                {msg || helperText}
            </HelperText>
        )
    }
    return null;
}