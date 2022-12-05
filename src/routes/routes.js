import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppLoading} from '../components/AppLoading';

import StudentProfile from '../pages/student/student-profile';
import StudentList from '../pages/student/student-profile-list';

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
        <Text>Loading</Text>
      </View>
    );
  };

  // const homeStack = ({navigation}) => {
  //   return (
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen
  //         name="Home"
  //         component={Home}
  //         options={{
  //           headerTitle: '',
  //           headerTintColor: 'white',
  //           //headerShown: false,
  //           headerTransparent: true,
  //           //headerStyle: {
  //           //  backgroundColor: 'transparent',
  //           //},
  //           //header
  //         }}
  //       />
  //     </Stack.Navigator>
  //   );
  // };

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Student Profile List" component={StudentList} />
        <Tab.Screen name="Student Chat List" component={StudentList} />
      </Tab.Navigator>
    );
  };

  const ChatNavigator = () => {
    return (
      <View style={styles.chatNavigatorView}>
        <Stack.Navigator initialRouteName="Chat">
          <Stack.Screen
            name="Chat Main"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    );
  };
  const RenderHomeNavigator = () => {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <Stack.Navigator initialRouteName="StudentList">
          <Stack.Screen
            name="Student List"
            component={StudentList}
            options={
              {
                // headerTitle: '',
                // headerTintColor: 'white',
                //headerShown: false,
                // headerTransparent: true,
                //headerStyle: {
                //  backgroundColor: 'transparent',
                //},
                //header
              }
            }
          />
          <Stack.Screen
            name="Student Profile"
            component={StudentProfile}
            options={
              {
                // headerTitle: '',
                // headerTintColor: 'white',
                //headerShown: false,
                // headerTransparent: true,
                //headerStyle: {
                //  backgroundColor: 'transparent',
                //},
                //header
              }
            }
          />
        </Stack.Navigator>
      </View>
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
        <Stack.Screen name="Chat" component={ChatNavigator} />
        <Stack.Screen name="Student Profile" component={StudentProfile} />
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
