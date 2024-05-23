import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
import moment from 'moment';
import { useState,useEffect } from 'react'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// let waktu = moment().locale('id').format('MMMM Do YYYY, h:mm:ss a');



export default function Gaji() {
  // const [waktu, setWaktu] = useState('');
  const [ambilDataGaji,setAmbilDataGaji]=useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/datauser`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setAmbilDataGaji(response.data["data"]);
        console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        // console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setWaktu(moment().locale('id').format('MMMM Do YYYY, h:mm:ss a'));
//   }, 1000);
//   return () => clearInterval(interval);
// }, []);
  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <View style={styles.form1}>
          <View style={styles.imagconatiner}>
          <Text style={styles.textwaktu}>
              {/* {waktu} */}
            </Text>
          </View>

          <View>
    
          </View>
     
          <View style={styles.textContainer}>
            <Text style={styles.Text}>TOTAL PENDAPATAN</Text>
            <Text style={styles.Text}>__________________________</Text>
            <Text style={styles.Text1}>Rp.{ambilDataGaji.gaji}</Text>
          </View>
        </View>

        <View style={styles.submit}>

          <View style={styles.submitbutton}>
            <TouchableOpacity>
            <Text style={styles.text3}>
              TARIK SEKARANG !
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form2}>
          <Text style={styles.Text}>
            LOG PENARIKAN
          </Text>
          <Text style={styles.Text}>__________________________</Text>
          <ScrollView>
            <View style={styles.log}>
              <View style={styles.riwayat}>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
                <Text style={styles.textlog}>
                  5-1-2024 : Rp.2000
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <Text style={{  marginTop:height * 0.05,backgroundColor: '#0B111F', padding: 20 }} >
       </Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  textwaktu:{
    // color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  img3: {
    width: width * 0.25,
    height: height * 0.1
  },
  containerdropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -height * 0.2
  },
  textlog: {
    color: 'red',
    fontSize: 18
  },
  riwayat: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: width * 0.15,
    paddingRight: width * 0.15
  },
  log: {
    backgroundColor: '#0B111F',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 1
  },
  text3: {
    color: 'white',
    fontWeight: 'bold'
  },
  submit: {
    marginTop: -height * 0.12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submitbutton: {
    marginTop: height * 0.010,
    // marginLeft: width * 0.4,
    padding: 5,
    backgroundColor: '#EDA01F',
    // height: 30,
    borderRadius: 4,
    // justifyContent:'center',
    // alignItems:'center',
    alignSelf:'center',
    marginBottom:height * 0.1,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  Text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'verdana',
    fontWeight: 'bold',
    fontSize: 20
  },
  Text1: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'verdana',
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 25
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -height * 0.03
  },
  imagconatiner: {
    marginTop: -height * 0.1,
    marginBottom:height * 0.06
  },
  img: {
    width: width * 0.95,
    height: height * 0.12,
    alignSelf: 'center',
  },
  img2: {
    width: width * 0.25,
    height: height * 0.1,
    alignSelf: 'flex-start'
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
  },
  box: {
    backgroundColor: '#0B111F',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: height * 0.,
    borderRadius: 20,
    marginLeft: width * 0.01,
    marginRight: width * 0.01,
    justifyContent: 'center',
    paddingBottom:20,
    marginTop:'10%'
  },
  form1: {
    backgroundColor: '#FFFF',
    padding: 10,
    width: width * 0.90,
    height: height * 0.35,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  form2: {
    backgroundColor: '#FFFF',
    padding: 10,
    width: width * 0.90,
    height: height * 0.35,
    // marginTop: 20,
    // marginBottom: 5,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
})
