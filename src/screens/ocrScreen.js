import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressCircle from 'react-native-progress/Circle';
import axios from 'axios';


///import TesseractOcr, { useEventListener}  from '@devinikhiya/react-native-tesseractocr';
///import Tesseract  from '@devinikhiya/react-native-tesseractocr';
//import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';
///import  TextRecognition from 'react-native-text-recognition';

import {styles} from '../styles/ocrScreen';
import {Screen, MyStatusBar, CustomText} from '../components';
import {ocr,fileUpload} from '../../api/contracts';

const OCRScreen = ({navigation}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  const [uploadImage0, setUploadImage0] = useState(null);
  const [email, setEmail] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [signatureBase64, setSignatureBase64] = useState(null);
  const [subTitleBase64, setSubTitleBase64] = useState(null);
  const [signDateBase64, setSignDateBase64] = useState(null);
  const [ocrDone, setOcrDone] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [isSign, setIsSign]= useState(false);

  const defaultPickerOptions = {
    cropping: true,
    height: 600,
    width: 700,
    maxFiles:1,
  };

  // useEventListener('onProgressChange', (p) => {
  //   setProgress(p.percent / 100);
  // });

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
            return;
          } else {
            const mail = await AsyncStorage.getItem('email');
            setEmail(mail);
          }
        };
        checkForNet();
      }, []);
 

      useEffect(() => {

        const getSign = async () => {
          
          if (
            (await AsyncStorage.getItem('sign')) === undefined ||
            (await AsyncStorage.getItem('sign')) === '' ||
            (await AsyncStorage.getItem('sign')) === null
          ) {
            setIsSign(false);
            GfGToast('register you signature!');
          } else {
        
            setIsSign(true);
            setSignatureBase64(await AsyncStorage.getItem('sign'));
            setSubTitleBase64(await AsyncStorage.getItem('subTitle'));
            setSignDateBase64(await AsyncStorage.getItem('signDate'));
    
          }
        };
    
        getSign();
      },  []);


       const recognizeTextFromImage = async (path) => {
             setIsLoading(true);
             console.log('path', path);
            try {

              uploadImage(path);
              const tesseractOptions = {};
              // const recognizedText = await TesseractOcr.recognize(
              //   path,
              //   LANG_ENGLISH,
              //   tesseractOptions,
              // );
              // const tesseract = new Tesseract();
              // tesseract.recognize(image).then((text) => {
              //   setText(text);
               
              // });
             /// recognizedText = text;
              //  await Tesseract.recognize(path, 'eng', tesseractOptions)
              //   .then((result) => console.log(result))
              //   .catch((error) => console.error('last error99'+ error));

             // console.log('recognizedText', recognizedText)
           //   setText(recognizedText);
            } catch (err) {
              console.error(err);
              setText('');
            }

        setIsLoading(false);
        setProgress(0);
     };
    const OCR = async() =>{

      setIsLoading(true);
     
      try {

        if (email === null || uploadImage0 === null){
          GfGToast('Please login and upload an Image!');
          setIsLoading(false);
           return;
        } else {

          if (
            (await AsyncStorage.getItem('sign')) === undefined ||
            (await AsyncStorage.getItem('sign')) === '' ||
            (await AsyncStorage.getItem('sign')) === null
          ) {
            setIsSign(false);
            GfGToast('register you signature!');
          }
          
          else {
          console.log('email', email);
          console.log('uploadImage0', uploadImage0);
          const data ="" ; 
          const response = await ocr(email, uploadImage0, signatureBase64, subTitleBase64, signDateBase64) ;
          console.log('response', response);
        //  if (response === 200 ) {//{ data = await response.json(); }
        //  console.log('data', data)
        //  setText(data)
        //  if (data !== null) {    
        //    GfGToast('done. You can find the PDF file in the link below.');
            setOcrDone(true);
          ///  await recognizeTextFromImage(image.path);
 
       // } else {
       //     GfGToast( 'fault in OCR ');
  
        //     }
        }

        setIsLoading(false);
        setProgress(0);
      }
    } catch (err) {

      GfGToast('connection is failed');
      console.log(err);

    }
    
    }

     const recognizeFromPicker = async (options = defaultPickerOptions) => {
      try {
        setOcrDone(false);
        const image = await ImagePicker.openPicker(options);
        setUploadImage0(image);
        setImgSrc({uri: image.path});
        console.log('image0000', image)
        if (Platform.OS === 'android'){
          var filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length).split('.')[0]+'.pdf';
          setPdfName(filename)
        }
       
        console.log('filename', filename);
        if (Platform.OS === 'ios') {
          setPdfName(image.filename.split('.')[0]+'.pdf')
        };
       
       try{
      
        if (email === null){
          GfGToast('Please login!'); return;
        } else {
          const status = await fileUpload(email, image) ;
         
        if (status === 200) {    
           GfGToast('file upload is successful! Tap OCR to create signed PDF file.');

         ///  await recognizeTextFromImage(image.path);

       } else {
           GfGToast( 'file upload is failed');
 
            }
          }
     } catch (err) {

       GfGToast('connection is failed');
       console.log(err);

     }
    
     
    
      } catch (err) {
        if (err.message !== 'User cancelled image selection') {
          console.error(err);
        }
      }
    };
  
    const recognizeFromCamera = async (options = defaultPickerOptions) => {
      try {
        const image = await ImagePicker.openCamera(options);
        setImgSrc({uri: image.path});
        await recognizeTextFromImage(image.path);
      } catch (err) {
        if (err.message !== 'User cancelled image selection') {
          console.error(err);
        }
      }
    };

    const uploadImage = async (imageData) => {
      try {

        // Convert the image to base64
        const base64Image = `data:${imageData.type};base64,${imageData.data}`;
  
        // Send imageData to your Node.js server
        const response = await axios.post('https://api.softestingca.com/uploaded-files/ocr/'+ email.replace(' ', '').trim(), { imageData: base64Image });
  
        // Update the extracted text
        setExtractedText(response.data.text);
      } catch (error) {
        console.error(error);
      }
    };

    const viewDocument = async e => {
      console.log('z00z0z0z00z00z0')
      if (!isSign){ GfGToast('register your signature!');}
      console.log(`pdf: https://api.softestingca.com/uploaded-files/` +
      email.replace(/"/g, '').trim().toLowerCase() + `_OCR/`+ e)
     
       navigation.navigate('documentViewer', {pdf: {uri: `https://api.softestingca.com/uploaded-files/` +
           email.replace(/"/g, '').trim().toLowerCase() + `_OCR/`+ e , name: e}});
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
          <View>
           <CustomText fontFamily="System" size="2" color="rgba(9,19,128,1)"  styles={styles.titleText}> Optical Character Recognition  </CustomText>
           <CustomText fontFamily="System" size="2" color="rgba(9,19,128,1)"  styles={styles.titleText}>  extract text from images </CustomText>

           <TouchableOpacity
               disabled={isLoading}
               style={styles.button0}
               onPress={ () => {
                recognizeFromPicker();
              }}> 
              <CustomText fontFamily="System" size="1.7" color="rgba(9,19,128,1)" styles={styles.buttonText} > Import Image </CustomText>
            </TouchableOpacity>
       
           <TouchableOpacity
               disabled={isLoading}
               style={styles.button0}
               onPress={ () => {
                OCR();
              }}> 
              <CustomText fontFamily="System" size="1.7" color="rgba(9,19,128,1)" styles={styles.buttonText} > OCR </CustomText>
            </TouchableOpacity>
         
            </View>

           {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
             <ProgressCircle showsText size={40} indeterminate={true}  progress={progress} />
          ) : (
            <CustomText fontFamily="System"  size="1.5" color="rgba(9,19,128,1)">{text}</CustomText>
          )}
        </View>
      )}
      <View>
         {ocrDone &&  <CustomText fontFamily="System" size="1.5" color="rgba(9,19,128,1)"  styles={styles.titleText}>  You can find the PDF file in the link below. </CustomText>}
         {ocrDone && <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.card}
                    onPress={() => viewDocument(pdfName)}>
                    <CustomText fontFamily="System" size="1.5"  color="rgba(9,19,128,1)"  styles={styles.contract}> {pdfName}</CustomText>
                    </TouchableOpacity>}
          </View>
           </Screen>
        </ImageBackground>
    )
}


export default OCRScreen;