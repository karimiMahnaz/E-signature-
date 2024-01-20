import { StyleSheet } from "react-native";
import ItemSeparator from './../components/itemSeparator';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    registerSignText:{
      paddingVertical: 8,
      fontFamily:'System',
      width:'80%',
    },
      titleText: {
        textAlign: 'center',
        paddingVertical: 8,
        fontFamily:'System',
        width:'90%',
      },
      textStyle: {
        marginTop: 16,
        fontFamily:'System',
       /// ItemSeparator:10,
      },
      buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        borderRadius:10,
        width:'90%',
      },
      imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
      },
      documentText:{
        marginTop:10,
        paddingVertical: 10,
        fontFamily:'System',
        width:'90%',
        flexWrap:"wrap",
      },
      emailText:{
        textAlign: 'center',
        paddingVertical: 1,
        fontFamily:'System',
        width:'90%',
      },
      discription:{
        paddingTop: 20,
        fontFamily:'System',
        width:'90%',
      },
      List:{
        marginTop:20,
        borderRadius:5,
        maxWidth:"95%",
      },
      contract:{
        fontFamily:'System',
      /// ItemSeparator:5,
        backgroundColor:`#f5f5dc`,
        paddingVertical:10,
        paddingHorizontal:25,
        borderRadius:5,
        borderColor:'#f5f5dc',
        flexWrap:'wrap',
        maxWidth:'90%',
      },
      card:{
        padding: 4,
        backgroundColor:`#f0f8ff`,
        opacity:.7,
      },
      icon0:{
        alignSelf: "flex-start",
      }

})