import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    // container: {
    //   //  flex: 1,
    //  //   alignItems: "center",
    //     justifyContent: "center",
    //     height: 50,
    //     padding: 10,
    //   },
      column: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginTop:1,
        borderRadius:30,
        padding:20,
        borderColor:'black',
      },
      subTitle:{
        marginTop:50,
        marginBottom:5,
        height:50,
        width:'58%',
        fontSize: RFPercentage(1.7),
        fontFamily: "System",
        color: `royalblue`,
        textAlign: "left",
        backgroundColor: `#dcdcdc`,
        borderRadius:10,
        borderColor:'gray',
        padding:2,
      ///  clearTextOnFocus:true,
     ///  dataDetectorTypes:'none',
      ///  autoComplete:"username",
       
     
      },
      datePicker:{
        marginTop:0,
        justifyContent:"center",
        alignItems:"center",
      }

})