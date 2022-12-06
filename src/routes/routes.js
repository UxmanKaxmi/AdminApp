import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppLoading} from '../components/AppLoading';

import StudentProfile from '../pages/student/student-profile';
import StudentList from '../pages/student/student-profile-list';
import StudentChatList from '../pages/student/student-chat-list';

import Chat from '../pages/chat/chat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../components/Toast';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import {connect} from 'react-redux';
// import { isUserLoggedIn, UserData } from "../redux/actions";

// import Home from '../pages/home/containers/home';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    checkIfFirstTime();
  });

  //To check if the user opens the app for the first time
  const checkIfFirstTime = async () => {
    try {
      let value = await AsyncStorage.getItem('isLoggedIn');

      if (value !== null) {
        // We have data!!
        let jsonVal = JSON.parse(value);
        showToast('Welcome Back,');

        setIsFirstTime(false);
      } else {
        setIsFirstTime(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      console.log('error fetching data from local storage', error);
      // Error retrieving data
    }
  };

  const SplashScreen = ({navigation}) => {
    return (
      <View style={styles.splashView}>
        <AppLoading />
      </View>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Student Profile List" component={StudentList} />
        <Tab.Screen name="Student Chat List" component={StudentChatList} />
      </Tab.Navigator>
    );
  };

  if (isLoading) {
    // We haven't finished checking for if the user has opened the app for the first time
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Admin App" component={TabNavigator} />

        <Stack.Screen name="Student Profile" component={StudentProfile} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    );
  }
}

export default Routes;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
  },
  chatNavigatorView: {
    flex: 1,
  },
});
