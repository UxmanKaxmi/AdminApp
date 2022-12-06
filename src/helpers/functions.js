//USE import {"function name"} from 'helpers/functions';

import {Dimensions} from 'react-native';
import {API_LINK} from './constants';
import {showToast} from '../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Setting up global variable
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

//retruns all the saved data
export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();

    console.log('keys', keys);
  } catch (e) {
    // read key error
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};

//remove the disable key when the use presses enable

export const removeDisabledData = async id => {
  console.log('removeDisabledData', id);
  try {
    const oldValue = await AsyncStorage.getItem('@disabled');

    if (oldValue != null) {
      let newValue = oldValue.replace(id, '');

      await AsyncStorage.setItem('@disabled', newValue);
    } else {
    }
  } catch (e) {
    // saving error
    console.error('Save Error', e);
  }
};

//Save id of the disabled students
export const saveDisabledData = async id => {
  console.log('saveDisabledData', id);
  try {
    const oldValue = await AsyncStorage.getItem('@disabled');
    let newValue;
    const jsonValue = JSON.stringify(id);

    if (oldValue == null) {
      await AsyncStorage.setItem('@disabled', jsonValue);
    } else {
      //save the last message so we can use it later in the app
      if (!oldValue.includes(id)) {
        newValue = oldValue.concat(jsonValue);

        await AsyncStorage.setItem('@disabled', newValue);
      }
    }
  } catch (e) {
    // saving error
    console.error('Save Error', e);
  }
};

//get Last message Date of the any chat
export const getChatLastMessageDate = async id => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lastMessageDate' + id);
    // console.log('jsonValue', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Error: Get local storage', e);
    // error reading value
  }
};

//get Last user of the any chat
export const getChatLastUser = async id => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lastUser');
    console.log('getChatLastUser', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Error: Get local storage', e);
    // error reading value
  }
};

//get Last message of the any chat
export const getChatLastMessage = async id => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lastMessage' + id);

    return jsonValue;
  } catch (e) {
    console.error('Error: Get local storage', e);
    // error reading value
  }
};

//get id of the disabled students
export const getDisabledData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@disabled');

    if (jsonValue != null) {
      return jsonValue;
    } else {
      return;
    }
  } catch (e) {
    console.error('Error: Get local storage', e);
    // error reading value
  }
};

//To be used in all Services Call
export const fetchAPI = (route, requestOptions) => {
  //console.log('fetchAPI', API_LINK + route, requestOptions);
  return fetch(API_LINK + route, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (response.error) {
        showToast(response.error);
      }
      return response;
    })
    .catch(error => {
      showToast('ERROR: ' + error + ' in ' + route + ' in Fetch API');
      console.log('ERROR: ' + error + ' in ' + route + ' in Fetch API');
      return false;
    });
};
