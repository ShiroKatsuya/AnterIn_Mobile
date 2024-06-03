import { StyleSheet, Text, View,TextInput,Button, TouchableOpacity } from 'react-native'
// import React from 'react'

import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../../baseUrl';


export default function TambahPasswordBaru({route}) {

    const [email, setEmail] = useState(route.params.email || '');
    const [showMessage, setShowMessage] = useState('');
    useEffect(() => {
        if (route.params.email) {
            setEmail(route.params.email);
        }
    }, [route.params]);

    const [form, setForm] = useState({
        email: route.params.email || '',
        password: '',
        confirmasipassword: ''
    });

    const handleInputChange = (name, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const TambahPasswordBaru = async () => {
        if (!form.email) {
            setShowMessage('Masukkan Email');
            return;
        }
        if (!form.password) {
            setShowMessage('Masukkan Password Baru');
            return;
        }
        if (!form.confirmasipassword) {
            setShowMessage('Masukkan Konfirmasi Password Baru');
            return;
        }
        if (form.password !== form.confirmasipassword) {
            setShowMessage('Password dan Konfirmasi Password tidak sama');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl.url}/changepassword/${form.email}`, {
                email: form.email,
                password: form.password,
                confirmasipassword: form.confirmasipassword
            });
            console.log(response.data.message);

            // if (response.data.message === "Email Ditemukan") {
            //     console.log(response.data.message);
            // } else if (response.data.message === 'Email Tidak Ditemukan') {
            //     console.log(response.data.message);
            // }

        } catch (error) {
            if (error.response) {
                setShowMessage(error.response.data.message);
            } else {
                setShowMessage('Error: Network Error');
            }
        }
    }
    return (
        <View style={styles.container}>
    
          <View style={styles.form}>

          <Text style={styles.text}>Isikan Email Ynag Benar Disini</Text>
                            <TextInput
                                style={[styles.input, styles.form2]}
                                placeholder="Email"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={email}
                                // onChangeText={handleEmailChange}
                                // secureTextEntry={true}
                                onChangeText={(value) => handleInputChange('email', value)}
                                // editable={false}
                            />

<TextInput
                                style={[styles.input, styles.form2]}
                                placeholder="Password Baru"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={form.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                // secureTextEntry={true}
                            />

                            
<TextInput
                                style={[styles.input, styles.form2]}
                                placeholder="Konfirmasi Password Baru"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={form.confirmasipassword}
                                onChangeText={(value) => handleInputChange('confirmasipassword', value)}
                                // secureTextEntry={true}
                            />



            
    
    
            <TouchableOpacity style={styles.button} onPress={TambahPasswordBaru}>
                        <View>
                        <Text style={styles.text2}>Submit</Text>
                        </View>
                        </TouchableOpacity>


        {showMessage && <Text style={styles.text}>{showMessage}</Text>}
        
          </View>
          
        </View>
      )
    }
    
    const styles = StyleSheet.create({
    
        button:{
            backgroundColor:'#d3d3d3',
            padding:10,
            borderRadius:2,
            justifyContent:'center',
            alignItems:'center'
        },
    
        container:{
            flex:1,
            backgroundColor:'white',
            padding:20,
            justifyContent:'center',
            alignItems:'center'
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
            backgroundColor: 'black',
            color: 'white'
        },
        form: {
            width: 300,
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#2c2c2c',
        },
        text:{
            fontSize:15,
            fontWeight:'bold',
            marginBottom:10,
            color:'white'
        },
    
        text2:{
            fontSize:15 ,
            fontWeight:'bold',
            marginBottom:2,
            color:'black'
        }
    })
    