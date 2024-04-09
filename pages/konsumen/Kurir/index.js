import { StyleSheet, Text, View, Image, Dimensions,trim } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Kurir() {
  const [dataPribadi, setDataPribadi] = useState({});
  const [ambilData, setAmbilData] = useState([]);

  const token = getTokenFromStorage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.56:8888/api/datauser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setAmbilData(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>

          <View style={styles.container} >
          {Array.isArray(ambilData) && ambilData.filter(pkg => pkg.role_id == 3)
        .map((pkg, index) => (
            <View style={styles.cardInfo} key={index}>
              <View style={styles.cardInfoRow}>
                <Image source={require('../../img/logo.png')} style={styles.logo} />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>Nama : {pkg.nama}</Text>
                  <Text style={styles.userPhone}>Nomor Hp : {pkg.nohp}</Text>
                  <Text style={styles.userPhone}>Role_id : {pkg.role_id}</Text>
                </View>
              </View>
              <View style={styles.bottomRow}>
                <View style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Image key={i} source={i < 4 ? require('../../img/rating-star/select-star.png') : require('../../img/rating-star/unselect-star.png')} style={styles.star} />
                  ))}
                </View>
                <View style={styles.Pilih}>
                  <Text style={styles.text}>Pilih Disini</Text>
                </View>
              </View>
            </View>
               ))}
          </View>
     
    </>
  );
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
