import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor:'rgba(221,225,226,1)',
      
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 148,
        marginTop: -40,
        backgroundColor: '(rgb(120,23,145), .2)',
       
      },
      circle2: {
      //  float: Left,
        width: 30 ,
        height: 30 ,
        margin: 1 ,
        borderRadius: 50,
     //   shape-outside: inset(20  5  30  10  round 50 ),
     //   clip-path: circle(50% at 0%),
        backgroundColor: '(rgb(30, 123, 155), .6)',  
        marginLeft: 250,
      ///  rotate: '30deg',
       
      },
      circle3: {
          width: 10 ,
          height: 10 ,
          margin: 2 ,
          borderRadius: 50,
          backgroundColor: 'crimson',  
          marginLeft: 160,
        },
        circle4: {
            width: 10 ,
            height: 10 ,
            margin: 2 ,
            borderRadius: 50,
            backgroundColor: 'yellow',  
            marginLeft: 190,
          },
      logoContainer: {
        position: "absolute",
        top: 100,
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        paddingVertical: 42,
        paddingHorizontal:50,
        alignItems: "center",
        
    },
    title:{
        fontSize:24,
        fontFamily: "System",
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    firstText: {
        fontFamily: "System",
        fontSize: 16,
        marginTop: 7,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    email:{
        fontFamily: "System",
        fontSize: 14,
        margin: 5,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    useremail:{
        fontFamily: "System",
        fontSize: 12,
        marginTop: 15,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
   
});