import { Image, StyleSheet, Text, View, Dimensions,FlatList,TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
const windowWidth = Dimensions.get('window').width;

export default function Transaksi() {
  const navigation = useNavigation();
  const [dataPribadi, setDataPribadi] = useState({});
  const [ambilData, data] = useState([]); 
  const [pilih, setpilih] = useState(null);

  // const getDataUserLocal = () => {
  //   getData('dataUser').then(res => {
  //     setDataPribadi(res);
  //   });
  // };

  const handlePilih = (item) => {
    setpilih(item);
  };

  const handleCheckout = () => {
    if (pilih) {
      console.log("Checkout dengan paket:", pilih);
      navigation.navigate('InputPesanan',{pilih});
    } else {
      console.log("Pilih paket terlebih dahulu!");

    }
  };


  useEffect(() => {
    // getDataUserLocal();
  }, [dataPribadi.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios({
          url: 'http://192.168.100.56:8888/api/input_pilihan_paket',
          headers: {
            Authorization: `Bearer ${token}` 
          },
        });
        data(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);

  return (
    <View style={styles.container}>
      <Text style={styles.pilihpaket}>Pilih Paket yang Anda Mau:</Text>
      <View style={styles.cardPaket}>
      <FlatList
        data={ambilData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePilih(item)} style={styles.cardPaketChild}>
            <Image
              source={require('../../img/ikon-riwayatpesanan/limited.png')}
              style={styles.img}
            />
            <Text style={styles.textpaket}>{item.Nama_Paket}</Text>
            <Text style={styles.textpaket}>Rp{item.Harga_Paket}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2} 
      />

</View>
      <View style={styles.checkout}>
          <Text style={styles.textpaket4}>Jumlah</Text>
         {pilih && (
          <Text style={styles.textpaket4}>
             {pilih.Nama_Paket}
          </Text>
         )}
                {pilih && (
          <Text style={styles.textpaket4}>
             Rp.{pilih.Harga_Paket}
          </Text>
         )}
  <TouchableOpacity onPress={handleCheckout} >
        <View style={styles.button}>
          <Text style={styles.buttoncheckout}>Checkout</Text>
        </View>
    </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttoncheckout: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  img: {
    height: 50,
    width: windowWidth * 0.3, 
    alignSelf: 'center',
    marginTop: -20,
  },
  pilihpaket: {
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 19,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#EDA01F',
    padding: 10,
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  checkout: {
    marginTop: 30,
    backgroundColor: '#0B111F',
    padding: 10,
    flex: 1,
    flexDirection:'column'
  },
  paket: {
    backgroundColor: '#0B111F',
    padding: 30,
    marginTop: 100, // Adjust this according to your design
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom:490
    flex:1
  },
  textpaket1: {
    color: 'white',
    padding: 10,
  },
  textpaket4: {
    color: 'white',
    fontSize: 20,

  },
  textpaket2: {
    color: 'white',
    backgroundColor: '#EDA01F',
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  textpaket: {
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eda01f',
  },
  cardPaket: {
    backgroundColor: '#0b111f',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    marginLeft: 10,
    marginRight: 10,
    // justifyContent:'space-between',
    // justifyContent:'space-between',
    // flexDirection:'row'
    // justifyContent:'center'
    // flexDirection:'row',
    // alignSelf:'center',
    // justifyContent:''
    

  },
  cardPaket1: {
    backgroundColor: '#0b111f',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  cardPaketChild: {
    backgroundColor: '#000000',
    // flexDirection:'column',
    // justifyContent:'center',
    marginLeft: 10,
    marginTop: 15,
    padding: 40,
    width: windowWidth * 0.4,
alignSelf:'center'
  },
});
