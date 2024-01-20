import { StyleSheet } from "react-native";
import ItemSeparator from './../components/itemSeparator';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    registerSignText:{
      paddingVertical: 8,
      fontFamily:'System',
     
    },
      titleText: {
        textAlign: 'center',
        paddingVertical: 8,
        fontFamily:'System',
      
        
      },
      textStyle: {
        marginTop: 16,
        fontFamily:'System',
       /// ItemSeparator:10,
      },
      button0: {
        backgroundColor: 'rgba(9,19,128,1)',
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 8,
        paddingVertical: 16,
        width: 225,
        marginLeft: '10%',
        alignItems:'center',
      },
      buttonText: {
        color: 'white',
      },

      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
      button: {
        marginHorizontal: 10,
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
      },
      image: {
        marginVertical: 15,
        height: 600 / 2.5,
        width: 700 / 2.5,
      },
      icon0:{
        alignSelf: "flex-start",
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
        fontSize:14,
      },
      card:{
        padding: 10,
        backgroundColor:`#f0f8ff`,
        opacity:.7,
      },

})