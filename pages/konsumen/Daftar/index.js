import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../baseUrl';

export default function Daftar() {
  
  const navigation = useNavigation();
  const [form, setForm] = useState({
    nama: '',
    nohp: '',
    email: '',
    password: '',
    role_id: '2', 
  });





  const [showMessage, setShowMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(true);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleLogin = () => {
    navigation.navigate('Login');
  }

  //disisini logika validasi ya !!
  const register = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.nama) {
      setShowMessage('Masukkan Nama');
      return;
    } else if (!form.email || !emailRegex.test(form.email)) {
      setShowMessage('Masukkan Email Yang Valid');
      return;
    } else if (!form.password) {
      setShowMessage('Masukkan Password');
      return;
    } else if (!form.nohp) {
      setShowMessage('Masukkan No.Hp');
      return;
    }
                                    //Nanti aturlah buat base url nya ini modelan hardcode gini bakal ribet ganti2 nya lagi
    try {                           // jangan lupa /api/... adalah benar untuk routing nya
      const response = await axios.post('http://192.168.100.56:8888/api/register', form); 
      if (response.data) {
        setShowMessage('Registrasi berhasil');
        console.log(response.data)

      }
    } catch (error) {
      setShowMessage(error.response.data.message || 'Terjadi kesalahan');
    }
  };

  return (
    <>
    <View style={styles.flexheader}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../img/logo.png')}
            resizeMode="cover"
            style={styles.img}
          />
        </View>

        <View style={styles.regisakun}>
          <Text style={styles.daftar}>DAFTAR AKUN</Text>
          <Text> Silahkan Daftarkan Akun Terlebih Dahulu</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Nama"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nama', text)}
          />
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('email', text)}
          />

          <View>
            <TextInput
              style={[styles.input, styles.form2]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={{ backgroundColor: 'red', padding: 7, borderRadius: 10, alignSelf: 'flex-end', textAlign: 'center', color: 'white', fontSize: 10, marginTop: -6, marginBottom: 3 }}>
                {showPassword ? 'Show Password' : 'Hide Password'}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="No.Hp"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nohp', text)}
          />

        {/* <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Alamat"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nohp', text)}
          /> */}  
          {/* Bagian bottom */}
          <Button title="Daftar" color="#EDA01F"
           onPress={() => {
               if ( form.nama && form.email && form.password && form.nohp) {
                   register()
                   alert('Anda Berhasil Daftar');
                   navigation.navigate('Login');
             
               } else {
                   alert('Harap lengkapi semua form sebelum submit');
               }
           }}
  
          />
          {showMessage && <Text>{showMessage}</Text>}
  
          <Text style={styles.akun}>
            Jika Memiliki Akun?
          </Text>
    
          {/* <TouchableOpacity onPress={handleLogin}> */}
          <View style={{marginTop:12}}>
            <Button title='Login' color="#EDA01F" onPress={handleLogin}/>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  regisakun:{
    marginBottom:20
  },
  flexheader:{
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  },
  img:{
    width: 150, height: 150
  },
  akun:{
    marginTop:12 , color:(255, 255, 255, 0.5), 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  daftar:{
    fontWeight:'bold',
    fontSize:20,
    color:'black',
    marginBottom:10,
    textAlign:'center'

  },




  form: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  form2: {
    backgroundColor:'black',
    color:'white'
  },

});

