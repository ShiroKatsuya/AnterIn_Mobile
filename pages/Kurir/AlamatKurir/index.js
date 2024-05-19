import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export default function AlamatKurir() {
  const [ambilDataAlamat, setAmbilDataAlamat] = useState([]);
  const [dataPribadi,setDataPribadi]=useState({});

  const navigation = useNavigation();

  const handleTambahAlamatKurir = () => {

    navigation.navigate('TambahAlamatLengkapKurir')

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/datauser`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setAmbilDataAlamat(response.data["data"]);
      //   console.log(response.data)

      //  //lu cobain dulu dah console.log ada kgk datanya 
        console.log(response.data) 
      } catch (error) {
        console.error(error);
      }
    };
    // fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [dataPribadi.token]);



  return (
    <>
    {/* Container */}
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTambahAlamatKurir}>
        <View style={styles.alamat}>
          <Text style={styles.textalamat}>
              Tambah Alamat / Ubah Alamat Disini
          </Text>
        </View>
      </TouchableOpacity>
      {/* CardForm */}
      {ambilDataAlamat && (
      <View style={styles.form}>
        <Text style={styles.cardtext}>Alamat Lengkap : </Text>
          <View>
            <Text style={styles.cardtext}>{ambilDataAlamat.alamat}</Text>
            {/* <Text style={styles.cardtext}>{ambilDataAlamat.updated_at.slice(0,10)}</Text> */}
          </View>
   
        {/* Button Edit dan Hapus */}
        <View style={styles.button}>
          <View style={styles.button2}>
            <Text style={{color:'white'}}>
                Edit
            </Text>
          </View>
          <View style={styles.button1}>
            <Text style={{color:'white'}}>
                Hapus
            </Text>
          </View>
        </View>
      </View>
             )}
    </View>
    <View style={{  backgroundColor: '#0B111F', padding: 20 }}>
    </View>
  </>
  )
}

const window = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDA01F',
        padding: 10,
        alignItems: 'center', 
        flexDirection: 'column',
        
      },
      button1:{
        backgroundColor:'red',
        padding:10,
        borderRadius:5,
        paddingLeft:40,
        paddingRight:40,

        marginRight:20
 

      },

      button2:{
        // backgroundColor:'green',
        padding:10,
        borderRadius:5,
     backgroundColor:'#EBBC42',
        paddingLeft:50,
        paddingRight:50,

      },
    
      button:{
        // display:'flex',
        flexDirection:'row-reverse',
        alignContent:'flex-end',
        // justifyContent:'space-around'
        // paddingLeft:20,
        marginTop:20,
        alignItems:'center',
        // marginRight:1
        
    
      },
      cardtext:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      alamat:{
        alignItems:'center',
        marginTop:20,
        backgroundColor:'black',
        borderRadius:5,
        padding:10,
        paddingLeft: window.width * 0.3,
        paddingRight: window.width * 0.3
    
   
      },
      textalamat:{
        fontWeight:'bold',
        fontSize:15,
        color:'white',
        textAlign:'center'
      },
      form:{

            borderWidth:2,
            borderRadius:15,
            borderColor:'black',
            width: window.width * 0.8,
            padding:20,
            backgroundColor:'white',
            justifyContent:'center', 
            marginTop:40,

                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,



            
      }
      
})