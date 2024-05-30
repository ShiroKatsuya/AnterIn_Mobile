import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../baseUrl';
export default function DaftarKurir() {
  
  const [showMessage, setShowMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(true);

  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countingDown, setCountingDown] = useState(false);

  const navigation = useNavigation();
  const [form, setForm] = useState({
    nama: '',
    nohp: '',
    email: '',
    password: '',
    role_id: '3', 
    code:''
  });


  
  useEffect(() => {
    let intervalId;
    if (countingDown && countdownTime > 0) {
      intervalId = setInterval(() => {
        setCountdownTime((time) => time - 1);
      }, 1000);
    } else if (countdownTime === 0) {
      setCountingDown(false);
    }
    return () => clearInterval(intervalId);
  }, [countingDown, countdownTime]);


  const sendCode = async () => {
    setShowMessage(null);
    setIsSuccessSend(false);

    const isNumeric = !isNaN(form.nohp) && !isNaN(parseFloat(form.nohp));
    if (!form.nohp || !isNumeric) {
      setShowMessage('Nomor HP harus numerik');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl.url}/send-otp-wa`, {
        nohp: form.nohp,
      });
      const result = response.data;
      if (result.success) {
        setIsSuccessSend(true);
        setCountdownTime(30);
        setCountingDown(true);
      }
      setShowMessage(result.message);
    } catch (error) {
      // Handle error
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handleLogin = () => {
    navigation.navigate('LoginKurir');
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
    }else if (!form.code) {
      setShowMessage('Masukkan Code Otp');
      return;
    }
                                   //Nanti aturlah buat base url nya ini modelan hardcode gini bakal ribet ganti2 nya lagi
    try {                           // jangan lupa /api/... adalah benar untuk routing nya
      const response = await axios.post(`${baseUrl.url}/register`, form); 
      if (response.data.success) {
        setShowMessage('Registrasi berhasil');
        console.log(response.data);
        alert('Anda Berhasil Daftar');
        navigation.navigate('LoginKurir');
        console.log(response.data)

      }else{
        setShowMessage('Kesalahan Kode Verifikasi');
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
          <Text style={{fontWeight:'500'}}> Silahkan Daftarkan Akun Terlebih Dahulu</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Nama"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nama', text)}
            value={form.nama}
          />
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('email', text)}
            value={form.email}
          />

          <View>
            <TextInput
              style={[styles.input, styles.form2]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={showPassword}
              value={form.password}
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
            value={form.nohp}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nohp', text)}
          />

<TextInput
              style={[styles.input, styles.form2]}
              value={form.code}
              // keyBoardType="numeric"
              placeholder="Masukkan kode verifikasi"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={(text) => handleInputChange('code', text)}
            />


        {/* <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Alamat"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nohp', text)}
          /> */}  
          {/* Bagian bottom */}
          <Button title="Daftar" color="#EDA01F"
          onPress={register}
  
          />
          {showMessage && <Text>{showMessage}</Text>}
            <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.akun}>
            Jika Memiliki Akun?
          </Text>
          </TouchableOpacity>

          <View>

{!countingDown ? (
    <TouchableOpacity onPress={sendCode} style={styles.buttonKirim}>
      <Text style={styles.buttonText}>Kirim OTP</Text>
    </TouchableOpacity>
  ) : (
    <Text style={styles.countdown}>Kirim Ulang ({countdownTime})</Text>
  )}
  {/* {showMessage && <Text style={isSuccessSend ? styles.messageSuccess : styles.messageError}>{showMessage}</Text>} */}

</View>
    
          {/* <TouchableOpacity onPress={handleLogin}> */}
          <View style={{marginTop:12}}>
            <Button title='Login' color="#EDA01F" onPress={handleLogin}/>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </View>

    </View>
    <Text style={{  backgroundColor: '#0B111F', padding: 10 }}>
        {/* Login button content */}
    </Text>
    </>
  )
}

const styles = StyleSheet.create({
  regisakun:{
    marginBottom:20
  },
  flexheader:{
    flex: 1, alignItems: 'center', justifyContent: 'center', 
    backgroundColor:'#EDA01F'
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

})