import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Dimensions, ScrollView,PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';

const InputPesanan = ({ route }) => {
    const navigation = useNavigation();
    const [pilihPaket, setPilihPaket] = useState(route.params.pilih || {});
    const [PilihanAlamat, setPilihanAlamat] = useState('');
    const [pilihalamat, setpilihalamat] = useState(route.params.pilihalamat || {});
    const [pilihKurir, setPilihKurir] = useState(route.params.pilihkurir || {});
    const [pilihPaketData, setPilihPaketData] = useState({});

    const [titikjemput, setTitikJemput] = useState('');
    const [inputEnabled, setInputEnabled] = useState(false);
    const [currentLocation,setCurrentLocation]=useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValueBerat, setSelectedValueBerat] = useState(null);

    const [Nama_Barang, setNamaBarang] = useState(null);
    const [Lebar_cm, setLebar_cm] = useState(null);
    const [Tinggi_cm, setTinggi_cm] = useState(null);

    console.log(titikjemput)

    console.log(Lebar_cm);
    console.log(Tinggi_cm);
    console.log(Nama_Barang);

    const handleNavigation = () => {
        navigation.navigate('RajaOngkir');
    }

    const [lokasi,setAddress]=useState('');

    // console.log(lokasi)

    // console.log(currentLocation)

    const Akseslokasi = async () => {
        let akseslokasi;
        do {
          try {
            akseslokasi = await PermissionsAndroid.request(
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
              break; 
            } else {
              console.log('Location permission denied, asking again...');
            }
          } catch (err) {
            console.warn(err);
            break; 
          }
        } while (akseslokasi !== PermissionsAndroid.RESULTS.GRANTED);
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
            //   console.log('Latitude : ',latitude)
            //   console.log('Longtitude : ',longitude)
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

    const placeholder = {
        label: 'Pilihan Penganggkutan...',
        value: null,
    };

    const options = [
        { label: 'Opsi 1', value: 'Mobil' },
        { label: 'Opsi 2', value: 'Motor' },
    ];

    const Berat_kg = [
        { label: '5-10 kg', value: '5-10 kg' },
        { label: '11-15 kg', value: '11-15 kg' },
        { label: '16-20 kg', value: '16-20 kg' },
    ];

    useEffect(() => {
        setPilihPaket(route.params.pilih || {});
    }, [route.params.pilih]);

    useEffect(() => {
        if (route.params.data) {
            const { Nama_Barang, Tinggi_cm, Lebar_cm } = route.params.data;
            setNamaBarang(Nama_Barang);
            setTinggi_cm(Tinggi_cm);
            setLebar_cm(Lebar_cm);
        }
    }, [route.params.data]);

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
        if (currentLocation && Object.keys(currentLocation).length !== 0) {
            setTitikJemput(currentLocation.latitude + ' '+ currentLocation.longitude);
            // console.log(LokasiJemputan)
        }
    }, [currentLocation]);


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

    useEffect(() => {
        if (route.params.data && route.params.data.Berat_kg) {
            selectedValueBerat(route.params.data.Berat_kg);

            AsyncStorage.setItem('Berat_kg', route.params.data.Berat_kg);
        } else {
            AsyncStorage.getItem('Berat_kg').then((value) => {
                if (value) {
                    setSelectedValueBerat(value);
                }
            });
        }
    }, [route.params.data]);

    const [form, setForm] = useState({
        Nama_Barang: Nama_Barang,
        Lebar_cm: Lebar_cm,
        Tinggi_cm: Tinggi_cm,
        Berat_kg: null,
        Nama_Paket: '',
        Harga_Paket: '',
        Nama_Kurir: '',
        kurirs_id: '',
        Angkutan: null,
        city_name: '',
        province: '',
        postal_code: '',
        DetailAlamat: '',
        titikjemput:titikjemput


    });

    const [showMessage, setShowMessage] = useState(null);

    const handleInputChange = (name, value) => {
        if (name === 'Nama_Kurir') {
            setForm(prevForm => ({
                ...prevForm,
                Nama_Kurir: pilihKurir.nama,
            }));
        } else if (name === 'kurirs_id') {
            setForm(prevForm => ({
                ...prevForm,
                kurirs_id: pilihKurir.kurirs_id,
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
        if (name == 'city_name') {
            setForm({
                ...form,
                city_name: pilihalamat.city_name,
            });
        }

        if (name == 'province') {
            setForm({
                ...form,
                province: pilihalamat.province,
            });
        }
        if (name == 'postal_code') {
            setForm({
                ...form,
                postal_code: pilihalamat.postal_code,
            });
        }
        if (name === 'Nama_Barang') {
            setNamaBarang(value);
        }

        if (name == 'Angkutan') {
            setSelectedValue(value);
        }
        if (name == 'Berat_kg') {
            setSelectedValueBerat(value);
        }
        if (name == 'Lebar_cm') {
            setLebar_cm(value);
        }
        if (name == 'Tinggi_cm') {
            setTinggi_cm(value);
        }if (name == 'titikjemput') {
            setLokasiJemputan(value);
        }
    };


    const kirimPesanan = async () => {
        if (!Nama_Barang || !Lebar_cm || !Tinggi_cm) {
            setShowMessage('Masukkan Nama Barang');
            return;
        } else if (!pilihPaketData.Nama_Paket || !pilihPaketData.Harga_Paket) {
            setShowMessage('Pilih Jenis Paket');
            return;
        } else if (!form.Nama_Kurir) {
            setShowMessage('Pilih Nama Kurir');
            return;
        } else if (!pilihalamat.city_name) {
            setShowMessage('Pilih City');
            return;
        } else if (!pilihalamat.province) {
            setShowMessage('Pilih Province')
            return;
        } else if (!pilihalamat.postal_code) {
            setShowMessage('Pilih Kode_Pos')
            return;
        } else if (!form.DetailAlamat) {
            setShowMessage('Masukan Detail Alamat')
        }else if (!form.Berat_kg) {
            setShowMessage('Masukan Berat_kg')
        }else if (!form.kurirs_id) {
            setShowMessage('Pilih Kurir')
        }else if (!titikjemput) {
            setShowMessage('Pilih Titik Jemput')
        }


        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                Nama_Barang: Nama_Barang,
                Lebar_cm: Lebar_cm,
                Tinggi_cm: Tinggi_cm,
                Angkutan: selectedValue,
                Nama_Paket: pilihPaketData.Nama_Paket,
                Harga_Paket: pilihPaketData.Harga_Paket,
                Nama_Kurir: form.Nama_Kurir,
                kurirs_id: form.kurirs_id,
                city_name: pilihalamat.city_name,
                province: pilihalamat.province,
                postal_code: pilihalamat.postal_code,
                DetailAlamat: form.DetailAlamat,
                Berat_kg: selectedValueBerat,
                titikjemput: titikjemput,

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
                    {/* <Text style={styles.text}>
                        Cari Nama Barang, Alamat Tujuan, Jenis Paket, atau Kurir yang Ingin Dicek
                    </Text> */}
                    <View style={styles.form}>

                        <View style={styles.kamera}>
                            <TouchableOpacity onPress={() => navigation.navigate('KlasifikasiObjek')}>
                                <Image source={require('../../img/camera.png')} style={styles.camera} />
                                <Text style={styles.txt}>Scan Ulang Disini !</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        
                    <View style={styles.form}>
                       
                        <Text style={styles.text}>Nama Barang</Text>
                        
                        
                        <TextInput
                            style={[styles.input, styles.forminside]}
                            placeholder="Nama Barang"
                            value={inputEnabled ? form.Nama_Barang : Nama_Barang}
                            onChangeText={(text) => handleInputChange('Nama_Barang', text)}
                            editable={inputEnabled}
                        />
                                 <Text style={styles.text}>Lebar Barang</Text>
                            <TextInput
                            style={[styles.input, styles.forminside]}
                            placeholder="Lebar"
                            value={inputEnabled ? (form.Lebar_cm ? form.Lebar_cm.toString() : '') : (Lebar_cm ? Lebar_cm.toString() : '')}
                            onChangeText={(text) => handleInputChange('Lebar_cm', text)}
                            editable={inputEnabled}
                            keyboardType="numeric"
                        />
                                         <Text style={styles.text}>Tinggi Barang</Text>
                                         <TextInput
                            style={[styles.input, styles.forminside]}
                            placeholder="Tingi_cm"
                            value={inputEnabled ? (form.Tinggi_cm ? form.Tinggi_cm.toString() : '') : (Tinggi_cm ? Tinggi_cm.toString() : '')}
                            onChangeText={(text) => handleInputChange('Tinggi_cm', text)}
                            editable={inputEnabled}
                            keyboardType="numeric"
                        />


    

                        <Button
                            title={inputEnabled ? 'Disable Input' : 'Enable Input'}
                            onPress={() => {
                                if (!inputEnabled) {
                                    setForm({
                                        ...form,
                                        Nama_Barang: Nama_Barang,
                                        Lebar_cm: Lebar_cm,
                                        Tinggi_cm: Tinggi_cm,
                                    });
                                }
                                setInputEnabled(!inputEnabled);
                            }}
                        />
                    <View>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={Berat_kg}
                                onValueChange={(value) => setSelectedValueBerat(value)}
                                onTextChange={(text) => handleInputChange('Berat_kg', text)}
                                value={selectedValueBerat}
                            />
                            {selectedValueBerat && <Text style={[styles.input, styles.forminside]}>Pilihan Berat : {selectedValueBerat}</Text>}
                        </View>


                        </View>
                    
                    <View style={styles.form}>
                        <Text style={styles.text}>Alamat Tujuan</Text>

                        <Button

                            onPress={() => {
                                handleNavigation()
                            }}
                            title="Pilih Alamat Otomatis Disini"
                        >

                        </Button>

                        <Text style={[styles.input, styles.forminside]}>{pilihalamat.city_name}</Text>
                        <Text style={[styles.input, styles.forminside]}>{pilihalamat.province}</Text>
                        <Text style={[styles.input, styles.forminside]}>{pilihalamat.postal_code}</Text>

             
           

                        {/* <Text style={[styles.input, styles.forminside]}></Text>
                        <Text style={[styles.input, styles.forminside]}></Text> */}

                        <TextInput
                            style={[styles.input, styles.forminside]}
                            placeholder="Masukan Detail Alamat Jalan.Rt/Rw"
                            value={form.DetailAlamat}
                            onChangeText={(text) => handleInputChange('DetailAlamat', text)}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.text}>Titik Jemput</Text>
                        <TextInput
                            style={[styles.input, styles.forminside]}
                            placeholder="Titik Jemput"
                            value={titikjemput}
                            onChangeText={(text) => handleInputChange('titikjemput', text)}
                            editable={false}
                        />
    
                         
                    </View>
                    <View style={styles.form}>
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
                        <Text style={[styles.input, styles.forminside]}>{pilihKurir.kurirs_id}</Text>
                        <Button
                            title="Simpan Pilihan Kurir"
                            onPress={() => {
                                handleInputChange('Nama_Kurir', form.Nama_Kurir);
                                handleInputChange('kurirs_id', form.kurirs_id);
                                alert('Data kurir berhasil disimpan!');
                            }}
                            disabled={!pilihKurir.nama && !pilihKurir.kurirs_id}
                        />
                        <View>
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
                            onPress={() => {
                                if (titikjemput && Nama_Barang && Lebar_cm && Tinggi_cm && pilihKurir.nama && form.Nama_Kurir && pilihKurir.kurirs_id && form.kurirs_id && selectedValue && pilihalamat.city_name && pilihalamat.province && pilihalamat.postal_code && form.DetailAlamat && selectedValueBerat) {
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
    color: 'white',
    marginBottom: 5,
    backgroundColor: '#eda01f',
    padding: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // paddingHorizontal: 20 , 
  },
  headerinput: {
    backgroundColor: '#0b111f',
    //padding: 10,
    //borderRadius: 5, 
  },
  form: {
    paddingHorizontal: '5%', 
    marginBottom: 20,
    backgroundColor: 'white',
    //borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  forminside: {
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold'
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