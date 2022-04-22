import { HelperText } from "react-native-paper";
import { getFieldErrors } from "./getFieldErrors";

export const renderHelperText = ({name, errors, touched}) => {
    const { error, helperText } = getFieldErrors({name, errors, touched});
    if (error) {
        return (
            <HelperText type="error" visible>
                {helperText}
            </HelperText>
        )
    }
    return null;
}