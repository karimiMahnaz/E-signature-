import React from "react";
import { StyleSheet } from "react-native";
import CustomText from "./customText";

const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;

    return (
        <CustomText fontFamily="System" size="1.5" styles={styles.error}>
            {error}
        </CustomText>
    );
};
   
export default ErrorMessage;

const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});
