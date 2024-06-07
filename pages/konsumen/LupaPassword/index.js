import { StyleSheet, Text, View,TextInput,Button, TouchableOpacity } from 'react-native'
// import React from 'react'

import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';


export default function LupaPassword() {

    const [email, setEmail] = useState('');


    const navigation = useNavigation();
    const [showMessage, setShowMessage] = useState(null);

    const [showAfterConfirm, setShowAfterConfirm] = useState('');

    const [form, setForm] = useState({
        email: '',
        // password: '',
        // confirmasipassword: ''
    });

    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    }

    const CheckEmail = async () => {
        if (!form.email) {
            setShowMessage('Masukkan Email');
            return;
        }
        // if (!form.password || !form.confirmasipassword) {
        //     setShowMessage('Masukkan password dan konfirmasi password');
        //     return;
        // }
        // if (form.password !== form.confirmasipassword) {
        //     setShowMessage('Password Tidak Sama');
        //     return;
        // }

        try {
            const response = await axios.put(`${baseUrl.url}/checkemail/${form.email}`, {
                // password: form.password,
                // confirmasipassword: form.confirmasipassword
            });
            setEmail(form.email);
            setShowMessage(response.data.message);
            // setShowAfterConfirm(null);
       
            // console.log(response.data.message);
            if (response.data.message === 'Email Ditemukan'){
                // navigation.navigate('TambahPasswordBaru',{
                //     email: email
                // });  
                setShowAfterConfirm('Apakah Email Ini Mau Password Baru ?');
        
            console.log(email);
            }


            // const interval = setInterval(() => {
            //     setShowAfterConfirm('Apakah Email Ini Mau Password Baru ?');
            // }, 0);

            if (response.data.message === 'Email Tidak Ditemukan'){
                setShowAfterConfirm(null);
                // clearInterval(interval);
            }
   

        } catch (error) {
            if (error.response) {
                setShowMessage(error.response.data.message);
            } else {
                setShowMessage('Error: Network Error');
            }
        }

    };


    // const getparamter = async () => {

    // }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Isikan Email Yang Benar Disini</Text>
                <TextInput
                    style={[styles.input, styles.form2]}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={form.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
                {/* <TextInput
                    style={[styles.input, styles.form2]}
                    placeholder="Password Baru"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry={true}
                    value={form.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                <TextInput
                    style={[styles.input, styles.form2]}
                    placeholder="Konfirmasi Password Baru"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry={true}
                    value={form.confirmasipassword}
                    onChangeText={(value) => handleInputChange('confirmasipassword', value)}
                /> */}
                <TouchableOpacity style={styles.button} onPress={CheckEmail}>
                    <View>
                        <Text style={styles.text2}>Check Email</Text>
                    </View>
                </TouchableOpacity>
                {showMessage ? <Text style={styles.text}>{showMessage}</Text> : null}
                <TouchableOpacity onPress={() => navigation.navigate('TambahPasswordBaru', {
                    email: email
                })}>
                {showAfterConfirm ? <Text style={styles.text}>{showAfterConfirm}</Text> : null}
                </TouchableOpacity>
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