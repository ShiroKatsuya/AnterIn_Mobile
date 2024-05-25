import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FormInput } from 'react-native';
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
    code:'',

  });



  // const [showMessage, setShowMessage] = useState(null);
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countingDown, setCountingDown] = useState(false);

  const [showMessage, setShowMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(true);

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
    navigation.navigate('Login');
  }

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
    } else if (!form.code) {
      setShowMessage('Kode Verifikasi Salah / Belum Diinput');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl.url}/register`, form);
      if (response.data.success) {
        setShowMessage('Registrasi berhasil');
        console.log(response.data);
        alert('Anda Berhasil Daftar');
        navigation.navigate('Login');
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
          <Text> Silahkan Daftarkan Akun Terlebih Dahulu</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Nama"
            value={form.nama}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('nama', text)}
          />
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Email"
            value={form.email}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(text) => handleInputChange('email', text)}
          />

          <View>
            <TextInput
              style={[styles.input, styles.form2]}
              placeholder="Password"
              value={form.password}
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
            value={form.nohp}
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

          <TextInput
              style={[styles.input, styles.form2]}
              value={form.code}
              // keyBoardType="numeric"
              placeholder="Masukkan kode verifikasi"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={(text) => handleInputChange('code', text)}
            />


          <Button title="Daftar" color="#EDA01F"
           onPress={register}
  
          />
          {showMessage && <Text>{showMessage}</Text>}
  
          <Text style={styles.akun}>
            Jika Memiliki Akun?
          </Text>
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
          {/* {showMessage && <Text>{showMessage}</Text>} */}
    
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

