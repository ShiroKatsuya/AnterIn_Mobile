import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image,  } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handlePasswordChange = (value) => {
      setPassword(value);
      if (value === '') {
        setError('Password Tidak Boleh Kosong');
      } else {
        setError('');
      }
    }


    const handleEmailChange = (value) => {
      setEmail(value);
      if (value === '') {
        setError('Email Tidak Boleh Kosong');
      } else {
        setError('');
      }
    }

    
    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role_id'); // Menyimpan role saat login
        if (token && role === '2') {
            navigation.navigate('MainTab');
        } else if (token) {
            navigation.navigate('KurirMaintab'); 
        }
    };


    const handleLoginPress = async () => {
      try {
          const formData = new FormData();
          formData.append('email', email);
          formData.append('password', password);
          formData.append('role_id', '2');
          const response = await axios.post(
              `${baseUrl.url}/login`,
              formData,
              {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              }
          );
  

  
          if (response.data.success && response.data.data.role_id === 2) {
              await AsyncStorage.setItem('token', response.data.data.token);
              await AsyncStorage.setItem('role_id', '2');
              navigation.navigate('MainTab');
              console.log(response.data);

          } else {
              setError('Username/Password Salah !');
          }
      } catch (error) {
          console.log('Username/Password Salah !');
  
          if (!email || !password) {
              setError('Username/Password Salah !');
          } else {
            setError('Username/Password Salah !');
          }
      }
  };




    return (
        <>  

            <View style={styles.headercontainer}>
              <View>
              <Text style={{ marginTop: 10, padding: 10, color:'black'}}>
              {error ? 'Username/Password Salah !' : null}
              {/* Username/Password Salah ! */}
          </Text>
              </View>
                <View style={styles.container}>
   
                    <View style={styles.foto}>
                        <Image
                            source={require('../../img/logo.png')}
                            resizeMode="cover"
                            style={styles.img}
                        />
                    </View>
                    <Text style={styles.anter}>
                        ANTER-IN
                    </Text>
                    <Text>
                        Silahkan Login Aplikasi
                    </Text>
                    <Text style={{ marginBottom: 4 }}>
                        Terlebih Dahulu Untuk Antar Barang
                    </Text>
                    <View style={styles.form}>
                        <TextInput
                            style={[styles.input, styles.form2]}
                            placeholder="Nama atau Email"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={email}
                            onChangeText={handleEmailChange}
                            // secureTextEntry={true}
                        />
                        <TextInput
                            style={[styles.input, styles.form2]}
                            placeholder="Password"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />
                        <Button
                            title="Login"
                            color="#EDA01F"
                            onPress={handleLoginPress}
                        />
                        <View style={styles.loginakun}>
                        <TouchableOpacity onPress={() => navigation.navigate('Daftar')}>
                            <Text style={styles.daftar}>Daftar</Text>
                        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('LoginKurir')}>
                        <Text style={styles.daftar} > Login Sebagai Kurir?</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('LupaPassword')}>
                    <View style={styles.links}>
                        <Text style={styles.link}>Lupa Password?</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ marginTop: 10, backgroundColor: '#0B111F', padding: 10 }}>
                {/* Login button content */}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    loginakun:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    foto: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    daftar: {
        marginBottom: 20,
        marginTop: 20
    },
    img: {
        width: 150,
        height: 150
    },
    headercontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    anter: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    form2: {
        backgroundColor: 'black',
        color: 'white'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    link: {
        color: '#000',
    },
});