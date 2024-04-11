import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function DetailPesanan({ route }) {
  const [pilihPaketData, setPilihPaketData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios({
          url: `http://192.168.100.56:8888/api/riwayatpesanan/${route.params.id}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        });
        setPilihPaketData(response.data);
  
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [route.params.id]);

  if (!pilihPaketData) {
    return (
      <View style={styles.container}>
        <Text>Data Kosong !</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.form1}>
        <Text style={styles.texttop}>Nama Barang | {pilihPaketData.Nama_Barang}</Text>
        <Text style={styles.texttop}>Nama User | {pilihPaketData.nama}</Text>
        <Text style={styles.texttop}>Alamat Tujuan | {pilihPaketData.Alamat_Tujuan}</Text>
        <Text style={styles.texttop}>Nama Paket | {pilihPaketData.Nama_Paket}</Text>
        <Text style={styles.texttop}>Nama Kurir | {pilihPaketData.Nama_Kurir}</Text>
      </View>
      <View style={styles.form2}>
        <Text style={styles.textrow}>Subtotal Pengiriman | {pilihPaketData.Harga_Paket}</Text>
        <Text style={styles.textrow}>Metode Pembayaran</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  texttop:{fontWeight:'bold',color: 'black', fontSize: 15},
  texttop2:{fontWeight:'bold',color: 'black',fontSize: 14 ,marginTop: 20},
  textrow:{fontWeight:'bold',color: 'black',},
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
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop:40,
    flexDirection:'column',
    justifyContent:'flex-start'
    
  },
  form2:{
    width: 500,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'gray',
    flexDirection:'column',
    justifyContent:'flex-start'
  },
})
