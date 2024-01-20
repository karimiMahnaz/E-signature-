import React, {useState, useEffect, useCallback} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Alert,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ItemSeparator from '../components/itemSeparator';
import {CustomText, Screen, MyStatusBar} from '../components';
import {styles} from '../styles/profileScreen';
import {getProfile} from '../../api/users';


const ProfileScreen = ({navigation}) => {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
 /// const [filePath, setFilePath] = useState([]);

  const [getImage, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [education, setEducation] = useState('');
  const [userName, setuserName] = useState('');
  const [requester, setRequester] = useState('');
  const [provider, setProvider] = useState('');
  const [design, setDesign] = useState('');
  const [develop, setDevelop] = useState('');
  const [security, setSecurity] = useState('');
  const [qa, setQa] = useState('');
  const [profile, setProfile] = useState('');

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
        if (!state.isConnected) {
          GfGToast('please connect to the internet');
        }
      }
    };
    checkForNet();
  }, []);

  useEffect(() => {
   // GfGToast('Connecting...');

    try {

        const readStorage = async () => {

            const mail = await AsyncStorage.getItem('email');
            setEmail(mail);
            console.log('mail',mail)
            const imageUri = await AsyncStorage.getItem("Image");
            console.log('imageUri',imageUri);
            if ((imageUri !== null) && (email !==null) && (email !== '')) {
                setImage(imageUri);

            } else {
              setImage(null); 
              setuserName(null);
              setPhone(null);
              setCountry(null);
              setEducation(null);
              setCompany(null);
              setRequester(false);
              setProvider(false);
              setDesign(false);
              setDevelop(false);
              setSecurity(false);
              setQa(false);
              setImage(null);
            }

           if (mail !== null && mail !=='') {
            let {data} = await getProfile(mail);
            console.log('userName', data);
            setProfile(data);

            if (data) {
                setuserName(data.userName);

                setPhone(data.phone);
                setCountry(data.country);
                setEducation(data.education);
                setCompany(data.companyName);

                if (data.role.substr(0, 1) === '1') { setRequester(true) } else { setRequester(false) }
                if (data.role.substr(1, 1) === '1') { setProvider(true) } else { setProvider(false) }
                if (data.teams.substr(0, 1) === '1') { setDesign(true) } else { setDesign(false) }
                if (data.teams.substr(1, 1) === '1') { setDevelop(true) } else { setDevelop(false) }
                if (data.teams.substr(2, 1) === '1') { setSecurity(true) } else { setSecurity(false) }
                if (data.teams.substr(3, 1) === '1') { setQa(true) } else { setQa(false) }

                data.imageName !==null && data.imageName !=='' ?
                setImage(`https://api.softestingca.com/uploaded-files/` + data.email.replace(' ', '').trim()+'_profile/'+ data.imageName)
                : null

                console.log(getImage);
                data= ''
          }
        }
    }
        readStorage();
    }
    catch (err) {
        GfGToast('Connection error');
        console.log(err);
    }
  }, [setEmail]);

  
  const requestCameraPermission = async () => {

    
    if (Platform.OS === 'android') {
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
     
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
      
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = useCallback(async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
 
    let isCameraPermitted = await requestCameraPermission();
    
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
      
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        setImage(response.assets[0].uri);
    //    setFilePath(response.assets[0]);
        
      });
    }
    getImage ? await AsyncStorage.setItem("Image", response.assets[0].uri): null;
  }, []);

  const chooseFile = useCallback(async(type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {

    //  console.log('Response = ', response.assets[0].uri);
      
      //setFilePath(response.assets[0]);

     // console.log('data',filePath);
      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      //console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setImage(response.assets[0].uri);
      //console.log('getImage',getImage)
    
    });
    getImage ? await AsyncStorage.setItem("Image", response.assets[0].uri): null;
  },[]);


    const showModal = () =>{
        setVisible(true);
        Alert.alert(
            "Avator Picker",
            "",
            [
                {
                    text: "Choose Image",
                    onPress: ()=> chooseFile('photo'),
                },
                {
                    text: "Launch Camera for Image",
                    onPress: ()=> captureImage('photo'),
                },
              {
                text: "Cancel",
             //   onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
          );
    }

    
  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>
      <View style={styles.headercontainer}>

       <MyStatusBar backgroundColor="rgb(30, 123, 155), .6)" barStyle="light-content" />
        <Image
          style={styles.image}
          source={
            getImage
              ? {uri: getImage}
              : require('../assets/images/user.png')
          }
        />
        
   
         {/* <Text style={styles.textStyle}>{getImage}</Text> */}
      

        <View style={styles.details}>
          <CustomText styles={styles.name} fontFamily="System" size="1.7">
            {userName}
          </CustomText>
          <CustomText
            fontFamily="System"
            size="1.5"
            styles={styles.subTitle}>
            {email ? JSON.parse(email) : null}
          </CustomText>
        </View>
        <TouchableOpacity onPress={showModal} style={styles.settings}>
          <Icon name="setting" size={24} color="tomato" /> 
        </TouchableOpacity>
      </View>
      <ItemSeparator height={3} />

      <Screen style={styles.detailContainer}>
        <Text style={provider || requester ? styles.service : styles.inactive}>
          {provider ? 'Service Provider ' : null}
          {requester ? ',   Service Requester ' : null}
        </Text>
        <View style={styles.columnContainer}>
          <View style={design ? styles.serviceContainer : styles.inactive}>
            <Text style={design ? styles.service : styles.inactive}>
              {design ? 'Design' : null}
            </Text>
          </View>
          <View style={develop ? styles.serviceContainer : styles.inactive}>
            <Text style={develop ? styles.service : styles.inactive}>
              {develop ? 'Development' : null}
            </Text>
          </View>
          <View style={security ? styles.serviceContainer : styles.inactive}>
            <Text style={security ? styles.service : styles.inactive}>
              {security ? 'Security Testing' : null}
            </Text>
          </View>

          <View style={qa ? styles.serviceContainer : styles.inactive}>
            <Text style={qa ? styles.service : styles.inactive}>
              {qa ? 'QA Testing' : null}
            </Text>
          </View>
        </View>

        <Text style={styles.service}>phone :{phone}</Text>
        <Text style={styles.service}>country :{country}</Text>
        <Text style={styles.service}>education :{education}</Text>
        <Text style={styles.service}>company :{company}</Text>

        <View style={styles.note}>
          <CustomText
            fontFamily="System"
            size="1.8"
            color="rgba(9,19,198,1)">
            change or complete your profile?
          </CustomText>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://SofTestingca.com')}>
            <CustomText
              fontFamily="System"
              size="1.8"
              color="rgba(9,19,198,1)">
              Go to: https://SofTestingca.com
            </CustomText>
          </TouchableOpacity>
          {/* {visible &&  <AvatorModalScreen
             isVisible={visible}
             onClose={setVisible(false)}
             onImageLibraryPress={chooseFile('photo')}
             onCameraPress={captureImage('photo')}
             />} */}
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default ProfileScreen;
