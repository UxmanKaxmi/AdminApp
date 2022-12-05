// React Native and 3rd party plugins
import React, {Component, PureComponent} from 'react';
import {View, Image, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLOR_GRADIENT_START} from '../assets/colors/colors';
import Lock from '../assets/images/no-record.png';

export default class NoDataFound extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Lock />
        <Text
          style={{
            fontSize: moderateScale(12),
            color: COLOR_GRADIENT_START,
            textAlign: 'center',
          }}>
          Nothing here...
        </Text>
      </View>
    );
  }
}
