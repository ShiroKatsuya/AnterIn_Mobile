import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import RincianPendapatan from '../RincianPendapatan';

export default function DetailPemansanByUser() {
    const navigation = useNavigation();
    const handlePressRincianPendapatan = () => {
        navigation.navigate('RincianPendapatan');
    };
  return (
    <>
    <View style={styles.container}>

      <View style={styles.form1}>
        <Text style={styles.texttop}>Nama Barang | </Text>
        <Text style={styles.texttop}>Nama User | </Text>
        <Text style={styles.texttop}>Kota | </Text>
        <Text style={styles.texttop}>Province | </Text>
        <Text style={styles.texttop}>Kode_POS | </Text>
        <Text style={styles.texttop}>Detail Alamat | </Text>
        <Text style={styles.texttop}>Nama Paket | </Text>
        <Text style={styles.texttop}>Nama Kurir | </Text>
        <Text style={styles.texttop}>Tinggi | </Text>
        <Text style={styles.texttop}>Lebar | </Text>
        
      </View>
      <View style={styles.form2}>
        <Text style={styles.textrow}>Subtotal Pengiriman | </Text>
        <Text style={styles.textrow}>Subtotal Pengiriman | </Text>
        <Text style={styles.textrow}>Metode Pembayaran</Text>

   

        <View style={styles.buttonpdf}>
        <TouchableOpacity onPress={handlePressRincianPendapatan}>
          <Text style={styles.pdf} >
             RINCIAN PENDAPATAN
          </Text>
          </TouchableOpacity>
      
          <Text style={styles.pdf} >
             CETAK PDF
          </Text>
      
        </View>

      </View>
      <View style={styles.form1}>
          <Text style={styles.texttop}>📦Paketan Telah Diserahkan Kepada Kurir</Text>
          <Text style={styles.texttop}>👨🏻‍✈️Kurir Telah Menerima Paketan | </Text>
          <Text style={styles.texttop}>🔝Paketan Yang Dipilih Sedang Dalam Perjalanan Ke Alamat Tujuan| </Text>
          <Text style={styles.texttop}>🔜Paketan Berada Di :  </Text>
          <Text style={styles.texttop}>🔚Paketan Telah Sampai dan Telah Diserahkan Kepada Pihak Yang Bersangkutan | </Text>
      
          <View style={styles.selesai}>
              <Text style={styles.texttop}>
                Pesanan Selesai !
              </Text>
          </View>    


      </View>




      {/* <Button
        title='TITIK POINT'
        color='#EDA01F'
        // onPress={handleTitikPoint}
       
      />
 */}


    </View>
              <View style={{  backgroundColor: '#0B111F', padding: 20 }} >
   
   </View>
   </>

  )
}

const styles = StyleSheet.create({
    pdf:{
      color:'black',
      fontWeight:'bold',
      fontSize:11,
      padding:10,
      backgroundColor:'#FFFFFF',
      borderRadius:4,
    },
    buttonpdf:{
      flexDirection:'row',
    //   alignSelf:'flex-end',
    //   backgroundColor:'#EDA01F',
    //   padding:3,
    //   borderRadius:3,
      justifyContent:'space-between',
      marginTop:10,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
  
    },
  
    selesai:{
      flexDirection:'row',
      alignSelf:'flex-end',
  
      padding:5,
      backgroundColor:'#EDA01F',
      borderRadius:4
  
    },
  
    texttop:{fontWeight:'bold',color: 'black', fontSize: 15},
    texttop2:{fontWeight:'bold',color: 'black',fontSize: 14 ,marginTop: 20},
    textrow:{fontWeight:'bold',color: 'white',},
    container: {
      flex: 1,
      backgroundColor: '#EDA01F',
      padding: 10,
      alignItems: 'center', 
      flexDirection: 'column',
    },
    form1:{
      width: 500,
      padding: 20,
      paddingBottom: 20,
    //   borderRadius: 10,
      backgroundColor: '#fff',
      marginTop:40,
      flexDirection:'column',
      justifyContent:'flex-start'
      
    },
    form2:{
      width: 500,
      padding: 20,
    //   borderRadius: 10,
      backgroundColor: 'gray',
      flexDirection:'column',
      justifyContent:'flex-start'
    },
  })