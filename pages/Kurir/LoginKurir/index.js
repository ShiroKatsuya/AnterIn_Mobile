import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image,error } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../baseUrl';
export default function LoginKurir() {
  const navigation = useNavigation();
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
            <Text style={{fontWeight:'500'}}>
                Silahkan Login Aplikasi
            </Text>
            <Text style={{ marginBottom: 4 , fontWeight:'500'}} >
                Terlebih Dahulu Untuk Antar Barang
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={[styles.input, styles.form2]}
                    placeholder="Nama atau Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    // value={email}
                    // onChangeText={handleEmailChange}
                    // secureTextEntry={true}
                />
                <TextInput
                    style={[styles.input, styles.form2]}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    // value={password}
                    // onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    color="#EDA01F"
                    // onPress={handleLoginPress}
                />
                <View style={styles.loginakun}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarKurir')}>
                    <Text style={styles.daftar}>Daftar</Text>
                </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.daftar} > Login Sebagai Konsumen?</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.links}>
                <Text style={styles.link}>Lupa Password?</Text>
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
    justifyContent: 'center',
    backgroundColor:'#EDA01F'
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
})