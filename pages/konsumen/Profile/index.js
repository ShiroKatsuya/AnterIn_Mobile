import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';



export default function Profile() {
  const [ambilDataProfile, setAmbilDataProfile] = useState([]);
  const [dataPribadi,setDataPribadi]=useState({});
  const navigation = useNavigation();

useEffect(()=>{
},[dataPribadi.token])






  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios(`${baseUrl.url}/datauser`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
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

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${baseUrl.url}/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
          console.log(response.data);
  
   
      }
    } catch (error) {
      // console.error("Logout error:", error);
    } finally {
      await AsyncStorage.removeItem('token'); 
      navigation.navigate('Login'); 
   
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Logout Success');
  };
  const handleAlamat = () => {
    navigation.navigate('Alamat'); 
  };


  return (
    <>
      <View style={{ alignItems: 'center', flexDirection: 'column' , ...StyleSheet.absoluteFillObject, backgroundColor: '#EDA01F' }}>
        
        <View style={styles.card}>

        {/* Profile */}

        {ambilDataProfile && (
        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
          <Image
            source={require('../../img/logo.png')}
            resizeMode="cover"
            style={{ width: 90, height: 90 }}
          />
          <Text style={{ fontWeight: 'bold' }}>{ambilDataProfile.nama}</Text>
          <Text style={{ fontWeight: 'bold' }}>{ambilDataProfile.nohp}</Text>
        </View>
        )}

      {/* alamat + Edit Profile */}
        <View style={{alignItems:'center' ,marginBottom:8}}>
        <View style={styles.button}>
          <Text style={styles.text}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={handleAlamat}>
        <View style={styles.button2}>
          <Text style={styles.text}>Tambah Alamat</Text>
        </View>
        </TouchableOpacity>
        </View>

        <View style={{display:'flex', flexDirection:'row-reverse',justifyContent:'space-between' , marginTop:10}}>
          <View style={{flexDirection:'column'}}>
            <Image source={require('../../img/Time.png')} style={styles.icon} />
            <Text style={styles.text2}> Minute</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Image source={require('../../img/camera.png')} style={styles.icon} />
            <Text style={styles.text2}> 5 Foto</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Image source={require('../../img/Age.png')} style={styles.icon} />
            <Text style={styles.text2}> 25 Age</Text>
          </View>
        </View>
        </View>
        <View style={{flexDirection:'column', alignItems:'stretch', flex:1 , marginTop:50}}>
        <View style={styles.button3}>
          <Text style={styles.text2}>Ubah Password</Text>
          </View>
          <View style={styles.button3}>
          <Text style={styles.text2}>Ubah Email</Text>
          </View>
          <View style={styles.button3}>
          <Text style={styles.text2}>Pusat Bantuan</Text>
          </View>
          <View style={{  backgroundColor: '#34CC43',
                          padding:10,
                          paddingLeft:100,
                          paddingRight:100,
                          // margin:20,
                          marginTop:5,
                          borderColor:'black',
                          borderWidth:1.3,
                          borderRadius:4,
    }}>
         <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.text}>Keluar</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

  button:{
    backgroundColor: '#34CC43',
    padding:10,
    paddingLeft:78,
    paddingRight:78,
    // margin:20,
    borderRadius:50,
    marginTop:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

 


  },
  button2:{
    backgroundColor: '#34CC43',
    padding:10,
    paddingLeft:60,
    paddingRight:60,
    // margin:20,
    borderRadius:50,
    marginTop:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

 


  },

  button3:{
    backgroundColor:'#EDA01F',
    padding: 10,
    paddingRight: 190,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1.3,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

 


  },

  text:{
    // alignContent:'flex-start',
    textAlign:'center',
    fontSize:16,
    color:'white',
    justifyContent:'center'
    
   
  },

  text2:{


    // textAlign:'center',
    fontSize:14,
    color:'black',
    // justifyContent:'center'
    
   
  },


  card: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 20,
  },

  icon: {
    width:  40, 
    height: 40, 
    // padding: 5,
    marginRight: 10,
    // textAlign:'center',
    // justifyContent:'center',
    // alignItems:'center'
    marginTop:1,
    alignSelf:'center'
  },
})