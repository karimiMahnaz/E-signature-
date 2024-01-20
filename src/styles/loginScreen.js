import { StyleSheet,StatusBar } from "react-native";
///import Constants from "expo-constants";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    container: {
     //   marginTop: Constants.statusBarHeight + 80,
        marginTop:StatusBar.currentHeight + 80,
        alignItems: "center",
    },
    buttonContainer:{
        width:170,
        backgroundColor: "rgba(9,19,128,1)",
        borderRadius:15,
        marginTop:30,
        marginBottom:80,
        paddingHorizontal:7,
        alignItems: 'center',
        fontSize:14,
    },
    note:{
        top:10,
        alignItems:"center",
        fontFamily:"System"
    },
    link:{
        marginTop:20,
    },
    seperator:{
        width: "100%",
        height:100,
    }
   
   
});