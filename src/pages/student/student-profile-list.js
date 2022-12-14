import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import StudentCard from '../../components/StudentCard';
import StudentMockList from '../../mock-student-data.json';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getDisabledData} from '../../helpers/functions';

import {useIsFocused} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

function App() {
  const navigation = useNavigation();
  const [disabledStudents, setDisabledStudents] = useState();
  const inputEl = useRef(null);

  const [mockData, setMockData] = useState(StudentMockList);
  const [originalData, setOriginalData] = useState(StudentMockList);
  const [search, setSearch] = useState(StudentMockList);

  const openProfilePage = (data, isDisabled) => {
    navigation.navigate('Student Profile', {
      profileData: data,
      isDisabled: isDisabled,
    });
  };

  const searchFilterFunction = val => {
    console.log(val);
    if (val && val.replace(/^\s+|\s+$/g, '').length) {
      // this.setState({isSearch: true, search: val});
      setSearch(val);
      let students = mockData.filter(item => {
        return (
          (item.firstName &&
            item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.lastName &&
            item.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.rollNumber &&
            item.rollNumber.toString().indexOf(val.toString()) > -1) ||
          (item.class &&
            item.class.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.country &&
            item.country.toLowerCase().indexOf(val.toLowerCase()) > -1)
        );
      });
      setMockData(students);
    } else {
      setSearch('');
      setMockData(originalData);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      search === '' ? setMockData(originalData) : null;
      getDisabledData().then(item => {
        if (item !== null) {
          setDisabledStudents(item?.toString());

        }
        return console.log('item', item);
      });
    }, []),
  );

  const renderHeader = () => {
    return (
      <View style={styles.renderHeaderView}>
        <TextInput
          ref={inputEl}
          autoCapitalize="none"
          placeholderTextColor={'lighgrey'}
          underlineColorAndroid="transparent"
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          placeholder="Search by name, class, roll number..."
        />
        {search == '' ? (
          <Image
            resizeMode="contain"
            style={styles.iconSearch}
            source={require('../../assets/images/search-icon.png')}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              return setMockData(originalData);
            }}
            style={{}}>
            <Text style={styles.iconx}>x</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* {console.log('disabledStudents', studentData?.item?.rollNumber)}
      {console.log('disabledStudents', disabledStudents)} */}

      <FlatList
        ListHeaderComponent={renderHeader()}
        data={mockData}
        renderItem={studentData => {
          return (
            <StudentCard
              props={studentData}
              isDisabled={
                !disabledStudents?.includes(studentData.item.rollNumber)
                  ? true
                  : false
              }
              onPress={item => openProfilePage(item)}
            />
          );
        }}
        keyExtractor={item => item?.rollNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconx: {
    fontSize: moderateScale(25),
    fontWeight: '200',
    alignSelf: 'center',
    marginEnd: moderateScale(10),
  },
  iconSearch: {
    width: moderateScale(20),
    height: moderateScale(25),
    alignSelf: 'center',
    marginEnd: moderateScale(10),
  },
  renderHeaderView: {
    backgroundColor: '#fff',
    padding: moderateScale(10),
    // marginVertical: moderateScale(10),
    // borderRadius: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    // height: '100%',
    // width: '100%',
  },
});
export default App;
