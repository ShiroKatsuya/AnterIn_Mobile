import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl,TextInput,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function TambahALamat() {

  const [ambilDataAlamat, DataAlamat] = useState([]);
  const [dataPribadi,setDataPribadi]=useState({});
  const navigation = useNavigation()
  
  const [showMessage, setShowMessage] = useState(''); 

  const [form, setForm] = useState({
    alamat: '',



});

useEffect(() => {
  // getDataUserLocal();
}, [dataPribadi.token]);

const handleInputChange = (name, value) => {
    setForm({
        ...form,
        [name]: value,
    });
}

const handelGetLokasi = () => {
  fetchData();

  if(fetchData){
    console.log('berhasil')
  }else{
    console.log('gagal')
  }

}


const fetchData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('http://192.168.100.56:8888/api/lokasi', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    DataAlamat(response.data["message"])
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const tambahAlamat = async () => {
  if (!form.alamat) {
      setShowMessage('Masukan Alamat');
      return;
  }

  try {
      const token = await AsyncStorage.getItem('token');
      const data = {
          alamat: form.alamat,

      };

      const response = await axios.put('http://192.168.100.56:8888/api/userupdate', data, {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });
      console.log(response.data);

  } catch (error) {
      console.error(error);
  }
};






  return (
    //container
    <>
    <View style={styles.container}> 
      
    

      <View style={styles.form }>

      
      <Text style={styles.text}>Detail Alamat</Text>
      <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Alamat Lengkap"
          value={form.alamat}
          onChangeText={(text) => handleInputChange('alamat', text)}
        />
      <Text style = {styles.text}>Simpan Sebagai</Text>
      <View style={styles.tempat}>
        <TouchableOpacity>  
        <View style = {styles.rumah}>
          <TouchableOpacity onPress={ handelGetLokasi}>
        <Text >
        Deteksi Alamat Otomatis Disini !
        </Text>
   
        </TouchableOpacity>
  
        </View>
 
        </TouchableOpacity>




      {/* <TouchableOpacity>
        <View style = {styles.kantor}>
        <Text>
          Kantor
        </Text>
        </View></TouchableOpacity> */}
        
      </View>
      <View>
          <Text>
        {ambilDataAlamat.Lokasi_Anda}
          </Text>
        </View>

      <View style= {{ marginTop:25 }}>
      <Button 
                title="Submit"
                // style={{marginTop:20}}
                onPress={() => {
                    if (form.alamat) {
                        tambahAlamat()
                        alert('Data berhasil dikirim!');
                        navigation.navigate('Alamat');
                    } else {
                        alert('Harap lengkapi semua form sebelum submit');
                    }

                }}
                color="black" 
        />
        </View>
        {showMessage && <Text>{showMessage}</Text>}

      
      </View>

    </View>
    </>
  )
}

const styles = StyleSheet.create({
text:{fontWeight:'bold'},
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
    alignItems: 'center', 
    flexDirection: 'column',
    
  },

  rumah:{
    fontSize : 20,
    color:'black',
    borderColor:'green',
    borderRadius:4,
    borderWidth:2,
    padding:5,
    paddingLeft:25,
    paddingRight:25,
    alignItems:'center',
    textAlign:'center',
    // fontWeight:'bold'
    fontWeight:'300'
    // backgroundColor:'black'
  },
  kantor:{
    fontSize : 20,
    color:'black',
    borderColor:'green',
    borderRadius:4,
    borderWidth:2,
    padding:5,
    paddingLeft:25,
    paddingRight:25,
    alignItems:'center',
    textAlign:'center',
    // fontWeight:'bold'
    fontWeight:'300'
    // backgroundColor:'black'
  },

  tempat:{
      flexDirection:'row',
      justifyContent: 'space-evenly',
      alignItems:'center', 
      paddingTop : 20,
      
      
  },  

  form:{
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop:40,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  
  form2: {
    backgroundColor:'white',
    color:'black',
    marginTop:10,
    marginBottom:10,
  },
input: {
  height: 40,
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  color:'black',
},
  
})