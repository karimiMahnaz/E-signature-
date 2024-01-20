import React, {useState, useEffect} from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from "../src/screens/welcomeScreen";
import LoginScreen from '../src/screens/loginScreen';
import ProfileScreen from '../src/screens/profileScreen';
import SignScreen from '../src/screens/signScreen';
import OCRScreen from '../src/screens/ocrScreen';
import DocumentPickerScreen from '../src/screens/documentPickerScreen';
import SendEmailScreen from '../src/screens/sendEmailScreen';
import {getContracts} from '../api/users';
//import Notification from "../notification";

const Tab = createBottomTabNavigator();

const TabsNavigator = ({documentCount}) => {

  ///  const archiveSearch = ( <Icon name= "archive-search" size ={24} color="#ffff" />);
  const [date, setDate] = useState(new Date());
  const [contracts, setContracts] = useState({});
  const [email, setEmail] = useState('');
  const [documentsCount, setDocumentsCount] = useState(0);

//   const setNotification =() =>{
//     Notification.schduleNotification(date);
//   }

  useEffect(()=>{
    
    const checkForNet = async () => {
    try {
      const mail = await AsyncStorage.getItem('email');
      setEmail(JSON.parse(mail));
     /// console.log('email', mail);
      if (mail !== null && mail !== '') {
        let {data} = await getContracts(mail);
        
      //  console.log('data', data);
        if (data) {
        //   data !== null && data !== '' && data != undefined
        //     ? setNotification()
        //     : null;

          data !== null && data !== '' && data != undefined
            ? setDocumentsCount(data.length)
            : setDocumentsCount(0);
          //  console.log('documentsCount', documentsCount)
            data = '';
        }
      } else{
        data='';
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkForNet();

   },[])



   
    return (
        <Tab.Navigator
            initialRouteName="welcome"
            screenOptions={({ route }) => (
                {
                    "tabBarActiveTintColor": "dodgerblue",
                    "tabBarInactiveTintColor": "gray",
                    "tabBarActiveBackgroundColor": "linen",
                    "tabBarLabelStyle": {
                        "fontFamily": "System",
                        "fontSize": RFPercentage(1.5)
                    },
                    "tabBarStyle": [
                        {
                            "display": "flex"
                        },
                        null
                    ]
                },
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "signature") {
                            iconName = focused    
                                ? "archive-search" 
                                : "archive-search-outline";
                        } else if (route.name === "profile") {
                            iconName = focused
                                ? "face-man-profile"
                                : "face-woman-profile";
                        } else if (route.name === "login" && email === null) {
                            iconName = "login";
                        } else if (route.name === "documentPicker") {
                            iconName = focused 
                                ? "file-document"
                                : "file-document-edit-outline"
                         } else if (route.name === "ocrScreen") {
                              iconName = focused 
                                   ? "file-image"
                                   : "file-image-outline"
                        } else if (route.name === "welcome") {
                            iconName = focused 
                                ? "water-well"
                                : "water-well-outline"
                        }else if (route.name === "sendEmail") {
                            iconName = focused 
                                ? "email-send"
                                : "email-outline"
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}

        // tabBarOptions={{
        //     activeTintColor: "tomato",
        //     inactiveTintColor: "gray",
        //     activeBackgroundColor: "light",
        //     labelStyle: {
        //         fontFamily: "arimoRegular",
        //         fontSize: RFPercentage(1.5),
        //     },
        // }}


        >



            <Tab.Screen
                name="welcome"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="signature"
                component={SignScreen}
                options={{
                    // tabBarLabel: "document",
                    headerShown: false,
                }}
            />
             {(email===null) ? <Tab.Screen
                name="login"
                component={LoginScreen}
                options={{
                    //  tabBarLabel: "login",
                    headerShown: false,
                }}
            />: null}

            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    //  tabBarLabel: "profile",
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="ocrScreen"
                component={OCRScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="documentPicker"
                component={DocumentPickerScreen}
                options={{
                    headerShown: false,
                    tabBarBadge: documentsCount>0? documentsCount:null,
                }}
            />
            
            <Tab.Screen
                name="sendEmail"
                component={SendEmailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};
    
export default TabsNavigator;
