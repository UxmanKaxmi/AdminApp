import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GiftedChat, MessageText} from 'react-native-gifted-chat';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [Id, setId] = useState();
  const [noFirstMessage, setNoFirstMessage] = useState(true);
  let chatData = props?.route?.params?.chatData;
  let id = chatData.rollNumber;

  const saveChatData = async value => {
    try {
      //save the last message so we can use it later in the app

      console.log('value', value);
      const jsonValue = JSON.stringify(value);

      let lastMessage = value?.length > 0 ? value[1]?.text : null;
      let lastMessageDate = value?.length > 0 ? value[1]?.createdAt : null;
      let lastUserId = JSON.stringify(id);

      console.log('jsonValue2s', jsonValue);

      AsyncStorage.setItem('@lastMessage' + id, lastMessage);
      AsyncStorage.setItem('@lastMessageDate' + id, lastMessageDate);
      AsyncStorage.setItem('@lastUser', lastUserId);

      AsyncStorage.setItem('@' + id, jsonValue);
    } catch (e) {
      console.log('e', e);
      // saving error
    }
  };

  //get chat data from storage
  const getChatData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@' + id);
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
  useEffect(() => {
    setId(chatData.rollNumber);

    getChatData();
  }, []);

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
            name: chatData.firstName + ' ' + chatData.lastName,
            avatar: chatData.picture,
          },
        };

        //save data in local storage so we can get the data next time.
        let allMessages = GiftedChat.append(previousMessages, preMessage);
        saveChatData(allMessages);

        return allMessages;
      });
    }, 3000);
  }, []);

  //   const returnPreDefinedMessage = useCallback((messages = []) => {
  //     setMessages(preMessage => GiftedChat.append(preMessage, messages));
  //   }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {noFirstMessage ? (
        <Text style={styles.emptyChatText}>
          Send a first message to your {chatData.firstName}...
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
