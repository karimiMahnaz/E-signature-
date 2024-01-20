import { StyleSheet,StatusBar } from "react-native";
///import Constants from "expo-constants";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    container: {
     //   marginTop: Constants.statusBarHeight + 80,
        marginTop:StatusBar.currentHeight ,
        alignItems: "center",
    },
    buttonContainer:{
        width:170,
        backgroundColor: "rgba(9,19,128,1)",
        borderRadius:15,
        marginTop:20,
        marginBottom:15,
        paddingHorizontal:7,
        alignItems: 'center',
        fontSize:14,
    },
    note:{
        top:0,
        alignItems:"center",
        fontFamily:"System"
    },
    link:{
        marginTop:17,
    },
    seperator:{
        width: "100%",
        height:60,
    },
    icon0: {
        alignSelf:"flex-start",
    },
   
   
});