import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLOR_PRIMARY} from '../assets/colors/colors';
import Text from './Text';

export default class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPress() {
    this.props.onPressGo('pressed');
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.onPress()}
        disabled={this.props.disabled ? true : false}
        style={[
          styles.defaultButtonStyle,
          this.props.buttonStyle ? this.props.buttonStyle : null,
        ]}>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={[
              styles.defaultTextStyle,
              this.props.textStyle ? this.props.textStyle : null,
            ]}>
            {this.props.buttonText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center', // flex: 1,
    elevation: moderateScale(10),
    borderRadius: moderateScale(100),
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 33.0,
  },
  defaultButtonStyle: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(10),
  },
  defaultTextStyle: {
    color: COLOR_PRIMARY,
    textShadowRadius: moderateScale(5),
    fontSize: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    textAlign: 'center',
  },
});
