import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl, Button,PermissionsAndroid,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { io } from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';

const Dashboard = () => {
  const navigation = useNavigation();
  const [dataPribadi, setDataPribadi] = useState({});
  const [ambilData, setAmbilData] = useState([]);
  const [ambilDataProfile, setAmbilDataProfile] = useState([]);
  const [currentLocation,setCurrentLocation]=useState(null);
  const [lokasi,setAddress]=useState('');

  console.log(lokasi)

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
          setCurrentLocation({ latitude, longitude });
          // console.log(latitude, longitude);
          const url=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          fetch(url).then(res=>res.json()).then(data=>{
            // console.log(data)
            setAddress(data)
          })
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
    
  const openMaps = () => {
    const {latitude, longitude} = currentLocation 
    if (latitude,longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      Linking.openURL(url)
    }
    else{
      alert('location not available')
    }
  }
  useEffect(() => {
    // getDataUserLocal();
  }, [dataPribadi.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios({
          url: 'http://192.168.100.56:8888/api/data_rating',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAmbilData(response.data["Data Berhasil Didapatkan"]);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios({
          url: 'http://192.168.100.56:8888/api/datauser',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setAmbilDataProfile(response.data["data"]);
      //   console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);


  return (
    <>

    <View style={styles.container}>
    <View style={{flex:1/4}}>
    <ScrollView
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
  </ScrollView>
  </View>



      {/* Card Info */}
          <View style={styles.cardInfo}>
      {ambilDataProfile && lokasi &&
        <View style={styles.cardInfoRow}>
          <Image source={require('../../img/logo.png')} style={styles.logo} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{ambilDataProfile.nama}</Text>
            {/* <Text style={styles.userName}>{ambilDataProfile.alamat}</Text> */}
            <Text style={styles.userPhone}>{ambilDataProfile.nohp}</Text>
            {lokasi.address.village && <Text style={styles.userPhone}>{lokasi.address.village}</Text>}
            {lokasi.address.town && <Text style={styles.userPhone}>{lokasi.address.town}</Text>}
            {lokasi.address.city && <Text style={styles.userPhone}>{lokasi.address.city}</Text>}


  

          </View>

        </View>

      }
                {/* <Button
              title='Tekan Alamat Disini !'
              color='blue'

            /> */}
{/* 
            <TouchableOpacity onPress={granted}>

        <Text style={styles.alamat}>
          TEKAN ALAMAT
     
        </Text>
        
        </TouchableOpacity> */}
        {/* <Text style={styles.text}> Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
            <Text style={styles.text}> Longitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text> */}

        <View>
          <View>
 
        {/* <Text> Get Coords</Text>
        <View style={{
          backgroundColor:'white',
          padding: 10,
          margin : 10,
          alignItems: 'center'
        }}>

        </View>
        
        {currentLocation ? (
          <>
          <TouchableOpacity  onPress={openMaps}>
            <View style={{
            backgroundColor:'red',
            padding: 10,
            alignItems:'center',
            margin: 10,
          }}>
              <Text>Open Maps </Text>
            </View>
          </TouchableOpacity>
          </>
        ):(
          <>
          <TouchableOpacity  onPress={granted}>
          <View style={{
            backgroundColor:'green',
            padding: 10,
            alignItems:'center',
            margin: 10,
          }}>
            <Text>Get Location </Text>
          </View>
        </TouchableOpacity>
          </>
        )} */}
          </View>
    </View>

</View>

      {/* Fitur Unggulan */}
      <Text style={styles.unggulanTitle}>Fitur Unggulan Kami</Text>

      {/* Card Fitur Unggulan */}
      <View style={styles.unggulanCard}>
        <View style={styles.unggulanRow}>
    
          <Image source={require('../../img/ikon-navigasi/checkout.png')} style={styles.unggulanText1} />
          <Image source={require('../../img/ikon-navigasi/order-history.png')} style={styles.unggulanText1}/>
          {/* <Image source={require('../../img/ikon-navigasi/order-detail.png')} style={styles.unggulanText1}/> */}
          <Image source={require('../../img/ikon-navigasi/chat.png')} style={styles.unggulanText1}/>
          <Image source={require('../../img/ikon-navigasi/maps.png')} style={styles.unggulanText1}/>
          {/* <Image source={require('../../img/ikon-navigasi/scan.png')} style={styles.unggulanText1}/> */}
        </View>
        <View style={styles.unggulanRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.unggulanText}>Pesan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
            <Text style={styles.unggulanText}>Riwayat</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('DetailPesanan')}>
            <Text style={styles.unggulanText}>Detail Pesanan</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Chatting')}>
            <Text style={styles.unggulanText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Text style={styles.unggulanText}>Maps</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('KlasifikasiObjek')}>
            <Text style={styles.unggulanText}>Scan</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.unggulanArtikel}>Beberapa Rating atau Komentar</Text>
      <View style={styles.button}>
      <Text style={styles.text}>Semua</Text>
      {/* card rating dan komentar */}
     
      </View>

      <View style={{ }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardrating}>
        {ambilData && Array.isArray(ambilData) && ambilData.map((item, index) => (
      <View key={index} style={styles.cardmessage}>
        <Text style={styles.cardratingteks}>Nama : {item.nama}</Text>
        <Text style={styles.cardratingteks}>Komentar : {item.rating}</Text>
        <Text style={styles.cardratingteks}>Saran : {item.saran}</Text>
      </View>
    ))}




        </View>
      </ScrollView>
    </View>
    
    </View>
    </>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  alamat:{
    backgroundColor:'blue',
    padding:10,
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:10,
    color:'white',
    paddingRight:50,
    paddingLeft:50,
    fontWeight:'bold'
  },
  container: {
    flex: 1, 
    backgroundColor: '#EDA01F',
    padding: 10,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',

  },

  cardratingteks:{
    color:'white',
    marginTop:5,
    textAlign:'auto'
  },
  cardrating:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    
  },
  cardmessage:{
    backgroundColor: 'black',
    width: width * 0.3, 
    height: width * 0.2, 
    borderRadius: 7,
    color: 'white',
    padding: 8,
    marginRight: 10,
  },
  text:{
    // alignContent:'flex-start',
    textAlign:'center',
    fontSize:14,
    color:'white',
    justifyContent:'center',
    paddingTop:5
   
  },

  button:{
    width:100,
    backgroundColor:'blue',
    paddingBottom:10,
    color:'#0D53F4',
    alignItems:'center',
    textAlign:'center',
    marginTop:10,
    borderRadius:30,
    borderColor:'black', // Added border color
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 // Added border width
  },
  
  cardInfo: {
    backgroundColor: '#0B111F',
    borderRadius: 30,
    padding: 20,
    // marginTop: 20,
    marginTop:-30,

  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logo1: {
    width: 50,
    height: 100,
    marginRight: 10,
  },
  userDetails: {
    marginBottom:10
  },
  userName: {
    fontWeight: 'bold',
    color: 'white',
  },
  userPhone: {
    fontWeight: 'bold',
    color: 'white',
  },
  unggulanTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  unggulanCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 1,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  unggulanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    marginRight:90,
    marginLeft:90
  },
  unggulanText: {
    // backgroundColor: 'black',
    width: width * 0.1, 
    height: width * 0.1, 
    borderRadius: 7,
    color: 'black',
    // padding: 5,
    marginRight: 10,
    textAlign:'center',
    // justifyContent:'center',
    // alignItems:'center'
    marginTop:5,
  },

  unggulanArtikel:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginTop: 20,
  },

  unggulanText1: {
    backgroundColor: 'black',
    width: width * 0.1, 
    height: width * 0.1, 
    borderRadius: 7,
    color: 'white',
    // padding: 5,
    marginRight: 10,
    marginTop:40,
    padding: 20
 
  },
  star:{
    width: 50,
    height: 50,
    borderRadius: 1,
    marginLeft: -5,
    marginTop: -10,
  },
});

export default Dashboard;
