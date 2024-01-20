import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  Platform,
  Alert,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik , getIn} from 'formik';
import * as Yup from 'yup';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mailer from 'react-native-mail';


import {CustomText, MyStatusBar} from '../components';
import ItemSeparator from '../components/itemSeparator';

import {styles} from '../styles/sendEmailScreen';


const GfGToast = toasText => {
 /// console.log('Platform.Os', Platform.OS);
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      toasText,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  } else {
    Alert.alert(toasText);
  }
};

const validationSchema = Yup.object().shape({
  to: Yup.string()
     .required(' email is required')
     .email(' email is not valid'),
  cc: Yup.string().email(' email is not valid'),
  bcc: Yup.string().email(' email is not valid'),
 
});

const SendEmailScreen = ({navigation, route}) => {
  const [pdfName, setPdfName] = useState(route.pdfName);
  const [originalPdfName, setOriginalPdfName] = useState(route.originalPdfName);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState(null);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
 
  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        GfGToast('please connect to the internet');
      }
      //confirmationAlert();
      else {
       
        try{
          const pn = await AsyncStorage.getItem('pdfName');
          if (pn !==null) { 
             console.log('pdfName', pn)
             setPdfName(pn);
            }
         }
         catch (err){console.log(err)}


       try{
        const op = await AsyncStorage.getItem('originalPdfName');
        if (op !==null) { 
           console.log('originalPdfName', op)
           setOriginalPdfName(op);
          }
       }
       catch (err){console.log(err)}
        
      }
    };
    checkForNet();
  }, []);

  useEffect(() => {
        const storageRead = async () =>{
          try{
            const op = await AsyncStorage.getItem('originalPdfName');
            if (op !==null) { 
               console.log('originalPdfName', op)
               setOriginalPdfName(op);
              }
           }
           catch (err){console.log(err)}

           try{
            const pn = await AsyncStorage.getItem('pdfName');
            if (pn !==null) { 
               console.log('pdfName', pn);
               setPdfName(pn.replace('"','').replace('"',''))
              }
           }
           catch (err){console.log(err)}

           try{
            const email = await AsyncStorage.getItem('email');
            if (email !==null) { 
               console.log('email', email);
               setTo(email.replace('"','').replace('"',''))
              }
             
           }
           catch (err){console.log(err)}
        }
     
        storageRead();

  }, [setOriginalPdfName, setPdfName ]);

  const handleCancelButton = async(errors) =>{
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });

  }

  const handleSendButton = async (errors) => {
   
    if (errors.to === true || errors.from ===true || Mailer===null) {
      GfGToast('please enter valid data');
    } else {
      // try {
      //   let permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      //   console.log('permission',permission);
      //   PermissionsAndroid.request(permission);
      //   Promise.resolve();
      
      // } catch (error) {
      //   Promise.reject(error);
      // }

    //  try {
       // GfGToast('Connecting...');

          let internalPath = pdfName
       //   let externalPath = `${RNFS.DocumentDirectoryPath}/`+originalPdfName;
       
        //Alert.alert('internalPath'+ internalPath);
        // console.log('externalPath', externalPath);

        // RNFS.copyFile(internalPath, externalPath)  
        // .then(result => {  
        //   console.log('file copied:', result);
        // })
        // .catch(err => {
        //   console.log(err);
        // });
        // console.log('#########################')
        // RNFS.mkdir(externalPath);
        // originalPdfName !== null
        //   ? (externalPath += '/' + originalPdfName)
        //   : null;

        // if (!RNFS.exists(RNFS.DocumentDirectoryPath + '/' + pdfName)) {
        //   GfGToast(route.params.pdf.name + 'file is not exists!');
        // }

        // RNFS.readFile(internalPath, 'utf8').then(setContents => {
        //   console.log('pdf', contents);
        //   setContents(setContents);
        // });

        // await RNFS.writeFile(externalPath, JSON.stringify(contents), 'utf8')
        //   .then(success => {
        //     console.log('Success');
        //   })
        //   .catch(err => {
        //     console.log(err.message);
        //   });
     
     
        Mailer.mail(
          {
            subject: 'Moving Signed PDF File from Internal Storage To External',
            recipients: [to],
            ccRecipients: [cc],
            bccRecipients: [bcc],

            body: message ,  
            isHTML: false,
            attachments: [
              {
                path: internalPath,
                type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
              },
            ],
          },
          (error, event) => {
            if (error != undefined) {
                 Alert.alert(error);
              GfGToast('Please try again..');
            }
          },
        );
    //  } catch (err) {
     //   Alert.alert(err);
      //  GfGToast('connection is failed');

     
   //   }
      Keyboard.dismiss();
    }
  };

  return (
    <Formik
      initialValues={{to: '', from: '', cc: '', bcc: ''}}
      onSubmit={error => setError(error)}
      validationSchema={validationSchema}
      >
    
      {({errors, setFieldTouched, touched, setErrors}) => (
        <ImageBackground
          source={require('../assets/images/abs.jpg')}
          style={styles.background}
          blurRadius={1}>
          <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
          <View style={styles.container}>
          <TouchableOpacity
            style={styles.icon0}
            onPress={() => navigation.navigate('Home')}>
            <Icon name={'keyboard-backspace'} size={18} color="royalblue" />
          </TouchableOpacity>
            <CustomText
              fontFamily="System"
              size="1.5"
              color="rgba(9,19,128,1)">
              Moving File from Internal Storage To External && Send Email!
            </CustomText>
            <View style={styles.seperator}></View>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={(errors)=>handleSendButton(errors)}>
              <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.buttonText}>Send</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={(errors)=>handleCancelButton(errors)}>
              <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.buttonText}>Cancel</CustomText>
            </TouchableOpacity>
   
            <View style={styles.seperator}></View>
            <View style={styles.inputContainar}>
              <View style={styles.group}>
                <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>To :{to} </CustomText>
                <TextInput
                  style={styles.email}
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="to"
                  placeholderTextColor="royalblue"
                  onChangeText={e=> setTo(e)}
                  onBlur={() => setFieldTouched('to')}
                  onPressIn={() => setErrors({})}
                  
                />
              </View>
{/*             
              {(errors.to && touched.to ? (
                <Text style={styles.error}>{errors.to}</Text>
              ) : null)} */}

              <ItemSeparator height={1} />
              <View style={styles.group}>
                <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>Cc : </CustomText>
                <TextInput
                  style={styles.email}
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="cc"
                  placeholderTextColor="royalblue"
                  onChangeText={e=>setCc(e)}
                  onBlur={() => setFieldTouched('cc')}
                  onPressIn={() => setErrors({})}
                />
              </View>
              {/* {(errors.cc && touched.cc) ? (
                <Text style={styles.error}>{errors.cc}</Text>
              ) : null} */}

              <ItemSeparator height={1} />
              <View style={styles.group}>
                <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>Bcc : </CustomText>
                <TextInput
                  style={styles.email}
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="bcc"
                  placeholderTextColor="royalblue"
                  onChangeText={e=>setBcc(e)}
                  onBlur={() => setFieldTouched('bcc')}
                  onPressIn={() => setErrors({})}
                />
              </View>
          
              

              <ItemSeparator height={1} />
              <View style={styles.group}>
                <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>attachment : </CustomText>
                {originalPdfName && (
                  <Icon
                    name={'paperclip'}
                    size={20}
                    color="royalblue"
                    style={styles.icon}
                  />
                )}
                {originalPdfName && (
                  <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>{originalPdfName}</CustomText>
                )}
              </View>

              <ItemSeparator height={1} />
              <View style={styles.group}>
                <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)" styles={styles.text}>Message : </CustomText>
                <TextInput
                  style={styles.message}
                  name="message"
                  multiline={true}
                  placeholderTextColor="royalblue"
                  onChangeText={e=>setMessage(e)}
                  onBlur={() => setFieldTouched('message')}
                  onPressIn={() => setErrors({})}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </Formik>
  );
};

export default SendEmailScreen;
