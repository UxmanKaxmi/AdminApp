import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import {
  getAllKeys,
  getDisabledData,
  removeDisabledData,
  saveDisabledData,
} from '../../helpers/functions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

function StudentProfile(props) {
  const navigation = useNavigation();
  let data = props?.route?.params?.profileData;
  let isDisabled = props?.route?.params?.isDisabled;

  const [isDisable, setIsDisable] = useState(isDisabled);

  useFocusEffect(
    React.useCallback(() => {
      getDisabledData()
        .then(item => {
          console.log('asd', item);
          if (item !== null && item.includes(data.rollNumber)) {
            setIsDisable(true);
          }
        })
        .finally(() => {});
    }, []),
  );

  const onPressEnable = async rollNumber => {
    console.log('onPressEnable');
    setIsDisable(false);

    await removeDisabledData(rollNumber).finally(() => {
      navigation.goBack();
    });

    Toast.show({
      type: 'success',
      text1: 'Note',
      text2: "This student's' profile is Enabled",
    });
  };

  const onPressDisable = async rollNumber => {
    console.log('onPressDisable');

    setIsDisable(true);

    await saveDisabledData(rollNumber).finally(() => {
      navigation.goBack();
    });

    Toast.show({
      type: 'success',
      text1: 'Note',
      text2: "This student's profile is Disabled",
    });
  };

  return (
    <View style={styles.container}>
      <View style={{marginVertical: moderateScale(30)}}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: data.picture,
          }}
        />
        <View style={styles.nameTextView}>
          <Text style={[styles.nameText, {marginEnd: moderateScale(10)}]}>
            {data.firstName}
          </Text>
          <Text style={styles.nameText}>{data.lastName}</Text>
        </View>
      </View>

      <View style={{marginHorizontal: moderateScale(30)}}>
        <View style={{}}>
          <Text style={styles.headingLeft}>Roll Number</Text>
          <Text style={styles.content}>{data.rollNumber}</Text>

          <Text style={styles.headingLeft}>Class</Text>
          <Text style={styles.content}>{data.class}</Text>

          <Text style={styles.headingLeft}>Email</Text>
          <Text style={styles.content}>{data.email}</Text>

          <Text style={styles.headingLeft}>Class</Text>
          <Text style={styles.content}>{data.country}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chat', {
              chatData: data,
            })
          }
          style={styles.chatStudentButton}>
          <Text style={styles.buttonText}>Chat with {data.firstName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isDisable
              ? onPressEnable(data.rollNumber)
              : onPressDisable(data.rollNumber)
          }
          style={[
            styles.chatEnableButton,
            {
              backgroundColor: isDisable ? '#ADD8E6' : '#E7625F',
            },
          ]}>
          <Text style={styles.buttonText}>
            {isDisable ? 'Enable' : 'Disable'}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  chatEnableButton: {
    width: '40%',
    height: moderateScale(50),
    borderRadius: 10,
    marginHorizontal: moderateScale(20),
  },
  chatStudentButton: {
    width: '40%',
    height: moderateScale(50),
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  nameText: {
    textAlign: 'center',
    marginEnd: moderateScale(10),
    fontSize: moderateScale(25),
  },
  nameTextView: {
    alignItems: 'center',
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(12),
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlignVertical: 'center',
    flex: 1,
  },
  content: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  headingLeft: {
    fontSize: moderateScale(18),
    color: 'green',
  },
  image: {
    alignSelf: 'center',
    height: moderateScale(200),
    width: moderateScale(200),
    borderRadius: 200,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
export default StudentProfile;
