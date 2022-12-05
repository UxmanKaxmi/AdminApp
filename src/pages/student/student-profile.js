import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

function StudentProfile(props) {
  let data = props?.route?.params?.profileData;
  console.log(data);
  const [isEnable, setIsEnable] = useState(true);

  const onPressEnable = () => {
    setIsEnable(!isEnable);
    Toast.show({
      type: 'success',
      text1: 'Note',
      text2: isEnable
        ? "This student's' profile is Enabled"
        : "This student's' profile is Disabled",
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
        <TouchableOpacity style={styles.chatStudentButton}>
          <Text style={styles.buttonText}>Chat with Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressEnable()}
          style={[
            styles.chatEnableButton,
            {
              backgroundColor: isEnable ? '#ADD8E6' : '#E7625F',
            },
          ]}>
          <Text style={styles.buttonText}>
            {isEnable ? 'Enable' : 'Disable'}
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
