import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  ToastAndroid,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';

//import Svg, {Path} from 'react-native-svg';

import {styles} from '../styles/welcomeScreen';
import CustomButton from '../components/customButton';
import {MyStatusBar} from '../components';
import { deleteUser} from '../../api/users';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [visible, setVisible] = useState(false);

  const GfGToast = toasText => {
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

  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        GfGToast('please connect to the internet');
      } else {
        navigation.setOptions({
          tabBarStyle: {display: 'none'},
        });
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
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('Image');
    setEmail(null);
    ///   navigation.dispatch(StackActions.replace("Welcome"));
    GfGToast('Logout');
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic

    Keyboard.dismiss();
    try {
      const status = await deleteUser(email);
      setVisible(false);
      if (status === 200) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('Image');
        setEmail(null);
       
        GfGToast('Account is deleted!');

        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Home'}],
        // });
      } else {
       
        GfGToast('Delete is failed');
      }
    } catch (err) {
      setVisible(false);
      GfGToast('connection is failed');

      console.log(err);
    }
  };

  const deleteAccount = async email => {
    if (email === null){  
      GfGToast('Account was not found'); 
     } else { showDialog();}
 };


  return (
    // <ImageBackground
    //     source={require("../assets/images/abs.jpg")}
    //     style={styles.background}
    //     blurRadius={1}
    // >
    <SafeAreaView style={styles.background}> 

     <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
     
      {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <Path
          fill="rgba(9,19,128,1)"
          fill-opacity="1"
          d="M0,96L120,128C240,160,480,224,720,256C960,288,1200,288,1320,288L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></Path>
      </Svg> */}

      <View style={styles.logoContainer}>
        <View style={styles.circle} />
        <View style={styles.circle4} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        {/* <Image
                    source={require("../assets/images/logo.jpg")}
                    style={styles.logo}
                /> */}

        <Text style={[styles.title, style.margintop1]}>SofTesting</Text>
        <Text style={[styles.firstText]}>
          Software Design, Development & Testing
        </Text>
        <Text style={[styles.email]}>hello@SofTestingCa.com</Text>

        {email ? <Text style={[styles.useremail]}> Welcome {email} </Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Signature"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('signature');
          }}
        />

        {(email===null) ?  <CustomButton
          title="Login"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('login');
          }}
        /> : null}

        <CustomButton
          title="Profile"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('profile');
          }}
        />
        <CustomButton
          title="OCR scanner"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('ocrScreen');
          }}
        />

        <CustomButton
          title="Documents"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('documentPicker');
          }}
        />

        <CustomButton
          title="Email"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('sendEmail');
          }}
        />

        <CustomButton
          title="Logout"
          color="rgba(9,19,128,1)"
          onPress={handleLogout}
        />

         <CustomButton
          title="Delete Account"
          color="rgba(9,19,128,1)"
          onPress={deleteAccount}
        />

         <View>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Account delete</Dialog.Title>
              <Dialog.Description>
                Do you want to delete this account? You cannot undo this action.
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={e=>handleCancel(e)} />
              <Dialog.Button label="Delete" onPress={e=>handleDelete(email)} />
            </Dialog.Container>
          </View>

      </View>
    
    </SafeAreaView>
    // </ImageBackground>
  );
};

export default WelcomeScreen;

const style = StyleSheet.create({
    margintop1: {
      marginTop: screenHeight- (.95*screenHeight),    
    },
    
  });