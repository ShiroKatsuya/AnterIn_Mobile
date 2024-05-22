import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button, Alert, ScrollView, PermissionsAndroid ,Image,Linking,Dimensions,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Geolocation from '@react-native-community/geolocation';
import { showLocation , getApps, GetAppResult} from 'react-native-map-link';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export default function DetailPesanan({ route }) {
  const [ambilData, setAmbilData] = useState({});
  const [pilihPaketData, setPilihPaketData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  const [lokasi, setAddress] = useState({});
  const [availableApps, setAvailableApps] = useState([]);
  const [userlocation, setUserLocation] = useState([]);
  // const [availableApps, setAvailableApps] = useState([]);

  // console.log(lokasi)

  const htmlContent = `
  <h1>Detail Pesanan Dari Pembelian :  ${pilihPaketData?.Nama_Paket}</h1>
  <p><strong>Nama Barang:</strong> ${pilihPaketData?.Nama_Barang}</p>
  <p><strong>Nama Kurir:</strong> ${pilihPaketData?.Nama_Kurir}</p>
  <p><strong>Detail Alamat Tujuan:</strong> ${pilihPaketData?.DetailAlamat}</p>
  <p><strong>Kota:</strong> ${pilihPaketData?.city_name}</p>
  <p><strong>Provinsi:</strong> ${pilihPaketData?.province}</p>
  <p><strong>Kode Pos:</strong> ${pilihPaketData?.postal_code}</p>
  <p><strong>Harga Paket:</strong> ${pilihPaketData?.Harga_Paket}</p>
  <p><strong>Status:</strong> ${pilihPaketData?.status}</p>
  <p><strong>Tinggi</strong> ${pilihPaketData?.Tinggi_cm}</p>
  <p><strong>Lebar</strong> ${pilihPaketData?.Lebar_cm}</p>
`;
 
const cetakPDF = async () => {
  const timestamp = Date.now();
  const options = {
    html: htmlContent,
    fileName: `Pesanan_${timestamp}`,
    directory: 'Documents',
    
  };
  try {
    const file = await RNHTMLtoPDF.convert(options);
    console.log('PDF:', file.filePath);
    alert('pesanan telah di cetak melalui pdf : ' + file.filePath);
  } catch (error) {
    console.log('Failed to create PDF');
  }
}
const Whatsapp = () => {
  const { Nama_Kurir,DetailAlamat,Nama_Paket,Nama_Barang,Tinggi_cm,Lebar_cm,status } = pilihPaketData;
  if (Nama_Kurir && DetailAlamat && Nama_Paket && Nama_Barang && Tinggi_cm && Lebar_cm && status) {
    const diencodepesannya = encodeURIComponent(`Hai ${Nama_Kurir} Saya ingin menayakan paketan saya dengan Detail Alamat ${DetailAlamat} dengan nama : ${Nama_Paket} dengan nama barang : ${Nama_Barang} dengan tinggi : ${Tinggi_cm} cm dan lebar : ${Lebar_cm} cm dengan status : ${status}` );
    const url = `https://wa.me/${pilihPaketData.kurir.nohp}?text=${diencodepesannya}`;
    Linking.openURL(url).catch(err => {
      console.error('Error UpenORLL:', err);
    });
    console.log(url);
  } else {
    console.log('Error: Check Nama_Kurir, DetailAlamat, Nama_Paket, Nama_Barang, Tinggi_cm, Lebar_cm, status');
  }
};


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

useEffect(() => {
  if (pilihPaketData) {
    const [latitude, longitude] = pilihPaketData.titikjemput.split(" ");
    (async () => {
      try {
        const data = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        };
        setUserLocation(data);
      } catch (error) {
        console.error("Error setting user location:", error);
      }
    })();
  }
}, [pilihPaketData]);


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
  //       // console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);


async function createPDF() {


}

useEffect(() => {
  if (pilihPaketData) {
    const [latitude, longitude] = pilihPaketData.titikjemput.split(" ");
    (async () => {
      try {
        const result = await getApps({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          title: 'Politeknik Negeri Indramayu',
          googleForceLatLon: true,
          alwaysIncludeGoogle: true,
          appsWhiteList: ['google-maps'],
        });
        setAvailableApps(result);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    })();
  }
}, [pilihPaketData]);
  
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
        <Text>Loading !</Text>
      </View>
    );
  }


  const handleTitikPoint = async () => {
    if (!route.params.id) {
      throw new Error("Paket tidak valid.");
    
    }
  if(lokasi.address.town || lokasi.address.village){
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        paket_sekarang: lokasi.address.town || lokasi.address.village,
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
        <Text style={styles.texttop}>Tinggi | {pilihPaketData.Tinggi_cm} cm</Text>
        <Text style={styles.texttop}>Lebar | {pilihPaketData.Lebar_cm} cm</Text>
        <Text style={styles.texttop}>Perkiraan Sampai | {pilihPaketData.PerkiraanSampai.slice(0,10)}</Text>
        <Text style={styles.texttop}>Titik Jemput Paket Konsumen  : </Text>
        <TouchableOpacity>
        <Text style={styles.texttop}>{pilihPaketData.titikjemput}</Text>
        </TouchableOpacity>
        <View style={styles.maps}>
<Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${userlocation.latitude},${userlocation.longitude}`)}>
          <Image source={require('../../img/maps.png')}  style={styles.openmaps}/>
        </Pressable>
        <Text style={styles.texthead}>
          OPEN MAPS DISINI !!!
        </Text>
        {/* <TouchableOpacity style={styles.button} onPress={handleTitikPoint}>
      <Text style={styles.texttop3}>
        TITIK POINT
      </Text>
    </TouchableOpacity> */}
</View>
   
              
        
      </View>
      <View style={styles.form2}>
        <Text style={styles.textrow}>Subtotal Pengiriman | {pilihPaketData.Harga_Paket}</Text>
        <Text style={styles.textrow}>Subtotal Pengiriman | {pilihPaketData.status}</Text>
        <Text style={styles.textrow}>Metode Pembayaran</Text>

<View style={styles.buttonpdf}>

        <TouchableOpacity onPress={Whatsapp}>

        <View style={styles.buttonpdf}>
          <View>
         <Image source={require('../../img/pngwing.com.png')} 
         style={styles.img}
         />
         </View>

        </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={cetakPDF}>

        <View style={styles.buttonpdf}>
          <Text style={styles.pdf}>
             CETAK PDF
          </Text>
        </View>
        </TouchableOpacity>
        </View>
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



{/* 
      <Button
        title='TITIK POINT'
        color='#EDA01F'
        onPress={handleTitikPoint}
       
      /> */}

<Text style={{  backgroundColor: '#0B111F', padding: '100%',flex:1, }}>
                {/* Login button content */}
            </Text>

    
    </View>
  );
}

const windowDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  img:{
    // width:windowDimensions.width * 0.1,
    // height:windowDimensions.height * 0.1
    width:60,
    height:60
  },
  // texthead:{
  //   justifyContent:'center',
  //   alignItems:'center',
  //   alignSelf:'center',
  //   fontWeight:'bold',
  //   // animation: 'fade 5s',
  //   marginTop:-400,
  //   fontSize:20,
  //   color:'black'

  // },
  openmaps:{
    width: '100%',
    height: '40%',
  resizeMode:'center',
  justifyContent:'center',
  alignItems:'center',
  // backgroundColor:'black',
  // marginTop:-100

  },
  button:{
    backgroundColor:'black',
    padding:10,
    borderRadius:4,
    marginTop:windowDimensions.height * 0.01,

  },
  texthead:{
    marginTop:-30,
    alignSelf:'center',
    fontWeight:'bold',
    // animation: 'fade 5s',
  },
    maps:{
      justifyContent:'center',
      alignSelf:'center',
      // flex:1,
      // width:windowDimensions.width * 0.2,
      // height:windowDimensions.height * 0.2,
      marginTop:-windowDimensions.height * 0.07,

    },
    // map:{
    //     width: '100%',
    //     height: '100%',
    // },
    pdf:{
      color:'black',
      fontWeight:'bold',
      fontSize:11,
      padding:10,
      backgroundColor:'#FFFFFF',
      borderRadius:4,
    },
    buttonpdf:{
      flexDirection:'row',
    //   alignSelf:'flex-end',
    //   backgroundColor:'#EDA01F',
    //   padding:3,
    //   borderRadius:3,
      justifyContent:'space-between',
      marginTop:10,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
  
    },
  
    selesai:{

      alignSelf:'flex-end',
  
      padding:8,
      backgroundColor:'#EDA01F',
      borderRadius:4,
      // marginHorizontal:windowDimensions.width * 0.05,
      // marginTop:windowDimensions.height * 0.02
  
    },
  
    texttop:{fontWeight:'bold',color: 'black', fontSize: 15},
    texttop2:{fontWeight:'bold',color: 'black',fontSize: 14 ,marginTop: 20},
    textrow:{fontWeight:'bold',color: 'white',},
    texttop3:{fontWeight:'bold',color: 'white', fontSize: 15, textAlign:'center'},
    container: {
      flex: 1,
      backgroundColor: '#EDA01F',
      padding: 10,
      alignItems: 'center', 
      flexDirection: 'column',
    },
    form1:{
      width: windowDimensions.width * 1,
      // height : windowDimensions.height * 0.9,
      padding: 20,
      paddingBottom: 20,
    //   borderRadius: 10,
      backgroundColor: '#fff',
      marginTop: -windowDimensions.height * 0.02,
      flexDirection:'column',
      justifyContent:'flex-start'
      
    },
    form2:{
      width: windowDimensions.width * 1,
      padding: 20,
    //   borderRadius: 10,
      backgroundColor: 'gray',
      flexDirection:'column',
      justifyContent:'flex-start',
      marginBottom : windowDimensions.height * 0.02,
      marginTop: -windowDimensions.height * 0.1,
    },
  })
