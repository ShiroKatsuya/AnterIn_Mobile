import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, Alert  } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
// import {Clipboard} from 'react-native';
import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import axios from 'axios';
import { baseUrl } from '../../../baseUrl';

export default function DetailTopUp({ route }) {
  const [linkClick, setClick] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [detailtopup, setdetailtopup] = useState(null);

// console.log(detailtopup)

  // console.log(detailtopup.nama)

  const handleLinkMidtrans = () => {
    console.log('Button was clicked');
    const url = 'https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bri';
    setClick(url);
    Linking.openURL(url);

  }

console.log(copiedText)

  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
  };

  const fetchCopiedText = () => {
    setCopiedText(detailtopup[0].va_number);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/riwayatpembayaran/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setdetailtopup(response.data["data"]);
        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [route.params.id]);
  

  
  return (
    <View style={styles.container}>
<ScrollView>
   

{detailtopup &&
        <>
        <View  style={styles.content}><Text>transaction_id: {detailtopup[0].transaction_id}</Text></View>
        <View  style={styles.content}><Text>order_id: {detailtopup[0].order_id}</Text></View>
        <View  style={styles.content}><Text>merchant_id: {detailtopup[0].merchant_id}</Text></View>
        <View  style={styles.content}><Text>gross_amount: Rp.{detailtopup[0].gross_amount}.00</Text></View>

        <View  style={styles.content}><Text>payment_type: {detailtopup[0].payment_type}</Text></View>
        <View  style={styles.content}><Text>transaction_time: {detailtopup[0].transaction_time}</Text></View>
        <View  style={styles.content}><Text>transaction_status: {detailtopup[0].transaction_status}</Text></View>
        <View  style={styles.content}><Text>fraud_status: accept</Text></View>
        <View  style={styles.content}><Text>Bank: {detailtopup[0].bank.toUpperCase()}</Text></View>
        <View  style={styles.content}><Text>va_number: {detailtopup[0].va_number}</Text></View>
        <View  style={styles.content}><Text>expiry_time: {detailtopup[0].expiry_time}</Text></View>
        <View  style={styles.content}><Text>nama: {detailtopup[0].nama}</Text></View>
        {/* <View  style={styles.content}><Text>userss_id: {detailtopup[0].userss_id}</Text></View> */}
        </>
      }

        {/* <TouchableOpacity> */}
        {detailtopup &&
            <View style={styles.buttonkirim}>
            <Text style={styles.text}>
            Langkah - Langkah Pembayaran
                  </Text>
                  <Text style={styles.text}>
                  1. Copy va_number : 
                  </Text>
    
          <Text>Data Yang Di Copy :  {copiedText}</Text>
 
        <TouchableOpacity onPress={fetchCopiedText}>
          <Text>{detailtopup[0].va_number}</Text>
        </TouchableOpacity>
   
   

                  <Text style={styles.text}>2. Masuk Link Berikut :</Text>
                  <TouchableOpacity style={styles.text} onPress={handleLinkMidtrans}>
                  <Text>https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bri</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.text}>
                  3. Cari Bank {detailtopup[0].bank.toUpperCase()}
                  </Text>
                  <Text style={styles.text}>
                  4. Paid 
                  </Text>
                  <Text style={styles.text}>
                    5. Kembali Ke Aplikasi
                  </Text>

            </View> 
              }
        {/* </TouchableOpacity> */}
        </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  text:{
    // color:'black',
    // fontWeight:'bold',
    fontSize:15

  },
  // text
  buttonkirim:{
    padding:10,
    elevation:1,
    borderRadius:1,
    paddingVertical:5,
    marginHorizontal:5,
    marginVertical:5,
    marginTop:5,
    // alignSelf:'center',
    // justifyContent:'center',
    // alignContent:'center'
    // flex:1
    // alignItems:'center',

  },  
container:{
  flex:1,
  // justifyContent:'center',
  // alignContent:'center',
  // alignSelf:'cener'
},
content:{
  padding:10,
  elevation:1,
  borderRadius:1,
  paddingVertical:5,
  marginHorizontal:5,
  marginVertical:5,
  marginTop:5,
}

})