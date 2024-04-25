import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../baseUrl';

export default function RajaOngkir() {
    const [ambilDataAlamat, setAmbilDataAlamat] = useState([]);
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [input, setInput] = useState("");
    const [pilihalamat, setPilihAlamat] = useState([]);

    const handleSearch = (text) => {
      setInput(text);
      const filteredResults = ambilDataAlamat.filter(item => item.city_name.toLowerCase().includes(text.toLowerCase()));
      setResults(filteredResults);
    }
  
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
                } else {
                    console.error("Data tidak ditemukan dalam response json seperti di postman !");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    if (ambilDataAlamat.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    // const handleCheckout = (pkg) => {
    //   if (pkg) {
    //     console.log("Checkout dengan alamat:", pkg);
    //     navigation.navigate('InputPesanan', { pilihalamat: pkg });
    //     setPilihAlamat(pkg); //simpan Data Ini
    //     AsyncStorage.setItem('selectedAddress', JSON.stringify(pkg)); //Pilih Aalamat
    //   } else {
    //     console.log("Pilih kurir terlebih dahulu!");
    //   }
    // };

    const handleCheckout = (pkg) => {
      if (pkg) {
        console.log("pilihalamat:", pkg);
        navigation.navigate('InputPesanan', { pilihalamat: pkg });
        setAmbilDataAlamat(pkg);
      } else {
        console.log("Pilih kurir terlebih dahulu!");
      }
    };
  

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Cari Kota"
                    onChangeText={handleSearch}
                    value={input}
                />
                <View style={styles.button}>
          <Image source={require('../../img/Search.png')} style={{width:50, height:50}}/>
                </View>
       
            </View>
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
      <ScrollView>
                {results.map((pkg, index) => (
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
  button:{
    // marginRight:30,
    // width:50,
    // height:50
  },  
  searchBar: {
    backgroundColor : 'white',
    padding:1,
    borderRadius:10,
    borderBlockColor:'black',
  marginBottom:20,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
// marginRight:100,
// marginLeft:100


  },
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
  