// Import a libraries to help making a component
import React, {Component} from 'react';
import {TouchableOpacity, Image, ActivityIndicator, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {COLOR_WHITE} from '../assets/colors/colors';
// import {mainStyle} from '../styles/Styles';

// Make a component
class AppLoading extends Component {
  constructor(props) {
    super(props);
  }
  // Loader Types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],

  render() {
    const {isVisible, size, color, customStyle} = this.props;
    const {buttonStyle, text} = styles;
    return (
      //<View
      //  style={{
      //    flex: 1,
      //    alignItems: 'center',
      //    justifyContent: 'center',
      //  }}>
      //  <Spinner
      //    style={[
      //      {
      //        //   flexDirection: 'column',
      //        width: moderateScale(100),
      //        height: moderateScale(100),
      //        // backgroundColor: 'blue',
      //        flex: 1,
      //      },
      //      {customStyle},
      //    ]}
      //    isVisible={isVisible}
      //    size={size == '' && size == undefined ? moderateScale(22) : size}
      //    type={'Wave'}
      //    color={color ? color : COLOR_WHITE}
      //  />
      //</View>
      <ActivityIndicator
        style={[
          // mainStyle.absoluteCenter,
          {
            flex: 1,
          },
          customStyle,
        ]}
        size="large"
        color={color ? color : COLOR_WHITE}
      />
    );
  }
}

const styles = ScaledSheet.create({
  text: {
    fontSize: '16@ms',
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: '10@ms',
    paddingTop: '10@ms',
  },
  buttonStyle: {
    height: '40@ms',
    width: '305@ms',
    borderWidth: '0.5@ms',
    marginLeft: '5@ms',
    marginRight: '5@ms',
    marginTop: '20@ms',
  },
  ImageIconStyle: {
    height: '25@ms',
    width: '25@ms',
    alignSelf: 'center',
    marginTop: '7@ms',
  },
});

// Make the component available to other parts of the app
export {AppLoading};
