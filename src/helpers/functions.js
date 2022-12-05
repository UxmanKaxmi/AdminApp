//USE import {"function name"} from 'helpers/functions';

import {Dimensions} from 'react-native';
import {API_LINK} from './constants';
import {showToast} from '../components/Toast';

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
