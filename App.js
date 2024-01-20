import React, {useState, useEffect} from "react";

import {I18nManager } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from "react-native-bootsplash";

import WelcomeScreen from "./src/screens/welcomeScreen";
import LoginScreen  from "./src/screens/loginScreen";
import ProfileScreen  from "./src/screens/profileScreen";
import SignScreen  from "./src/screens/signScreen";
import OCRScreen from "./src/screens/ocrScreen";
import DocumentPickerScreen  from "./src/screens/documentPickerScreen";
import DocumentScreen  from "./src/screens/documentScreen";
import DocumentViewer  from "./src/screens/documentViewer";
import SendEmailScreen  from "./src/screens/sendEmailScreen";
import RegisterScreen  from "./src/screens/registerScreen";
import TabsNavigator from "./containers/tabsNavigator";
import  './src/utils/ignoreWarnings';

//* Support for RTL
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);  


export default function App() {

  
  
  // Here we are calling Notification func
  

  const Stack =createNativeStackNavigator();

   useEffect(()=>{
    const init = async () => {
     RNBootSplash.hide({ fade: true }); // fade
    }
    init();

   },[])

  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
               <Stack.Screen name="Home" component={TabsNavigator}  /> 
               <Stack.Screen name="welcome" component={WelcomeScreen}  />          
               <Stack.Screen name="login" component={LoginScreen} />
               <Stack.Screen name="profile" component={ProfileScreen} />
               <Stack.Screen name="signature" component={SignScreen} />  
               <Stack.Screen name="ocrScreen" component={OCRScreen} />
               <Stack.Screen name="documentPicker" component={DocumentPickerScreen} />
               <Stack.Screen name="document" component={DocumentScreen} />
               <Stack.Screen name="sendEmail" component={SendEmailScreen} />
               <Stack.Screen name="register" component={RegisterScreen} />
               <Stack.Screen name="documentViewer" component={DocumentViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
};


