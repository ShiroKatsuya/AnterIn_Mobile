import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { baseUrl } from '../../baseUrl';
import RNPickerSelect from 'react-native-picker-select';

const InputPesanan = ({ route }) => {
    const navigation = useNavigation();
    const [pilihPaket, setPilihPaket] = useState(route.params.pilih || {});
    const [PilihanAlamat, setPilihanAlamat] = useState('');
    const [pilihalamat, setpilihalamat] = useState(route.params.pilihalamat || {});
    const [pilihKurir, setPilihKurir] = useState(route.params.pilihkurir || {});
    const [pilihPaketData, setPilihPaketData] = useState({});
    const [inputEnabled, setInputEnabled] = useState(false);
    const [Nama_Barang, setNamaBarang] = useState('');  
    const [selectedValue, setSelectedValue] = useState(null);


    const handleNavigation = () => {
        navigation.navigate('RajaOngkir')
    }

    const placeholder = {
        label: 'Pilihan Penganggkutan...',
        value: null,
      };
    
      const options = [
        { label: 'Opsi 1', value: 'Mobil' },
        { label: 'Opsi 2', value: 'Motor' },
      ];

    useEffect(() => {
        setPilihPaket(route.params.pilih || {});
    }, [route.params.pilih]);
    
    useEffect(() => {
        setPilihKurir(route.params.pilihkurir || {});
    }, [route.params.pilihkurir]);

    useEffect(() => {
        setpilihalamat(route.params.pilihalamat || {});
    }, [route.params.pilihalamat]);

    useEffect(() => {
        if (route.params.pilihalamat) {
          setpilihalamat(route.params.pilihalamat);
          AsyncStorage.setItem('pilihalamat', JSON.stringify(route.params.pilihalamat));
        } else {
          AsyncStorage.getItem('pilihalamat').then((value) => {
            if (value) {
              setpilihalamat(JSON.parse(value));
            }
          });
        }
      }, [route.params.pilihalamat]);

    useEffect(() => {
        if (pilihPaket && Object.keys(pilihPaket).length !== 0) {
            setPilihPaketData(pilihPaket);
        }
    }, [pilihPaket]);

    useEffect(() => {
      if (route.params.data && route.params.data.Nama_Barang) {
          setNamaBarang(route.params.data.Nama_Barang);
          
          AsyncStorage.setItem('Nama_Barang', route.params.data.Nama_Barang);
      } else {
  
          AsyncStorage.getItem('Nama_Barang').then((value) => {
              if (value) {
                setNamaBarang(value);
              }
          });
      }
  }, [route.params.data]);

  



  

  useEffect(() => {
    if (route.params.data && route.params.data.Angkutan) {
        selectedValue(route.params.data.Angkutan);
        
        AsyncStorage.setItem('Angkutan', route.params.data.Angkutan);
    } else {
        AsyncStorage.getItem('Angkutan').then((value) => {
            if (value) {
                setSelectedValue(value);
            }
        });
    }
}, [route.params.data]);

    const [form, setForm] = useState({
        Nama_Barang: Nama_Barang, 
        // Alamat_Tujuan: '',
        Nama_Paket: '',
        Harga_Paket: '',
        Nama_Kurir: '',
        Angkutan: null,
        city_name:'',
        province:'',
        postal_code:'',

    });

    const [showMessage, setShowMessage] = useState(null);

    const handleInputChange = (name, value) => {
        if (name === 'Nama_Kurir') {
            setForm({
                ...form,
                Nama_Kurir: pilihKurir.nama, 
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
        if(name== 'city_name'){
            setForm({
                ...form,
                city_name: pilihalamat.city_name,
            });
        }
        if(name== 'province'){
            setForm({
                ...form,
                province: pilihalamat.province,
            });
        }
        if(name== 'postal_code'){
            setForm({
                ...form,
                postal_code: pilihalamat.postal_code,
            });
        }
        if (name === 'Nama_Barang') {
            setNamaBarang(value);
        }

        if (name == 'Angkutan'){
            setSelectedValue(value);
        }
    };

    const kirimPesanan = async () => {
        if (!Nama_Barang) {
            setShowMessage('Masukkan Nama Barang');
            return;
        } else if (!pilihPaketData.Nama_Paket || !pilihPaketData.Harga_Paket) {
            setShowMessage('Pilih Jenis Paket');
            return;
        } else if (!form.Nama_Kurir) {
            setShowMessage('Pilih Nama Kurir');
            return;
        }else if (!pilihalamat.city_name){
            setShowMessage('Pilih City');
            return; 
        }else if (!pilihalamat.province){
            setShowMessage('Pilih Province')
            return;
        }else if (!pilihalamat.postal_code) {
            setShowMessage('Pilih Kode_Pos')
            return;
        }


        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                Nama_Barang: Nama_Barang,
                Angkutan: selectedValue,
                Alamat_Tujuan: form.Alamat_Tujuan,
                Nama_Paket: pilihPaketData.Nama_Paket,
                Harga_Paket: pilihPaketData.Harga_Paket,
                Nama_Kurir: form.Nama_Kurir, // Perubahan di sini
                city_name : pilihalamat.city_name,
                province:pilihalamat.province,
                postal_code:pilihalamat.postal_code
            };

            const response = await axios.post(`${baseUrl.url}/inputpesanan`, data, {
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

        <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
            <View style={styles.headerinput}>
                <Text style={styles.text}>
                    Cari Nama Barang, Alamat Tujuan, Jenis Paket, atau Kurir yang Ingin Dicek
                </Text>
                <View style={styles.form}>

                  <View style={styles.kamera}>
                <TouchableOpacity onPress={() => navigation.navigate('KlasifikasiObjek')}>
                <Image source={require('../../img/camera.png')} style={styles.camera} />
                    <Text style={styles.txt}>Scan Ulang Disini !</Text>
                </TouchableOpacity>
                </View>




                    <Text style={styles.text}>Nama Barang</Text>
                                <TextInput
                    style={[styles.input, styles.forminside]}
                    placeholder="Nama Barang"
                    value={inputEnabled ? form.Nama_Barang : Nama_Barang}
                    onChangeText={(text) => handleInputChange('Nama_Barang', text)}
                    editable={inputEnabled}
                />
                <Button
                    title={inputEnabled ? 'Disable Input' : 'Enable Input'}
                    onPress={() => {
                        if (!inputEnabled) {
                            setForm({
                                ...form,
                                Nama_Barang: Nama_Barang,
                            });
                        }
                        setInputEnabled(!inputEnabled);
                    }}
                />



                    {/* <Text style={styles.text}>Alamat Tujuan</Text> */}
                    {/* <TextInput
                        style={[styles.input, styles.forminside]}
                        placeholder="Alamat Tujuan"
                        value={form.Alamat_Tujuan}
                        onChangeText={(text) => handleInputChange('Alamat_Tujuan', text)}
                    /> */}
                     <Text style={styles.text}>Alamat Tujuan</Text>

                  <Button 

                    onPress={()=>{
                        handleNavigation()
                    }}
                    title="Pilih Alamat Otomatis Disini"
                  >
       
      
                  </Button>

                  <Text style={[styles.input, styles.forminside]}>{pilihalamat.city_name}</Text>
                  <Text style={[styles.input, styles.forminside]}>{pilihalamat.province}</Text>
                  <Text style={[styles.input, styles.forminside]}>{pilihalamat.postal_code}</Text>
                    {/* <TextInput
                        style={[styles.input, styles.forminside]}
                        placeholder="city"
                        value={form.city}
                        onChangeText={(text) => handleInputChange('city', text)}
                    />
                        <TextInput
                        style={[styles.input, styles.forminside]}
                        placeholder="province"
                        value={form.province}
                        onChangeText={(text) => handleInputChange('province', text)}
                    />

                    <TextInput
                        style={[styles.input, styles.forminside]}
                        placeholder="kode_pos"
                        value={form.kode_pos}
                        onChangeText={(text) => handleInputChange('kode_pos', text)}
                    /> */}


                    <Text style={styles.text}>Jenis Paket</Text>
                    <View>
                        <Text style={[styles.input, styles.forminside]}>{pilihPaketData.Nama_Paket}</Text>
                        <Text style={styles.text}>Harga</Text>
                        <Text style={[styles.input, styles.forminside]}>{pilihPaketData.Harga_Paket}</Text>
                    </View>
                    <Text style={styles.text}>Kurir</Text>
                    <View style={styles.pilihkurir}>
                        <TouchableOpacity onPress={() => navigation.navigate('Kurir')}>
                            <View style={styles.logo}>
                                <Image source={require('../../img/SiCepat.png')} style={styles.logo1} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleInputChange('Nama_Kurir', 'J&T')}>
                            <View style={styles.logo}>
                                <Image source={require('../../img/J&T.png')} style={styles.logo1} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleInputChange('Nama_Kurir', 'JNE')}>
                            <View style={styles.logo}>
                                <Image source={require('../../img/JNE.png')} style={styles.logo2} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.logo}>
                            <Text>Logo Here</Text>
                        </View>
                    </View>
                    <Text style={styles.text}>Kurir Yang Anda Pilih Adalah</Text>
                    <Text style={[styles.input, styles.forminside]}>{pilihKurir.nama}</Text>
                    <Button
                        title="Simpan Pilihan Kurir"
                        onPress={() => {
                            handleInputChange('Nama_Kurir', form.Nama_Kurir);
                            alert('Data kurir berhasil disimpan!');
                        }}
                        disabled={!pilihKurir.nama}
                    />
                <View>
                                {/* <Text>Select an option:</Text> */}
                    <RNPickerSelect
                  placeholder={placeholder}
                  items={options}
                  onValueChange={(value) => setSelectedValue(value)}
                  onTextChange={(text) => handleInputChange('Angkutan', text)}
                  value={selectedValue} 
                    />
                    {selectedValue && <Text style={[styles.input, styles.forminside]}>Pilihan Penganggutan : {selectedValue}</Text>}
                </View>

                    <Button
                        title="Submit"
                        onPress={() => {                                                          //tadi typo kenapa harus form.city_name !                    
                            if (Nama_Barang && pilihKurir.nama && form.Nama_Kurir && selectedValue && pilihalamat.city_name && pilihalamat.province && pilihalamat.postal_code) {
                                kirimPesanan();
                                alert('Data berhasil dikirim!');
                                navigation.navigate('Checkout');
                            } else {
                                alert('Harap lengkapi semua form sebelum submit dan jangan lupa simpan pilihan kurir');
                            }
                        }}
                        color="black" 
                    />
                    {showMessage && <Text>{showMessage}</Text>}
                </View>
            </View>
            </ScrollView>
        </View>
    );

}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  camera:{
    height: windowWidth * 0.20,
    width: windowWidth * 0.20,
    marginTop : -30
},
txt:{
    fontWeight:'bold',
    fontSize: 15,
    marginTop : -30,
    // marginLeft:25

},
kamera:{
  justifyContent:'center',
  alignItems: 'center',
},
  pilihkurir:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
    marginBottom:20

  },
  logo:{
    backgroundColor:'#ffffff',
    padding:20,
    borderRadius:5
  },

  textAreaContainer: {
    borderRadius: 2,
    padding: 5,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1.2,
  },
  textArea: {
    // height: 100,
    // justifyContent: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    paddingHorizontal: '5%', 
  },
  headerinput: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  form: {
    paddingHorizontal: '5%', 
  },
  forminside: {
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  logo1:{
    width:50,
    height: 10,
    borderRadius: 3,
    marginLeft: 3,
    alignSelf:'center',
  },
  logo2:{
    width:50,
    height: 20,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  }
});

export default InputPesanan