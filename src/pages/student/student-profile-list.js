import React, {Componen, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import StudentCard from '../../components/StudentCard';
import StudentMockList from '../../mock-student-data.json';
import {useNavigation} from '@react-navigation/native';

function App() {
  const getStudents = () => {};
  const navigation = useNavigation();

  const openProfilePage = data => {
    navigation.navigate('Student Profile', {
      profileData: data,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={StudentMockList}
        renderItem={studentData => (
          <StudentCard
            key={studentData.index}
            props={studentData}
            onPress={studentData => openProfilePage(studentData)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // height: '100%',
    // width: '100%',
  },
});
export default App;
