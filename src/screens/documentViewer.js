import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Alert, Text, Button} from 'react-native';

import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import {styles} from '../styles/documentViewer';

import {Screen} from '../components';



const DocumentViewer = ({navigation, route}) => {
  if (!route.params.pdf.uri) return null;
  const source = {uri: route.params.pdf.uri, catch: false};
  let uriSource = route.params.pdf.uri;
  const RNFS = require('react-native-fs');


  const downloadPDF = async () => {
    const url = 'https://example.com/path-to-your-pdf-file.pdf'; // Replace with your PDF URL
    const destinationPath = RNFS.DocumentDirectoryPath + '/downloadedFile.pdf';
  
    try {
      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: destinationPath,
      });
      if (response.statusCode === 200) {
        Alert.alert('Download Complete', `File saved to: ${destinationPath}`);
      } else {
        Alert.alert('Error', 'Failed to download PDF');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const cancel = () =>{

   navigation.navigate('ocrScreen');
   
  }

  return (
    <Screen>
     
              <View  >
               
                 <View style={{ marginBottom: 1 }}>
                    <Button 
                     title="Click Here To Cancel"
                     onPress={cancel}
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
    </Screen>
  );
};
export default DocumentViewer;
