import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import   { styles } from  '../styles/customButton';


const CustomButton = ({ title, onPress, color }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
  
export default CustomButton;
