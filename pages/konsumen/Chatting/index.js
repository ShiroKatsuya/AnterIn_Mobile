import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import socket from '../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const { width } = Dimensions.get('window');

export default function Chatting() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [ambilDataProfile, setAmbilDataProfile] = useState([]);

  const [dataPribadi,setDataPribadi]=useState({});

  const [AmbilPesan,AmbilPesanMasuk]= useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios(`${baseUrl.url}/datauser`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        });
        setAmbilDataProfile(response.data["data"]);
      //   console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          ...message,
          createdAt: new Date(message.createdAt),
        })
      );
    };

    socket.on('message', messageListener);


    return () => {
      socket.off('message', messageListener);
    };
  }, []);


  const onSend = useCallback(async (newMessages = []) => {
    if (ambilDataProfile.nama && newMessages.length > 0) {
      const messageText = newMessages[0].text.trim();
      if (messageText.length > 0) {
        const newMessage = {
          text: messageText,
          createdAt: new Date(),
          Nama: ambilDataProfile.nama
        };
  
        setText('');
        socket.emit('message', newMessage);
  

        await new Promise(resolve => {
          socket.once('messageSent', () => {

            resolve();
          });
        });


        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessage)
        );
      }

    }
  }, [ambilDataProfile]);

  const onChangeText = (inputText) => {
    setText(inputText);
    // resolve();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.main}>
        { ambilDataProfile && (
          <View style={styles.cardInfo}>
            <View style={styles.cardInfoRow}>
              <Image source={require('../../img/logo.png')} style={styles.logo} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{ambilDataProfile.nama}</Text>
                <Text style={styles.text}>{ambilDataProfile.alamat}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#EDA01F' }}>{ambilDataProfile.nohp}</Text>
              </View>
            </View>
          </View>
              ) }
 
          <ScrollView>
          <View style={styles.resultcontainer}>
          {messages.map((message, index) => (
              <View key={index} style = {styles.result1}>
                <Text style = {styles.text}>{message.Nama}</Text>
                <Text style = {styles.text}>{message.text}</Text>
              </View>
                 ))}
            </View>
            </ScrollView>
{/*   
 
            <GiftedChat
      messages={messages}
      onSend={(newMessages) =>
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages),
        )
      }
      user={{ _id: 1 }}
    /> */}
    
          <View style={styles.chatbar}>
                <TextInput
              style={[styles.text2, styles.input, styles.form2, { color: 'black' }]}
              placeholder="Ketik Pesan"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={onChangeText}
              value={text}
            />
       <TouchableOpacity onPress={() => onSend([{ text }])} style={styles.buttonsend}>
        <Image source={require('../../img/Send-Message.png')} style={styles.sendbuttonicon} />
      </TouchableOpacity>
   
          </View>
     
        </View>
      </View>

    </View>

  );
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
text:{color: 'white'},
  resultcontainer: {
    flexDirection: 'column',
    marginTop: 40,
  },
  text2:{
    color:'black',
    fontWeight:'bold'

  },
  result1: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    marginRight: width * 0.30, 
  },
  result2: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginLeft: width * 0.30, 
    marginRight: 20,
    marginTop: 20,
  },
  result3: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginLeft: 20,
    marginRight: width * 0.30, 
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardInfo: {
    backgroundColor: '#0B111F',
    padding: 15,
  },
  cardInfoRow: {
    marginRight: 40,
    marginLeft: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
  },
  header: {
    marginTop: 15,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    height: '90%',
    borderRadius: 20,
  },
  main: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    // height: 800,
    height: '90%',
    // width: windowWidth * 0.5,

  },
  chatbar: {
    marginRight: 20,
    marginLeft: 20,
    // marginTop:300,
    flexDirection: "row",
  },
  input: {
    height: 40,
      width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    

  },
  form2: {
    backgroundColor:'#d9d9d9',
    color:'white'
  },
  buttonsend:{
    backgroundColor:'pink',
    width:40,
    height:40,
    justifyContent: 'space-between',
    marginLeft:10,
    borderRadius:100,
    alignItems: 'center',
  },
  sendbuttonicon:{
    width:40,
    height: 40,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  }
});