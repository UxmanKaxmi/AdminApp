import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
  Text,
  Styles,
  StyleSheet,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {COLOR_WHITE} from '../assets/colors/colors';

export default function StudentCard({props, onPress, isDisabled}) {
  let data = props.item;

  // console.log('isDisabled', isDisabled);

  return (
    <TouchableOpacity
      key={data.rollNumber}
      onPress={() => onPress(data)}
      style={[styles.container, {opacity: isDisabled ? 1 : 0.3}]}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: data.picture,
            }}
          />
        </View>

        <View style={styles.ContentContainer}>
          <View style={styles.flexRow}>
            <View style={{}}>
              <Text style={styles.headingLeft}>First Name</Text>
              <Text style={styles.content}>{data.firstName}</Text>
            </View>

            <View style={styles.textLeft}>
              <Text style={styles.heading}>Last Name</Text>
              <Text style={styles.content}>{data.lastName}</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={{}}>
              <Text style={styles.headingClass}>Class</Text>
              <Text style={styles.content}>{data.class}</Text>
            </View>

            <View style={styles.textLeft}>
              <Text style={styles.heading}>Roll Number</Text>
              <Text style={styles.content}>{data.rollNumber}</Text>
            </View>
          </View>
        </View>
      </View>
      {isDisabled ? null : (
        <View style={styles.disableView}>
          <Text style={styles.disableText}>Disabled</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disableText: {
    fontSize: moderateScale(10),
  },
  disableView: {
    position: 'absolute',
    right: moderateScale(20),
    bottom: moderateScale(5),
    width: moderateScale(70),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(20),
    backgroundColor: 'red',
  },
  textLeft: {
    marginStart: moderateScale(30),
  },
  ContentContainer: {
    flex: 1,
    // marginVertical: 20,
    marginLeft: moderateScale(10),
  },
  image: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: 90,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  flexRow: {
    flexDirection: 'row',
  },
  container: {
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(6),

    marginTop: moderateScale(0),
    width: '100%',
    backgroundColor: 'lightgrey',
    // borderRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
  },
  content: {
    fontSize: moderateScale(11),

    marginBottom: moderateScale(10),
  },
  headingLeft: {
    fontSize: moderateScale(13),
    color: 'green',
    marginRight: moderateScale(20),
  },
  headingClass: {
    fontSize: moderateScale(13),
    color: 'green',
    marginRight: moderateScale(55),
  },
  heading: {
    fontSize: moderateScale(13),
    color: 'green',
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
