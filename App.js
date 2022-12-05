import React, {Component} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import {navigationRef} from './src/routes/rootNavigation';
import 'react-native-gesture-handler';

enableScreens();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Routes />
    </NavigationContainer>
  );
}
export default App;
