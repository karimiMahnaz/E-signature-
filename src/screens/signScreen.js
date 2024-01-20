import React, {useState, useRef, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  TextInput,
  Button ,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import {styles} from '../styles/signScreen';

import {MyStatusBar} from '../components';


const SignScreen = ({onOK}) => {
  const ref = useRef();
  const refSubTitle = useRef();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const [subTitle, setSubTitle] = useState (null);
  const [os, setOs] = useState(null);

//   useEffect(() => {

//    }, [setDate]);

useEffect(() => {
  const checkForDate = async () => {
    if (Platform.OS === 'android') {
      setOs('android'); 
     } else {
      setOs('ios');
     }
     setShow(true);

  };
  checkForDate();

  console.log('show',show)
},[]);

const GfGToast = (toasText) => {

  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      toasText,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  } else {
    Alert.alert(toasText);
  }

     }


     ///DatePicker

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      if (Platform.OS === 'android') {
         setShow(false);
      }
         else
     {
         setShow(true);
      }
      setDate(currentDate);
    };

  const handleOK = async signature => {
    try{
    await AsyncStorage.setItem('sign', signature);
   
  
     if (subTitle == undefined || subTitle ==null || subTitle == ''){
           subTitle='.'
        }
        await AsyncStorage.setItem('subTitle', subTitle);
        await AsyncStorage.setItem('signDate' , date.toString());
  
        GfGToast('signature is confirmed.')
       // alert(await JSON.stringify(JSON.stringify(date).substring(0,date.toString().length-24)));
      //  alert(await JSON.stringify(AsyncStorage.getItem('signDate')));
    }
    catch(e){
        GfGToast('please sign again.')
    }
  };

  const handleClear = () => {
    
    setSubTitle('');
    ref.current.clearSignature();
    GfGToast('cleared.')
  };

  const handleConfirm = async () => {
    setShow(true);
    console.log('end');
    ref.current.readSignature();
  };
 const handleSubTitle = async (e) =>{
     setSubTitle(e)
 }
  
  ///  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  const imgWidth = 350;
  const imgHeight = 400;
  const style = `.m-signature-pad {box-shadow: none; border:none; } 
                   .m-signature-pad--body {border:none;}
                   .m-signature-pad--footer {display: none; margin: 0px; }
                   body,html {
                   width: ${imgWidth}px; height: ${imgHeight - 20}px;}`;

  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>

      <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
      <TextInput ref={refSubTitle} style={styles.subTitle} placeholder="Subtitle..." 
      onChangeText={handleSubTitle} name = "subTitle" value = {subTitle} ></TextInput>
      <View
        style={{
          width: imgWidth,
          height: imgHeight ,
          marginTop: StatusBar.currentHeight + 1,
        }}>
          
        <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
        <View style={styles.column}>
          <Button
            title="Clear"
            color="rgba(9,19,128,1)"
            onPress={handleClear}
          />
          <Button
            title="Confirm"
            color="rgba(9,19,128,1)"
            onPress={handleConfirm}
          />
        </View>
      </View>
     <View style ={styles.datePicker}>

     <DatePicker date={date} onDateChange={setDate} />

       {/* { show && <DateTimePicker
          testID="dateTimePicker"
          display="spinner"
          value={date}
          is24Hour={true}
          onChange={onChange}
          style={{width: 360, backgroundColor: "white"}} 
        />} */}
       
      </View>
    </ImageBackground>
  );
};

export default SignScreen;
