import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Button, LogBox,  ToastAndroid,} from 'react-native';
import Pdf from 'react-native-pdf';
import {PDFDocument} from 'pdf-lib';
import {decode, encode, base64} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/documentScreen';

import {Screen, MyStatusBar, CustomButton} from '../components';

const DocumentScreen = ({navigation, route}) => {
  /// const x  = route.params.pdf.uri.replace('content:/','https:/')

  if (!route.params.pdf.uri) return null;
  const source = {uri: route.params.pdf.uri, catch: false};
  let uriSource = route.params.pdf.uri;
  let pdfDoc =  PDFDocument.load(pdfArrayBuffer);
  
  ///.replace('content://','http://');
  
  const RNFS = require('react-native-fs');
  //const filePath = RNFS.DocumentDirectoryPath + '/react-native.pdf';

  const [fileDownloaded, setFileDownloaded] = useState(false);
  const [getSignaturePad, setSignaturePad] = useState(false);
  const [pdfEditMode, setPdfEditMode] = useState(false);
  const [signatureBase64, setSignatureBase64] = useState(null);
  const [signatureArrayBuffer, setSignatureArrayBuffer] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [newPdfSaved, setNewPdfSaved] = useState(false);
  const [newPdfPath, setNewPdfPath] = useState(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [subTitleBase64, setSubTitleBase64] = useState(null);
  const [signDateBase64, setSignDateBase64] = useState(null);
  const [subTitleArrayBuffer, setSubTitleArrayBuffer] = useState(null);
  const [signDateArrayBuffer, setSignDateArrayBuffer] = useState(null);
  const [singleTap, setSingleTap] = useState(false);
  const [filePath, setFilePath] = useState(
    RNFS.DocumentDirectoryPath + '/' + route.params.pdf.name,
  );
  const [file, setFile] = useState(
     uriSource.toString().substring(0, 10) === 'content://'?  uriSource: filePath
  );
  
  LogBox.ignoreLogs(['Require cycle:']);
  


  useEffect(() => {

    const getSign = async () => {
      
      if (
        (await AsyncStorage.getItem('sign')) === undefined ||
        (await AsyncStorage.getItem('sign')) === '' ||
        (await AsyncStorage.getItem('sign')) === null
      ) {
        GfGToast('register you signature!');
      } else {
    
        setSignatureBase64(await AsyncStorage.getItem('sign'));
        setSubTitleBase64(await AsyncStorage.getItem('subTitle'));
        setSignDateBase64(await AsyncStorage.getItem('signDate'));
    
     //   console.log('route.params.pdf.name', JSON.stringify(route.params.pdf.name))
        await AsyncStorage.setItem('originalPdfName' , route.params.pdf.name? route.params.pdf.name: null);
      }
    };

    getSign();
  },  [route.params.pdf.uri, filePath, file, setFile, setFilePath, newPdfSaved, signatureBase64]);

  useEffect(() => {
    console.log('useEffect ran');
    handleSignature(); ////.replace("data:image/png;base64,", ""));
  
    if (uriSource.toString().substring(0, 10) === 'content://') {
      if (!fileDownloaded) {
        setFileDownloaded(true);
        readFile();
      }
    } else {
     
      downloadFile();
    }
    
    if (signatureBase64) {
      setSignatureArrayBuffer(
        _base64ToArrayBuffer(
          signatureBase64.split(',')[1].replace(/(?:\r\n|\r|\n)/g, ''),
        ),
      );
    }
    
    if (newPdfSaved) {
      setFilePath(newPdfPath);  
      setPdfArrayBuffer(_base64ToArrayBuffer(pdfBase64));
    }
  
  }, [route.params.pdf.uri, filePath, file, setFile, setFilePath, newPdfSaved, signatureBase64]);


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

  const _base64ToArrayBuffer = base64 => {
  
    let binaryString = decode(base64);

    let binaryLength = binaryString.length;
   
    let bytes = new Uint8Array(binaryLength);
   
    for (let i = 0; i < binaryLength; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
   
    return bytes;
  };

 

  const _uint8ToBase64 = u8Arr => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return encode(result);
  };
 
  const readFile = () => {
    // if (
    //   !RNFS.stat(RNFS.DocumentDirectoryPath + '/' + route.params.pdf.name)
    // ) {
    //   GfGToast(route.params.pdf.name + 'file is not exists!');
    // }
     
  
    RNFS.readFile(file, 'base64').then(contents => {
      setPdfBase64(contents);
     const buf1 = _base64ToArrayBuffer(contents);
  
      setPdfArrayBuffer(buf1);      
    });
  };

  const handleSignature = () => {
    setSignaturePad(false);
    setPdfEditMode(true);
  };

  const handleSingleTap = async (page, x, y) => {
    try{
    if (pdfEditMode) {
    
       pdfDoc = await PDFDocument.load(pdfArrayBuffer);
       const pages = pdfDoc.getPages();
       const firstPage = pages[page - 1];
    
       const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);   

      if (Platform.OS ==='android') {
        firstPage.drawImage(signatureImage, {
          x: (firstPage.getWidth() * x) / pageWidth - 50,
          y:
            firstPage.getHeight() -
            (firstPage.getHeight() * y) / pageHeight -
            75,
          width: 150,
          height: 150,
        });
       
          firstPage.drawText(subTitleBase64, {
            x: (firstPage.getWidth() * x) / pageWidth - 10,
            y:
              firstPage.getHeight() -
              (firstPage.getHeight() * y) / pageHeight -
              20,
            width: 80,
            height: 50,
            size:12,
        //    embedFont:subTitleImage,
          });
     
          firstPage.drawText(signDateBase64.substring(0, signDateBase64.length-20), {
            x: (firstPage.getWidth() * x) / pageWidth - 20,
            y:
              firstPage.getHeight() -
              (firstPage.getHeight() * y) / pageHeight -
              50,
            width: 80,
            height: 50,
            size:9,
        ///    embedFont:signDateImage,
        
          });
      } else {
        console.log('signatureImage',signatureImage);
        console.log('subTitleBase64',subTitleBase64);
        console.log('signDateBase64',signDateBase64);

        ///if (subTitleBase64 === undefined || subTitleBase64 === null) {subTitleBase64=''}

        firstPage.drawImage(signatureImage, {
          x: (firstPage.getWidth() * x) / pageWidth - 10,
          y:
            firstPage.getHeight() -
            (firstPage.getHeight() * y) / pageHeight -
            110,
          width: 150,
          height: 150,
        });
       
          firstPage.drawText(subTitleBase64, {
            x: (firstPage.getWidth() * x) / pageWidth - 0,
            y:
              firstPage.getHeight() -
              (firstPage.getHeight() * y) / pageHeight -
              70,
            width: 80,
            height: 50,
            size:12,
        //    embedFont:subTitleImage,
          });
     
          firstPage.drawText(signDateBase64.substring(0, signDateBase64.length-18), {
            x: (firstPage.getWidth() * x) / pageWidth - 0,
            y:
              firstPage.getHeight() -
              (firstPage.getHeight() * y) / pageHeight -
              90,
            width: 80,
            height: 50,
            size:9,
        ///    embedFont:signDateImage,
        
          });
        }
 
        setSingleTap(true);
       /// if (singleTap) {GfGToast('The sign was added');}
        GfGToast('The sign was added');
      
      // // Play with these values as every project has different requirements
      // const pdfBytes = await pdfDoc.save();
      // const pdfBase64 = _uint8ToBase64(pdfBytes);
      // const path = `${
      //   RNFS.DocumentDirectoryPath
      // }/react-native_signed_${Date.now()}.pdf`;
      
      // await AsyncStorage.setItem("pdfName", path);
      // await AsyncStorage.setItem('originalPdfName' , route.params.pdf.name? route.params.pdf.name: null)
    
      // RNFS.writeFile(path, pdfBase64, 'base64')
      //   .then(success => {
      //     setNewPdfPath(path);
      //     setNewPdfSaved(true);
      //     setPdfBase64(pdfBase64);
      //    })
      //    .then(
      //       navigation.navigate('sendEmail', {originalPdfName: route.params.pdf.name, pdfName:path})
      //     )
       
      //   .catch(err) => {
      //     console.log(err.message);
      //   });
        
    }

  }catch(err){

    setFileDownloaded(false);
    setNewPdfSaved(false);
    setPdfEditMode(false);

    GfGToast('The file is in the incorrect format!');
    navigation.navigate('documentPicker');
  }
  };

  const saveDocument = async() => {
   
     if (  singleTap === false) {GfGToast(" Tap on the desired place of the document to be signed "); return;};
     try{

      setNewPdfSaved(false);
      setFilePath(null);
      setPdfEditMode(false);

     // Play with these values as every project has different requirements
     const pdfBytes = await pdfDoc.save();
     const pdfBase64 = _uint8ToBase64(pdfBytes);
     const path = `${
       RNFS.DocumentDirectoryPath
     }/react-native_signed_${Date.now()}.pdf`;
     
     await AsyncStorage.setItem("pdfName", path);
     await AsyncStorage.setItem('originalPdfName' , route.params.pdf.name? route.params.pdf.name: null)
   
     RNFS.writeFile(path, pdfBase64, 'base64')
       .then(success => {
         setNewPdfPath(path);
         setNewPdfSaved(true);
         setPdfBase64(pdfBase64);
        })
        .then(
           navigation.navigate('sendEmail', {originalPdfName: route.params.pdf.name, pdfName:path})
         )
      
       .catch(err => {
         console.log(err.message);
       });
      }
      catch(err){
     //   GfGToast(err);
        setFileDownloaded(false);
        setNewPdfSaved(false);
        setPdfEditMode(false);
    
        GfGToast('The file is in the incorrect format. It can not save!'+ err);
        navigation.navigate('documentPicker');

      }

  }
  const downloadFile = () => {
    console.log('___downloadFile -> Start');
   console.log('FILEPATH', filePath)
    if (!fileDownloaded) {
      RNFS.downloadFile({
        fromUrl: uriSource,
        toFile: filePath,
      }).promise.then(res => {
        console.log('readFile')
        setFileDownloaded(true);
        readFile();
        console.log('___downloadFile -> File downloaded', res);

        console.log('end');
      });
    }
  };

  const cancel = () =>{
  
    setNewPdfSaved(false);
    setPdfEditMode(false);

   navigation.navigate('documentPicker');
   
  }

  return (
    <Screen  style={styles.container} >
    
        {fileDownloaded && (
          <View >
            {filePath ? (
              <View  >
               <View style={{ marginBottom: 5 }}>
                 <Button 
                    title= " Tap on the desired place of the document to be signed "
                    color='rgba(9,19,128,1)'
                  />
                 </View>
                 <View style={{ marginBottom: 1 }}>
                    <Button 
                     title="Click Here To Cancel"
                     onPress={cancel}
                     color='rgba(9,19,128,1)'
                     styles={{ marginTop:10}}
                     />
                  </View>
                  <View style={{ marginBottom: 0 }}>
                    <Button 
                     title="Click Here To Save Document"
                     onPress={saveDocument}
                     color='rgba(9,19,128,1)'
                     styles={{ marginTop:10}}
                     />
                  </View>
                  
                <Pdf
                  minScale={1.0}
                  maxScale={1.0}
                  scale={1.0}
                  spacing={0}
                  fitPolicy={0}
                  enablePaging={true}
                  usePDFKit={false}
                  source={source}
                  trustAllCerts={false}
                  onLoadComplete={(
                    numberOfPages,
                    filePath,
                    {width, height},
                  ) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                    console.log(`width: ${width}`);
                    console.log(`height: ${height}`);
                    setPageWidth(width);
                    setPageHeight(height);
                  }}
                  onPageSingleTap={(page, x, y) => {
                    console.log(`tap: ${page}`);
                    console.log(`x: ${x}`);
                    console.log(`y: ${y}`);
                    handleSingleTap(page, x, y);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onPressLink={uri => {
                    console.log('^^^^^^')
                    console.log(`Link pressed: ${uri}`);
                  }}
                  onError={error => {
                    console.log('pdferror',error);
                  }}
                  style={styles.pdf}
                />
              </View>
             )
             : 
            (
               <View style={styles.button}>
                 <Text style={styles.buttonText}>Saving PDF File...</Text>
               </View>
             )}
          </View>
        )}
    
    </Screen>
  );
};

export default DocumentScreen;
