import { StyleSheet, Text, View,Pressable,Image} from 'react-native'
// import React from 'react'
import { showLocation , getApps, GetAppResult} from 'react-native-map-link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
export default function Maps() {
    const [ambilData, setAmbilData] = useState({});
  const [availableApps, setAvailableApps] = useState([]);

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



  useEffect(() => {
    if (ambilData.latitude && ambilData.longitude) {
      (async () => {
        try {
          const result = await getApps({
            latitude: ambilData.latitude,
            longitude: ambilData.longitude,
            title: 'Politeknik Negeri Indramayu',
            googleForceLatLon: true,
            alwaysIncludeGoogle: true,
            appsWhiteList: ['google-maps'],
          });
          setAvailableApps(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [ambilData]);


  return (
    <View style={styles.container}>
      <View style={styles.maps}>

    <React.Fragment>
      {availableApps.map(({icon, name, id, open}) => (
        <Pressable key={id} onPress={open}>
          <Image source={icon} />
          {/* <Text>{name}</Text> */}
        </Pressable>
      ))}
    </React.Fragment>
    <Text style={styles.texthead}>
          OPEN MAPS DISINI !!!
        </Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  texthead:{
    marginTop:20,
    alignSelf:'center',
    fontWeight:'bold',
    // animation: 'fade 5s',
  },
    maps:{
      justifyContent:'center',
      alignSelf:'center',
      flex:1,
    },
    container: {
        flex: 1,
        backgroundColor:'#EDA01F'
    },
    map:{
        width: '100%',
        height: '100%',
    },
});


