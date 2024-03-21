import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image,rgba} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function Daftar() {
  const handlelogin=()=>{
    navigation.navigate('Dashboard')
}

  return (
    <>


const navigation = useNavigation();

  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../img/logo.png')}
            resizeMode="cover"
            style={{ width: 150, height: 150 }}
          />
        </View>

      <View style={{marginBottom:20}}>
        <Text style={styles.daftar}>DAFTAR AKUN</Text>
        <Text> Silahkan Daftarkan Akun Terlebih Dahulu</Text>
      </View>



      <View style={styles.form}>
        <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Nama"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
              <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
              <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
              <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Konfirmasi"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
        {/* bagian bottom */}
        <Button title="Daftar"
        color="#EDA01F"


         />
        <Text style={{marginTop:12 , color:(255, 255, 255, 0.5), }}>
          Jika Memiliki Akun?
        </Text>
      <View style={{marginTop:12}}>
        <Button title='Login' 
        onPress={handlelogin}
              color="#EDA01F"/>
          </View>
     
      </View>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
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

