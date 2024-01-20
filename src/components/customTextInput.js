import React, {useState, useEffect} from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomTextInput = ({ icon, ...otherProps }) => {

    const [osType, setOsType] =useState('');

    useEffect(() => {
        if (Platform.OS ==='android'){
            setOsType('android');
        } else {
            setOsType('ios');
        }
    }, []);

    return (
        <View style={osType === 'android'? styles.android : styles.ios}>
            <TextInput style={styles.text} {...otherProps} />
            {icon && (
                <Icon
                    name={icon}
                    size={17}
                    color="royalblue"
                    style={styles.icon}
                />
            )}
        </View>
    );
};
   
export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: `#dcdcdc`,
        borderRadius: 20,
        flexDirection: "row",
        width: "90%",
        paddingHorizontal:10,
      ///  paddingVertical: 5,
        marginVertical: 3,
    },
    icon: {
        marginLeft: 10,
        alignSelf: "center",
    },
    text: {
        fontSize: RFPercentage(1.5),
        fontFamily: "System",
        color: `royalblue`,
        textAlign: "center",
        width: "90%",
              
    },
    android:{
        backgroundColor: `#dcdcdc`,
        borderRadius: 20,
        flexDirection: "row",
        width: "90%",
        paddingHorizontal:12,
        marginVertical: 3,
        paddingVertical:2,
    },
    ios:{
        backgroundColor: `#dcdcdc`,
        borderRadius: 20,
        flexDirection: "row",
        width: "90%",
        paddingHorizontal:10,
        marginVertical: 3,
        paddingVertical:10,
    }
});
