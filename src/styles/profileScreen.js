import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inactive:{
        display:"none",
        margin:0,
        padding:0,
        height:0
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    headercontainer:{
        flexDirection: "row",
        margin: 10,
        padding: 15,
        maxWidth:'95%',
    },
   
    image: {
        top:20,
        width: 100,
        height: 100,
        borderRadius: 35,
    },
    details: {
        marginTop:10,
        marginLeft: 42,
        justifyContent: "center",
    },
    name:{ 
        color: "#6e6969",
     },
    subTitle: {
        color: "#6e6969",
    },
    settings: {
        top:60,
        alignSelf: "center",
        marginLeft: 1,
    },
    detailContainer: {
        flex:1,
        flexDirection: "column",
        marginTop:5,
        marginBottom:50,
        paddingTop:20,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor:`#f0f8ff`,
        opacity:.7,
        maxWidth:'96%',
     
    },
    columnContainer:{

        flexDirection: "column",
    ///    justifyContent: "stretch",
        padding: 7,
        marginHorizontal:3,
        minWidth:'70%',
        fontSize:13,
    }, 
    serviceContainer:{
        fontFamily:"System",
        fontSize:13,
    },
    service:{ 
         fontFamily:"System",
         fontSize:13,
         padding:1,
         marginBottom:0,
         height:25,
         color:"rgba(9,19,128,1)",

    },
     link:{
        width:"95%",
        margin:15,
        alignItems:"center",
        fontFamily:"System"
    },
    note:{
        top:35,
        alignItems:"center",
        fontFamily:"System"
    }

})