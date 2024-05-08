import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl, Button,PermissionsAndroid,Linking,onRefresh,refreshing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { io } from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';


export default function HomeKurir() {
    const navigation = useNavigation()
    const [ambilData, setAmbilData] = useState(null);
    const [dataPribadi, setDataPribadi] = useState({});
    const [ambilDataProfile, setAmbilDataProfile] = useState(null);
    const [lokasi,setAddress]=useState('');
    const [currentLocation,setCurrentLocation]=useState(null);

    // console.log(lokasi)


    
  const [refreshing, setRefreshing] = React.useState(false);

  // console.log(ambilData)
  
  const handleRating = (rating) => {
    return rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '';
  }

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
          // console.log('Latitude : ',latitude)
          // console.log('Longtitude : ',longitude)
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
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/datauser`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setAmbilDataProfile(response.data["data"]);
        console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        // console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);


  useEffect(()=>{

  }),[dataPribadi.token]
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/data_rating`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAmbilData(response.data["Data Berhasil Didapatkan"]);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    // fetchData()
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
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
            {lokasi.address.village && <Text style={styles.userPhone}>{lokasi.address.village}</Text>}
            {lokasi.address.town && <Text style={styles.userPhone}>{lokasi.address.town}</Text>}
            {lokasi.address.city && <Text style={styles.userPhone}>{lokasi.address.city}</Text>}
          </View>

        </View>
        }

      

        <View>
          <View>
 

          </View>
    </View>

</View>

      {/* Fitur Unggulan */}
      <Text style={styles.unggulanTitle}>Fitur Unggulan Kami</Text>

      {/* Card Fitur Unggulan */}
      <View style={styles.unggulanCard}>
        <View style={styles.unggulanRow}>
    
          <Image source={require('../../img/ikon-navigasi/order-detail.png')} style={styles.unggulanText1} />
          <Image source={require('../../img/ikon-navigasi/order-history.png')} style={styles.unggulanText1}/>
          {/* <Image source={require('../../img/ikon-navigasi/order-detail.png')} style={styles.unggulanText1}/> */}
          <Image source={require('../../img/ikon-navigasi/chat.png')} style={styles.unggulanText1}/>
          <Image source={require('../../img/ikon-navigasi/maps.png')} style={styles.unggulanText1}/>
          {/* <Image source={require('../../img/ikon-navigasi/scan.png')} style={styles.unggulanText1}/> */}
        </View>
        <View style={styles.unggulanRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Gaji')}>
            <Text style={styles.unggulanText}>Gaji</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RiwayatPemesanan')}>
            <Text style={styles.unggulanText}>Riwayat</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('DetailPesanan')}>
            <Text style={styles.unggulanText}>Detail Pesanan</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('ChattingKonsumen')}>
            <Text style={styles.unggulanText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MapsKurir')}>
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
        <Text style={styles.cardratingteks}>Nama : {item.nama} </Text>
        <Text style={styles.cardratingteks}>Komentar : { handleRating(item.rating)} </Text>
        <Text style={styles.cardratingteks}>Saran : {item.komentar} </Text>
      </View>
         ))}
 


        </View>
      </ScrollView>
    </View>
  
    </View>
    </>
  )
}

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
    padding: 10,
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
    marginTop:-20
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
});

// export default Dashboard;
