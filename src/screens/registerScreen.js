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
import Icon0 from 'react-native-vector-icons/MaterialCommunityIcons';

import {decodeToken} from './../utils/token';
import {styles} from '../styles/registerScreen';
import {registerUser} from '../../api/users';


import {
  CustomText,
  CustomForm,
  CustomFormField,
  SubmitButton,
  Screen,
  MyStatusBar,
} from '../components';

const GfGToast = toasText => {
  // console.log('Platform.Os', Platform.OS);
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      toasText,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  } else {
    Alert.alert(toasText);
  }
};

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required(' name is required')
    .min(4, 'at least 3 characters')
    .max(120, 'at least 30 characters')
    .matches(/^([a-zA-Z\s])+$/, 'Name is not in correct format'),
  email: Yup.string()
    .required(' email is required')
    .email(' email is not valid')
    .matches(/\S+@\S+\.\S+/, 'email is not in correct format'),
  password: Yup.string()
    .required(' password is required')
    .min(6, 'at least 6 characters')
    .max(30, 'at least 30 characters'),
  coPassword: Yup.string()
    .required(' Confirm password is required')
    .min(6, 'at least 6 characters')
    .max(30, 'at least 30 characters'),
  phone: Yup.string()
    /// .required('Phone number is required')
    .matches(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
      'Phone is not in correct format',
    ),
});

const RegisterScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
 

  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();

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

  useEffect(() => {
    const readStorage = async () => {
      const x = await AsyncStorage.getItem('email');
      setEmail(JSON.parse(x));
      return email;
    };
    readStorage();
  }, [setEmail]);

  const handleUserRegister = async user => {
    if (user.password !== user.coPassword) {
      GfGToast("Passwords don't match");
    } else {
      try {
   ///     GfGToast('Connecting...');

        Keyboard.dismiss();
        const status = await registerUser(user);

        if (status === 200) {
          GfGToast('register is successful!');

          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else {
          GfGToast('register is failed');
        }
      } catch (err) {
        GfGToast('connection is failed');

        console.log(err);
      }
    }
  };

 

  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>
      <MyStatusBar
        backgroundColor="rgb(30, 123, 155), .6)"
        barStyle="light-content"
      />
      <Screen style={styles.container}>
        <TouchableOpacity
          style={styles.icon0}
          onPress={() => navigation.navigate('Home')}>
          <Icon0 name={'keyboard-backspace'} size={18} color="royalblue" />
        </TouchableOpacity>
        <CustomText fontFamily="System" size="2.5" color="rgba(9,19,128,1)">
          {' '}
          Welcome{' '}
        </CustomText>
        <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)">
          {' '}
          Join SofTesting!{' '}
        </CustomText>

        <View style={styles.seperator} />
        <CustomForm
          initialValues={{
            email: '',
            password: '',
            userName: '',
            phone: '',
            coPassword: '',
          }}
          onSubmit={user => {
            handleUserRegister(user);
          }}
          validationSchema={validationSchema}>
          <CustomFormField
            placeholder="userName"
            autoComplete="name"
            autoCorrect={false}
            icon="lead-pencil"
            name="userName"
            placeholderTextColor="royalblue"
          />
          {/* <CustomFormField
            placeholder="Phone Number"
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            icon="phone"
            name="phone"
            placeholderTextColor="royalblue"
          /> */}

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
            onChangeText={e => setPassword(e)}
          />

          <CustomFormField
            placeholder="Confirm Password"
            autoComplete="password"
            autoCorrect={false}
            icon="form-textbox-password"
            name="coPassword"
            placeholderTextColor="royalblue"
            secureTextEntry
            onChangeText={e => setConfirmPassword(e)}
          />

          <View style={styles.buttonContainer}>
            <SubmitButton title="Submit" />
          </View>
        </CustomForm>
        <View style={styles.note}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate('login')}>
            <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)">
              Already have an account? Log in
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://SofTestingca.com')}>
            <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)">
              Go to: https://SofTestingca.com
            </CustomText>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.link}
            onPress={() => deleteAccount(email)}>
            <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)">
              Delete Account in SofTesting
            </CustomText>
          </TouchableOpacity> */}
          
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default RegisterScreen;
