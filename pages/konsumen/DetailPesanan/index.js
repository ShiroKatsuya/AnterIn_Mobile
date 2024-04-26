import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import axios from 'axios';
import { baseUrl } from '../../baseUrl';
export default function DetailPesanan({ route }) {
  const [ambilData, setAmbilData] = useState({});
  const [pilihPaketData, setPilihPaketData] = useState(null);
 
  const cetakPDF = async () => {
    
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test.pdf',
      directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // alert(file.filePath);
    console.log(file.filePath);

    if(cetakPDF){
      console.log('Tombol Ditekan')
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/lokasi`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAmbilData(response.data.message);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


async function createPDF() {


}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/riwayatpesanan/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setPilihPaketData(response.data);
        console.log(response.data)
  
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

  const handleTitikPoint = async () => {
    if (!route.params.id) {
      throw new Error("Paket tidak valid.");
    
    }
  if(ambilData.Kota_Anda){
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        paket_sekarang: ambilData.Kota_Anda,
        penerimaan_paket: 'Keluarga!',
      };
  
      const response = await axios.put(`${baseUrl.url}/inputpesanan/${route.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(response.data);
      alert('Data Berhasil Di Update'); 
      return response.data; 

    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      throw error; 
    }
  };
}

  return (


    <View style={styles.container}>

      <View style={styles.form1}>
        <Text style={styles.texttop}>Nama Barang | {pilihPaketData.Nama_Barang}</Text>
        <Text style={styles.texttop}>Nama User | {pilihPaketData.nama}</Text>
        <Text style={styles.texttop}>Kota | {pilihPaketData.city_name}</Text>
        <Text style={styles.texttop}>Province | {pilihPaketData.province}</Text>
        <Text style={styles.texttop}>Kode_POS | {pilihPaketData.postal_code}</Text>
        <Text style={styles.texttop}>Detail Alamat | {pilihPaketData.DetailAlamat}</Text>
        <Text style={styles.texttop}>Nama Paket | {pilihPaketData.Nama_Paket}</Text>
        <Text style={styles.texttop}>Nama Kurir | {pilihPaketData.Nama_Kurir}</Text>
        
      </View>
      <View style={styles.form2}>
        <Text style={styles.textrow}>Subtotal Pengiriman | {pilihPaketData.Harga_Paket}</Text>
        <Text style={styles.textrow}>Subtotal Pengiriman | {pilihPaketData.status}</Text>
        <Text style={styles.textrow}>Metode Pembayaran</Text>

        <TouchableOpacity onPress={cetakPDF}>

        <View style={styles.buttonpdf}>
          <Text style={styles.pdf}>
             CETAK PDF
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.form1}>
          <Text style={styles.texttop}>📦Paketan Telah Diserahkan Kepada Kurir</Text>
          <Text style={styles.texttop}>👨🏻‍✈️Kurir Telah Menerima Paketan | {pilihPaketData.Nama_Kurir}</Text>
          <Text style={styles.texttop}>🔝Paketan Yang Dipilih Sedang Dalam Perjalanan Ke Alamat Tujuan| {pilihPaketData.Alamat_Tujuan}</Text>
          <Text style={styles.texttop}>🔜Paketan Berada Di : {pilihPaketData.paket_sekarang} </Text>
          <Text style={styles.texttop}>🔚Paketan Telah Sampai dan Telah Diserahkan Kepada Pihak Yang Bersangkutan | {pilihPaketData.penerimaan_paket}</Text>
      
          <View style={styles.selesai}>
              <Text style={styles.texttop}>
                Pesanan Selesai !
              </Text>
          </View>    


      </View>




      <Button
        title='TITIK POINT'
        color='#EDA01F'
        onPress={handleTitikPoint}
       
      />



    </View>
  );
}

const styles = StyleSheet.create({
  pdf:{
    color:'black',
    fontWeight:'bold',
    fontSize:11
  },
  buttonpdf:{
    flexDirection:'row',
    alignSelf:'flex-end',
    backgroundColor:'#EDA01F',
    padding:3,
    borderRadius:3
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
