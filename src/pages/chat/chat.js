import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GiftedChat, MessageText} from 'react-native-gifted-chat';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [Id, setId] = useState(22);
  const [noFirstMessage, setNoFirstMessage] = useState(true);

  const saveChatData = async value => {
    console.log('saveChatData', value);
    try {
      //save the last message so we can use it later in the app
      let lastMessage = value.length > 0 && undefined && null ? value[1] : null;

      const jsonValue = JSON.stringify(value);

      AsyncStorage.setItem('@lastMessage', Id + '/message/', lastMessage);
      await AsyncStorage.setItem('@', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //   const getAllKeys = async () => {
  //     let keys = [];
  //     try {
  //       keys = await AsyncStorage.getAllKeys();

  //       console.log('keys', keys);
  //     } catch (e) {
  //       // read key error
  //     }

  //     console.log(keys);
  //     // example console.log result:
  //     // ['@MyApp_user', '@MyApp_key']
  //   };

  //get chat data from storage
  const getChatData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@');
      console.log('getChatData', jsonValue);

      if (jsonValue != null) {
        setNoFirstMessage(false);

        return setMessages(JSON.parse(jsonValue));
      } else {
        setNoFirstMessage(true);
        return;
      }
    } catch (e) {
      setNoFirstMessage(true);

      // error reading value
    }
  };

  const onSend = useCallback((messages = []) => {
    setNoFirstMessage(false);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    setTimeout(() => {
      setMessages(previousMessages => {
        //increase the id in the next message because every message requires a new key
        let previousId = previousMessages?.length;
        previousId = previousId + 1;

        let preMessage = {
          _id: previousId,
          text: 'Hello Teacher',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        };

        //save data in local storage so we can get the data next time.
        let allMessages = GiftedChat.append(previousMessages, preMessage);
        saveChatData(allMessages);

        return allMessages;
      });
    }, 3000);
  }, []);

  useEffect(() => {
    getChatData();
  }, []);

  //   const returnPreDefinedMessage = useCallback((messages = []) => {
  //     setMessages(preMessage => GiftedChat.append(preMessage, messages));
  //   }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {noFirstMessage ? (
        <Text style={styles.emptyChatText}>
          Send a first message to your student...
        </Text>
      ) : null}
      <GiftedChat
        alwaysShowSend
        messages={messages}
        renderUsernameOnMessage
        onSend={messages => onSend(messages)}
        textInputStyle={styles.textInput}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyChatText: {
    fontSize: moderateScale(30),
    fontWeight: '400',
    color: 'lightgrey',
    padding: 20,
    position: 'absolute',
    justifyContent: 'center',
    top: '40%',
    fontStyle: 'italic',
  },
  textInput: {
    color: 'black',
  },
});
