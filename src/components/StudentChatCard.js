import {useFocusEffect} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
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
import {getChatLastMessage, getChatLastMessageDate} from '../helpers/functions';
import HumanizeDuration from 'react-humanize-duration';
import moment from 'moment';
import TimeAgo from 'react-native-timeago';

export default function StudentChatCard({props, onPress, isDisabled}) {
  let data = props.item;

  const [lastMessage, setLastMessage] = useState();
  const [lastMessageDate, setLastMessageDate] = useState();


  useFocusEffect(
    React.useCallback(() => {
      getChatLastMessage(data.rollNumber).then(val =>
        val == null
          ? setLastMessage('*No chat available*')
          : setLastMessage(val),
      );

      getChatLastMessageDate(data.rollNumber).then(val => {
        console.log('getChatLastMessageDate', val, data.rollNumber);

        console.log('firstName', data.firstName, val);

        setLastMessageDate(val);
      });
    }, []),
  );

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
              <Text style={styles.name}>{data.firstName}</Text>
            </View>

            <View style={styles.textLeft}>
              <Text style={styles.name}>{data.lastName}</Text>
            </View>

            <View
              style={
                (styles.textLeft,
                {
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  alignContent: 'flex-end',
                  flex: 1,
                  alignSelf: 'center',
                })
              }>
              <Text style={styles.class}>{data.class}</Text>
            </View>
            <View style={styles.textLeft}>
              <Text style={styles.rollNumber}>- {data.rollNumber}</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={{flex: 0.8}}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{
                  color:
                    lastMessage == '*No chat available*' ? '#B2BEB8' : 'grey',
                }}>
                {lastMessage}
              </Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={{flex: 0.8}}>
              <Text
                style={{
                  fontSize: moderateScale(10),
                  marginTop: moderateScale(20),
                  fontWeight: 'bold',
                }}>
                {lastMessageDate == null ? (
                  ''
                ) : (
                  <TimeAgo time={lastMessageDate} interval={20000} />
                )}
              </Text>
              {/* <Text
                style={{
                  color:
                    lastMessage == '*No chat available*' ? '#B2BEB8' : 'grey',
                }}>
                
                <HumanizeDuration
                  duration={getHumanizedDate(lastMessageDate)}
                />
              </Text> */}
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
  rollNumber: {
    fontSize: moderateScale(14),
    // marginBottom: moderateScale(5),
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'green',
  },
  class: {
    fontSize: moderateScale(12),
    // marginBottom: moderateScale(5),
    color: 'green',
  },

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
    marginStart: moderateScale(5),
    alignSelf: 'center',
    marginEnd: moderateScale(20),
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
  name: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(5),
    color: 'green',
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
    fontSize: moderateScale(10),
    // color: 'green',
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
