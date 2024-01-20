import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Keyboard, 
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';

import * as Yup from 'yup';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decodeToken} from './../utils/token';

import {styles} from '../styles/loginScreen';
import {loginUser} from '../../api/users';

import {

  CustomText,
  CustomForm,
  CustomFormField,
  SubmitButton,
  Screen,
  MyStatusBar
} from '../components';


const GfGToast = (toasText) => {
// console.log('Platform.Os', Platform.OS)
 if (Platform.OS ==='android'){
  ToastAndroid.showWithGravity(
    toasText ,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  )
 }
 else{
   Alert.alert(toasText);
 }
  }
 


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(' email is required')
    .email(' email is not valid'),
  password: Yup.string()
    .required(' password is required')
    .min(6, 'at least 6 characters')
    .max(30, 'at least 30 characters'),
});

const LoginScreen = ({navigation, route}) => {

  const [password, setPassword] =useState(true);
  const [email0, setEmail0] = useState('');

  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();
      console.log('state.isConnected',state.isConnected)
      if (!state.isConnected) {
        GfGToast('please connect to the internet');
        
      }
      //confirmationAlert();
      else {
        const token = await AsyncStorage.getItem('token');
        const userId = JSON.parse(await AsyncStorage.getItem('userId'));

        if (token !== null && userId !== null) {
          const decodedToken = decodeToken(token);

          ///     dispatch(userAction(decodedToken.user));

          if (decodedToken.userId !== userId) {
            /// navigation.dispatch(StackActions.replace("Home"));

            ///     else
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userId');
          }
        }
      }
    };
    checkForNet();
  }, []);

  const handleUserLogin = async user => {
    try {
   //   GfGToast("Connecting...");
      
      Keyboard.dismiss();

      const x = await AsyncStorage.getItem('email');
       setEmail0(JSON.parse(x));
     //  alert(email);
      if (x !== null) {
        GfGToast("You are login...");
       
    }else{

      const status = await loginUser(user);

      if (status === 200) {
      
         GfGToast('login is successful!');
         
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });

      } else {
        GfGToast( 'login is failed');

           }
    }
    } catch (err) {
      GfGToast('connection is failed');

      console.log(err);
    }
  
  };

  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>

      <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
      <Screen style={styles.container}>
        <CustomText fontFamily="System" size="2.5" color="rgba(9,19,128,1)" > Welcome </CustomText>
        <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" > SignIn to continue! </CustomText>
    
        <View  style = {styles.seperator} />
        <CustomForm
          initialValues={{email: '', password: ''}}
          onSubmit={user => {
            handleUserLogin(user);
          }}
          validationSchema={validationSchema}>
          <CustomFormField
            placeholder="Email"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            icon="email"
            name="email"
            placeholderTextColor="royalblue"
          />

          <CustomFormField
            placeholder="Password"
            autoComplete="password"
            autoCorrect={false}
            icon="onepassword"
            name="password"
            placeholderTextColor="royalblue"
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <SubmitButton title="Submit" />
          </View>
      
        </CustomForm>
        <View style={styles.note}>
        <TouchableOpacity
         style={styles.link}
         onPress={() => navigation.navigate('register')}>
        
          <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)">
             Create new account? or Forgot Password?
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => Linking.openURL('https://SofTestingca.com')}>
          <CustomText
            fontFamily="System"
            size="1.5"
            color="rgba(9,19,128,1)">
            Go to: https://SofTestingca.com
          </CustomText>
        </TouchableOpacity>
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default LoginScreen;
