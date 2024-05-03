import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, Alert  } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
// import {Clipboard} from 'react-native';
import React, { useState } from 'react';

export default function DetailTopUp() {
  const [linkClick, setClick] = useState('');
  const [copiedText, setCopiedText] = useState('');
  

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

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    console.log(text);
    Alert.alert("Copied: " + text);
  };
  
  return (
    <View style={styles.container}>
<ScrollView>
        {/* <View  style={styles.content}><Text>status_code: 201</Text></View> */}
        <View  style={styles.content}><Text>status_message: Success, Bank Transfer transaction is created</Text></View>
        <View  style={styles.content}><Text>transaction_id: cd12b5a3-2cf8-4c59-99c2-25db20c7eb81</Text></View>
        <View  style={styles.content}><Text>order_id: 6634615f4d64c</Text></View>
        <View  style={styles.content}><Text>merchant_id: G051038053</Text></View>
        <View  style={styles.content}><Text>gross_amount: Rp.200000.00</Text></View>
        {/* <View  style={styles.content}><Text>currency: IDR</Text></View> */}
        <View  style={styles.content}><Text>payment_type: bank_transfer</Text></View>
        <View  style={styles.content}><Text>transaction_time: 2024-05-03 11:00:31</Text></View>
        <View  style={styles.content}><Text>transaction_status: pending</Text></View>
        <View  style={styles.content}><Text>fraud_status: accept</Text></View>
        <View  style={styles.content}><Text>va_numbers: bank: bri, va_number: 380532046187953300</Text></View>
        <View  style={styles.content}><Text>expiry_time: 2024-05-04 11:00:31</Text></View>
        <View  style={styles.content}><Text>nama: sule</Text></View>
        <View  style={styles.content}><Text>userss_id: 1</Text></View>
        {/* <TouchableOpacity> */}
            <View style={styles.buttonkirim}>
            <Text style={styles.text}>
            Langkah - Langkah Pembayaran
                  </Text>
                  <Text style={styles.text}>
                  1. Copy va_number : 
                  </Text>
    
          <Text>Data Yang Di Copy :  {copiedText}</Text>
 
        <TouchableOpacity onPress={fetchCopiedText}>
          <Text>380532046187953300</Text>
        </TouchableOpacity>
   
   

                  <Text style={styles.text}>2. Masuk Link Berikut :</Text>
                  <TouchableOpacity style={styles.text} onPress={handleLinkMidtrans}>
                  <Text>https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bri</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.text}>
                  3. Cari Bank BRI 
                  </Text>
                  <Text style={styles.text}>
                  4. Paid 
                  </Text>
                  <Text style={styles.text}>
                    5. Kembali Ke Aplikasi
                  </Text>

            </View> 
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