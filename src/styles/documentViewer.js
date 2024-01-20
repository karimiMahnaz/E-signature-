import { StyleSheet, Dimensions,} from "react-native";

export const styles = StyleSheet.create({

	container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop:50
    },
    pdf: {
        marginTop:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
     button: {
        alignItems: "center",
        backgroundColor: "#508DBC",
        padding: 10,
        marginBottom: 20,
        marginTop:0,
      },
      buttonText: {
        color: "#DAFFFF",
      },

})