import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../baseUrl';
export default function DaftarKurir() {
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
            // onChangeText={(text) => handleInputChange('nama', text)}
          />
          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            // onChangeText={(text) => handleInputChange('email', text)}
          />

          <View>
            <TextInput
              style={[styles.input, styles.form2]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              // onChangeText={(text) => handleInputChange('password', text)}
              // secureTextEntry={showPassword}
            />
            <TouchableOpacity >
              {/* <Text style={{ backgroundColor: 'red', padding: 7, borderRadius: 10, alignSelf: 'flex-end', textAlign: 'center', color: 'white', fontSize: 10, marginTop: -6, marginBottom: 3 }}>
                {showPassword ? 'Show Password' : 'Hide Password'}
              </Text> */}
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, styles.form2]}
            placeholder="No.Hp"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            // onChangeText={(text) => handleInputChange('nohp', text)}
          />

          <Button title="Daftar" color="#EDA01F"
          //  onPress={() => {
          //      if ( form.nama && form.email && form.password && form.nohp) {
          //          register()
          //          alert('Anda Berhasil Daftar');
          //          navigation.navigate('Login');
             
          //      } else {
          //          alert('Harap lengkapi semua form sebelum submit');
          //      }
          //  }}
  
          />
          {/* {showMessage && <Text>{showMessage}</Text>} */}
  
          <Text style={styles.akun}>
            Jika Memiliki Akun?
          </Text>
    
          {/* <TouchableOpacity onPress={handleLogin}> */}
          <View style={{marginTop:12}}>
            <Button title='Login' color="#EDA01F"/>
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