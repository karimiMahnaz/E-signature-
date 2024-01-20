import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text } from "react-native";

const CustomText = ({
    size,
    fontFamily,
    children,
    styles,
    color = `#f5f5dc`,
}) => {
    return (
        <Text
            style={[
                { fontFamily, fontSize: RFPercentage(size), color },
                styles,
            ]}
        >
            {children}
        </Text>
    );
};  

export default CustomText;
