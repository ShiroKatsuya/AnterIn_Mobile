import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image, ScrollView } from 'react-native'
// import React from 'react'
import { Time } from 'react-native-gifted-chat'
import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';
export default function DetailChatting({ route }) {

  const [detailchat,setdetailchat] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/riwayatpesan/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setdetailchat(response.data["data"]);
        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [route.params.id]);
  

  return (
    <View style={styles.container}>
      
    <View style={styles.box}>
      <ScrollView>
      {detailchat && detailchat.map((item) => (
        item.id % 2 === 1 ? (
          <View style={styles.left} key={item.id}>
            <Text>Nama : {item.nama_pengirim}</Text>
            {/* <Text>Nama Penerima: {item.nama_penerima}</Text> */}
            <Text>Pesan : </Text>
            <Text>{item.kirim_pesan}</Text>
          </View>
        ) : (
          <View style={styles.right} key={item.id}>
            <Text>Nama : {item.nama_pengirim}</Text>
            {/* <Text>Nama Penerima: {item.nama_penerima}</Text> */}
            <Text>Pesan : </Text>
            <Text>{item.kirim_pesan}</Text>
          </View>
        )
      ))}
      </ScrollView>
      </View>

      <View style={styles.chatbar}>
                <TextInput
              style={[styles.text2, styles.input, styles.form2, { color: 'black' }]}
              placeholder="Ketik Pesan"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              // onChangeText={onChangeText}
              // value={text}
            />
            {/* onPress={() => onSend([{ text }])}  */}
       <TouchableOpacity style={styles.buttonsend}>
        <Image source={require('../../../img/Send-Message.png')} style={styles.sendbuttonicon} />
      </TouchableOpacity>
          </View>


    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1
  },

  right:{
    flexDirection:'column',
    alignSelf:'flex-end'
  },

  left:{
    flexDirection:'column',

  },

  box:{
    flex:1,
    padding:10,
    marginHorizontal:10,
    marginVertical:10
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

})