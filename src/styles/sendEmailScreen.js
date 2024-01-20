import {StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    marginTop: StatusBar.currentHeight + 50,
    alignItems: 'center',
  },
  inputContainar: {
    backgroundColor: `#f0f8ff`,
    opacity: 0.7,
  },
  sendButton: {
    backgroundColor: 'rgba(9,19,128,1)',
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: 125,
    marginLeft: '50%',
    alignItems:'center',
  },
  text: {
    color: 'black',
    left: 10,
    padding: 5,
    fontFamily:"System",
    fontSize:14,
    flexWrap:'wrap',
    maxWidth:"65%",

  },
  buttonText: {
    color: 'white',
  },
  link: {
    width: '90%',
    marginTop: 20,
  },
  seperator: {
    width: '98%',
    height: 20,
  },
  group: {
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth:"90%",
  },
  icon: {
    paddingVertical: 5,
  },
  email:{
  //  backgroundColor:'green',
    width:"90%",
    left: 10,
    padding: 4,
    fontFamily:"System",
  },
  message:{
    width:"90%",
    left: 10,
    padding: 4,
    fontFamily:"System",
  },
  error:{
    flexDirection: 'column',
    color:'red',
    paddingLeft:60,
  },
  icon0:{
    alignSelf: "flex-start",
  }
});
