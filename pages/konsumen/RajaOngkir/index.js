import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../baseUrl';

export default function RajaOngkir() {
    const [ambilDataAlamat, setAmbilDataAlamat] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${baseUrl.url}/city`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
          
                const dataCity = response.data.data_city;
                if (dataCity.rajaongkir) {
                    setAmbilDataAlamat(dataCity.rajaongkir.results);
                    // console.log(dataCity.rajaongkir.results);
                } else {
                    console.error("Data tidak ditemukan dalam response json seperti di postman !");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    const handleCheckout = (pkg) => {
      if (pkg) {
        console.log("Checkout dengan alamat:", pkg);
        navigation.navigate('InputPesanan', { pilihalamat: pkg });
      } else {
        console.log("Pilih kurir terlebih dahulu!");
      }
    };
  return (
    <View style= {styles.container}>
        <ScrollView>
          {Array.isArray(ambilDataAlamat) && ambilDataAlamat
        .map((pkg, index) =>(
        <View style={styles.cardInfo} key={index}>
          <View style={styles.cardInfoRow}>
            <Image source={require('../../img/logo.png')} style={styles.logo} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Nama Kota : {pkg.city_name}</Text>
              <Text style={styles.userPhone}>Nama Provinsi : {pkg.province}</Text>
              <Text style={styles.userPhone}>Kode Pos : {pkg.postal_code}</Text>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.rating}>
              {/* {[...Array(5)].map((_, i) => (
                // <Image key={i} source={i < 4 ? require('../../img/rating-star/select-star.png') : require('../../img/rating-star/unselect-star.png')} style={styles.star} />
              ))} */}
            </View>
            <TouchableOpacity onPress={() => handleCheckout(pkg)}>
              <View style={styles.Pilih}>
                <Text style={styles.text}>Pilih Disini</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
          </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#eda01f',
      // marginVertical: 0,
  
    },
    cardInfo: {
      backgroundColor: '#0B111F',
      borderRadius: 10,
      padding: 20,
      marginTop: 0,
      // flexDirection: 'column',
      marginBottom: 20, 
      
    },
    cardInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
  
  
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontWeight: 'bold',
      color: 'white',
    },
    userPhone: {
      fontWeight: 'bold',
      color: 'white',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      width: 30,
      height: 20,
      marginRight: 5,
    },
    Pilih: {
      backgroundColor: '#EDA01F',
      padding: 8,
      borderRadius: 8,
    },
    text: {
      color: 'white',
      fontWeight: '900',
    },
  });
  