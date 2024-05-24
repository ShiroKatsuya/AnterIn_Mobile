import { Dimensions, StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';
export default function RincianPendapatan({ route }) {

  const [pilihPaketData, setPilihPaketData] = useState([]);
  const [isClickable, setIsClickable] = useState(true);

  // useEffect(() => {
  //   const toggleStatus = async () => {
  //     if (pilihPaketData && pilihPaketData.id) {
  //       const status = await AsyncStorage.getItem(String(pilihPaketData.id));
  //       if (status === 'true') {
  //         setIsClickable(false); 
  //       } else {
  //         setIsClickable(true); 
  //       }
  //     }
  //   };
  //   toggleStatus();
  // }, [pilihPaketData]);
  


  const [rules, setRules] = useState({
    15000: 5000,
    20000: 5000,
    25000: 5000,
    30000: 5000,
  });
  
  const [rulesdetail, setRulesDetail] = useState({
    15000: 10000,
    20000: 15000,
    25000: 20000,
    30000: 25000,
  });

  // console.log(rules)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl.url}/riwayatpesananuser/${route.params.id}`, {
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


  // useEffect(()=>{
  //   handleStatus()

  // },[])


  





  const handleStatus = async () => {
    if (!route.params.id) {
      throw new Error("Paket tidak valid.");
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        infostatusbykurir: 'Selesai',
      };
  
      const response = await axios.put(`${baseUrl.url}/updatestatusbykurir/${route.params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Data Berhasil Di Update');        
      if (response.data.success) {
        const updateGajiKurir = pilihPaketData.Harga_Paket - rules[pilihPaketData.Harga_Paket];
        const nama = pilihPaketData.Nama_Kurir;
        try {
          const gajiResponse = await axios.put(`${baseUrl.url}/updategajikurir/${nama}`, { gaji: updateGajiKurir }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          console.log(gajiResponse.data);
          const updatedData = await axios.get(`${baseUrl.url}/riwayatpesananuser/${route.params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          setPilihPaketData(updatedData.data);
        } catch (error) {
          console.error('Error update gaji:', error);
        }
      }
      return response.data; 

    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      throw error; 
    }
}







  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.headerform1}>
        <Text style={styles.text}>RINCIAN KONSUMEN</Text>
        <Text style={{color:'black', fontSize:15 , marginTop:-10 , textAlign:'center'}} >________________________________________</Text>
        <View style={styles.container1}>
          <Text style={styles.text2}>

          </Text>
          <Text style={styles.text4}>
            Nama : {pilihPaketData.nama}
            </Text>
            <Text style={styles.text4}>
            Alamat Yang Perlu Dikirim : 
            </Text>
            <Text style={styles.text4}>
            {pilihPaketData.DetailAlamat}
            </Text>
            <Text style={styles.text4}>
            Harga_Paket : {pilihPaketData.Harga_Paket}
            </Text>
        </View>
        <View style={styles.corimage}>
          <Image
          source={require('../../../img/logo.png')}
          style={styles.image}
          />
        </View>
        <View>
          <Text>
            Total Pendapatan 
          </Text>
          <Text style={styles.text4}>
            Harga_Paket : Rp.{pilihPaketData.Harga_Paket} - Rules
          </Text>
          <Text style={styles.text4}>
            Pendapatan Kurir Adalah : 
          </Text>
        </View>
        <View style={styles.status}>
          <View>
          <Text style={styles.text2}>
            Status Pesanan By 
          </Text>
          <Text style={styles.text2}>
           Konsumen
          </Text>
          <View style={styles.button}>
          <Text style={styles.text3}>
            Belum Selesai
          </Text>
          </View>
          </View>
          <View>
    
          <Text style={styles.text2}>
            Status Pesanan By 
          </Text>
  
          <Text style={styles.text2}>
          Kurir
          </Text>
          {/* <TouchableOpacity onPress={() => { handleUpdateGaji(); setIsClickable(false); }} disabled={!isClickable}>
      <View style={styles.button}>
        <Text style={styles.text3}>
          {isClickable ? "Belum Selesai" : "Selesai"}
        </Text>
      </View>
    </TouchableOpacity> */}

    <TouchableOpacity onPress={handleStatus} disabled={!isClickable || pilihPaketData.infostatusbykurir === "Selesai"}>
      <View style={styles.button}>
        <Text style={styles.text3}>
          {pilihPaketData.infostatusbykurir}
        </Text>
      </View>
    </TouchableOpacity>

          </View>


        </View>
      </View>
      <View style={styles.headerform2}>
        <Text style={styles.text}>RINCIAN PENDAPATAN</Text>
        <Text style={{color:'black', fontSize:15 , marginTop:-10 , textAlign:'center'}} >________________________________________</Text>
        <Text style={styles.text5}>Rules Based</Text>
        <Text style={{color:'black', fontSize:15 , marginTop:-10 , textAlign:'center'}} >________________________________________</Text>
        <Text style={styles.text5}>Jika Selesai By Konsumen/Kurir</Text>
        <Text style={{color:'black', fontSize:15 , marginTop:-10 , textAlign:'center'}} >________________________________________</Text>
        {Object.keys(rulesdetail).map((key, index) => (
          <View key={index} style ={{marginTop:20}}>
            <View style={styles.jenispaket}>
              <Text style={styles.text6}>
                Jika Paket : {key}
              </Text>
            </View>
            <View style={styles.gajikurir}>
              <Text style={styles.text6}>
                Gaji Kurir : {rulesdetail[key]}
              </Text>
            </View>
          </View>
        ))}
        <View>

        </View>
        <View style={styles.button}>
          <Text style={styles.text7}>
            Lihat Pendapatan Anda !
          </Text>
        </View>
        <View >
          <Text>
          Ketentuan dan persyaratan ada disini
          </Text>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  jenispaket:{
    flexDirection: 'column', justifyContent: 'flex-start', marginLeft: width*0.2
  },
  gajikurir:{
    flexDirection: 'row', justifyContent: 'flex-end', marginRight: width*0.2
  },
  container1:{
    marginVertical:10,
    marginHorizontal:10
  },
  text6:{
    fontSize:11,
    color:'white',
    textAlign:'center'
  },
  text5:{
    fontSize:15,
    // fontWeight:'bold',
    color:'black',
    textAlign:'center',
    marginVertical:10,
    marginHorizontal:10
  },
  text6:{
    fontSize:15,
    // // fontWeight:'bold',
    color:'black',
    // textAlign:'center',
    // marginVertical:10,
    // marginHorizontal:10
  },
  text7:{
    fontSize:14,
    color:'white',
    textAlign:'center',
    // marginVertical:10,
    // marginHorizontal:10
  },
  corimage:{
    marginVertical:10,
    marginHorizontal:10
  },
  button:{
    // width:width*0.1,
    // height:width*0.1,
    backgroundColor:'#EDA01F',
    borderRadius:3,
    padding:3,
    marginTop:10,
    marginVertical:10,
    marginHorizontal:10
  },

  status:{
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginTop: -width*0.2,
    marginVertical:10,
    marginHorizontal:10
  },

  image:{
    width:width*0.2,
    height:width*0.2,
  },

  text:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    textAlign:'center'
    
  },

  text2:{
    fontSize:11,
    fontWeight:'bold',
    // color:'black',
    textAlign:'center',

    
  },

  text4:{
    fontSize:13,
    fontWeight:'bold',
    // color:'black',
    // textAlign:'center'
    
  },
  text3:{
    fontSize:11,
    fontWeight:'bold',
    color:'white',
    textAlign:'center'
    
  },

  container:{
    flex:1,
    backgroundColor:"#EDA01F"
  },

  headerform1:{
    alignSelf:'center',
    justifyContent:'center',
    marginTop:10,

    width: width*0.9,
    backgroundColor:'white',
    padding:10,
    borderRadius:10


  },

  headerform2:{
    alignSelf:'center',
    justifyContent:'center',
    marginTop:10,

    width: width*0.9,
    backgroundColor:'white',
    padding:10,
    borderRadius:10

  }



})

