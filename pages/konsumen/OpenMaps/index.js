import { StyleSheet, Text, View,Pressable,Image,PermissionsAndroid,Linking,Dimensions} from 'react-native'
// import React from 'react'
import { showLocation , getApps, GetAppResult} from 'react-native-map-link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
import Geolocation from '@react-native-community/geolocation';
export default function Maps() {
    const [ambilData, setAmbilData] = useState({});
  const [availableApps, setAvailableApps] = useState([]);
  const [lokasi,setAddress]=useState('');
  const [currentLocation,setCurrentLocation]=useState(null);
  console.log(currentLocation)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       const response = await axios.get(`${baseUrl.url}/lokasi`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setAmbilData(response.data.message);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const Akseslokasi = async () => {
    try {
      const akseslokasi = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (akseslokasi === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // granted();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    Akseslokasi().then(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude ,accuracy,altitude } = position.coords;
          // setCurrentLocation({ latitude, longitude });
          // console.log(latitude, longitude);
          const url=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          fetch(url).then(res=>res.json()).then(data=>{
            // console.log(data)
            setAddress(data)
          })
          setCurrentLocation({latitude,longitude});
          console.log('Latitude : ',latitude)
          console.log('Longtitude : ',longitude)
          // console.log('Accuracy : ',accuracy)
          // console.log('Altitude : ',altitude)

        },
        error => {
          console.error('Error Lokasi:', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  }, []);



  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      (async () => {
        try {
          const result = await getApps({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
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
  }, [currentLocation]);


  return (
    <View style={styles.container}>
      <View style={styles.maps}>
  <Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${currentLocation.latitude},${currentLocation.longitude}`)}>
          <Image source={require('../../img/maps.png')}  style={styles.openmaps}/>
        </Pressable>
        {/* <Text>sdfsdf</Text> */}
    <Text style={styles.texthead}>
          OPEN MAPS DISINI !!!
        </Text>
    </View>
    <Text style={{ marginTop: 10, backgroundColor: '#0B111F', padding: 10 }}>
                {/* Login button content */}
            </Text>
    </View>
         
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  openmaps:{
    width: '100%',
    height: '40%',
  resizeMode:'center',
  justifyContent:'center',
  alignItems:'center',
  // backgroundColor:'white'

  },
  texthead:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight:'bold',
    // animation: 'fade 5s',
    marginTop: -height * 0.2,
    fontSize:20,
    color:'white'

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
    // map:{
    //     width: '100%',
    //     height: '100%',
    // },
});


