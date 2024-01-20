import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getContracts} from '../../api/users';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/documentPickerScreen';

import {Screen, MyStatusBar, CustomText} from '../components';

const DocumentPickerScreen = ({navigation}) => {
  const [singleFile, setSingleFile] = useState('');
  const [email, setEmail] = useState('');
  const [contracts, setContracts] = useState({});
  const [isSign, setIsSign]= useState(false);

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
      }

      if (
        (await AsyncStorage.getItem('sign')) === undefined ||
        (await AsyncStorage.getItem('sign')) === '' ||
        (await AsyncStorage.getItem('sign')) === null
      ) {
        setIsSign(false);
        GfGToast('register your signature!');
      } else {
        /// console.log('AsyncStorage sign', await AsyncStorage.getItem('sign'))

      //  GfGToast('Connecting...');
        setIsSign(true);

        try {
          const mail = await AsyncStorage.getItem('email');
          setEmail(JSON.parse(mail));
        ///  console.log('email', mail);
          if (mail !== null && mail !== '') {
            let {data} = await getContracts(mail);
            
          //  console.log('data', data);
            if (data) {
              data !== null && data !== '' && data != undefined
                ? setContracts(data)
                : null;

              data = '';
            }
          } else{
            GfGToast('Please Login to Access your document in SofTesting');
            setContracts({});
          }
        } catch (err) {
          GfGToast('Connection error');
          console.log(err);
        }
      }
    };
    checkForNet();
  }, [setEmail]);

  const viewDocument = async e => {
    if (!isSign){ GfGToast('register your signature!');}
    console.log(`pdf: https://api.softestingca.com/uploaded-files/` +
    email.replace(/"/g, '').trim().toLowerCase() + `/`+ e)
    navigation.navigate('document', {pdf: {uri: `https://api.softestingca.com/uploaded-files/` +
        email.replace(/"/g, '').trim().toLowerCase() + `/`+ e , name: e}});
  };

  const selectOneFile = async () => {
    setSingleFile(null);
    let res = '';
    if (!isSign){ GfGToast('register your signature!');return;}
    try {
     let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      // console.log('res : ' +  console.log('res : ' + JSON.stringify(res[0])));
      console.log('URI : ' + res[0].uri);
      // console.log('Type : ' +  res[0].type);
      console.log('File Name : ' + res[0].name);
      // console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setSingleFile(res[0]);
      console.log('File Name : ' + res[0].uri);
      navigation.navigate('document', {pdf: res[0]});
   //   navigation.navigate('document', {pdf: {uri: res[0].uri}});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        setSingleFile(null);
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>

      <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
      

      <Screen>
        
      <TouchableOpacity
            style={styles.icon0}
            onPress={() => navigation.navigate('Home')}>
            <Icon name={'keyboard-backspace'} size={18} color="royalblue" />
       </TouchableOpacity>
     
        {!isSign && <CustomText fontFamily="System" size="1.8" color="red" styles={styles.registerSignText}>Please register your sign before pick your document!</CustomText>}
        <CustomText fontFamily="System" size="1.8" color="rgba(9,19,128,1)"  styles={styles.titleText}>File picker to sign</CustomText>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)"  styles={{marginRight: 10}}>
            Click here to pick one file
          </CustomText>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)"  styles={styles.textStyle}>
          File Name: {singleFile? singleFile.name : ''}
          {'\n\n'}
          Type: {singleFile ? singleFile.type : ''}
          {'\n\n'}
          File Size: {singleFile ? singleFile.size : ''}
          {'\n\n'}
          URI: {singleFile ? singleFile.uri : ''}
          {'\n'}
        </CustomText>
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            marginHorizontal: 10,
          }}
        />

        <View>
          {contracts[0] ? (
            <>
              <CustomText fontFamily="System" size="1.8"  color="rgba(9,19,128,1)"  styles={styles.documentText}>
                SofTesting documents to sign
              </CustomText>
              <CustomText fontFamily="System" size="1.4"  color="rgba(9,19,128,1)"  styles={styles.emailText}>{email}</CustomText>
              <CustomText fontFamily="System" size="1.8"  color="rgba(9,19,128,1)"  styles={styles.discription}>
                Click On document name to sign:
              </CustomText>
              <FlatList
                data={contracts}
                keyExtractor={item => item._id.toString()}
                style={styles.List}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.card}
                    onPress={() => viewDocument(item.contractName)}>
                    <CustomText fontFamily="System" size="1.4"  color="rgba(9,19,128,1)"  styles={styles.contract}> {item.contractName}</CustomText>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <CustomText fontFamily="System" size="1.8" color="rgba(9,19,128,1)"  styles={styles.documentText}>
              There is no SofTesting document to sign
            </CustomText>
          )}
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default DocumentPickerScreen;
