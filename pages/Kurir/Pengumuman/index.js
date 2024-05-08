import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image,error,ScrollView,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
import ReadMore from '@fawazahmed/react-native-read-more';

export default function Pengumuman() {

  const [ambilDataPengumuman, setAmbilDataPengumuman] = useState({});
  // const [dataPribadi,setDataPribadi]=useState({});

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/infopengumuman`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setAmbilDataPengumuman(response.data["data"]);
      //   console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        // console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    // fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList 
          data={ambilDataPengumuman}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({item}) => (
              <View style={styles.boxmessage}>
                <View style={styles.information}>
                  <View style={styles.foto}>
                    <Image
                      source={require('../../img/Pemberithuan.png')}
                      resizeMode="cover"
                      style={styles.img}
                    />
                    <View>
                      <Text style={styles.info}>
                        Pemberitahuan
                      </Text>
                      <Text style={styles.info}>
                        {item.nama}
                      </Text>
                      <Text style={styles.info}>
                        {item.created_at.slice(0,10)}
                      </Text>
                      <View style={{width:'90%'}}>
                        <ReadMore numberOfLines={2} style={styles.info}>
                          {item.deskripsi}
                        </ReadMore >
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.info2}>
                      Selengkapnya
                    </Text>
                  </View>
                </View>
              </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
    </View>

  );

}

const styles = StyleSheet.create({
  foto:{
      // backgroundColor:'white'
      flexDirection:'row',
      // width:70,
      // height:70
      alignItems: 'center',
    },
    img:{
      // width:'1%'
      width:50,
      height:50,
      marginRight:4
    },
    information: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // flex: 1,
      alignContent:'center',

    },
    info: {
      color: 'white',
      fontWeight:'bold',
      fontSize:15
      
    },
    info2: {
      color: 'white',
      fontWeight:'bold',
      fontSize:15,
      marginLeft:-100
      
    },
    // leftInfo: {
    //   alignSelf: 'flex-start',
    // },
    // rightInfo: {
    //   alignSelf: 'flex-end',
    // },
    boxmessage: {
      backgroundColor: '#0B111F',
      padding: 10,
      marginTop: 10,
      borderRadius: 1,
      alignSelf: 'center',
      width: '90%', // Ensure the container is wide enough
      borderRadius:4,
      marginHorizontal: 1,
      // marginVertical: 10,
      marginBottom:50,

    },
    container: {
      flex: 1,
      backgroundColor: '#EDA01F',
      // justifyContent: 'center', // Center the content vertically
      // alignItems: 'center', // Center the content horizontally
    },
  })
