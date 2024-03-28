import { StyleSheet, Text, View,Image,Button,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function TambahALamat() {
  return (
    //container
    <>
    <View style={styles.container}> 
      
    

      <View style={styles.form }>
      <Text style = {styles.text}>Lokasi Alamat</Text>
      <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Alamat Baru"
          // placeholderTextColor="rgba(255, 255, 255, 0.5)"
          
        //   value={username}
        //   onChangeText={setUsername}
        />
      
      <Text style={styles.text}>Detail Alamat</Text>
      <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Alamat Lengkap"
          // placeholderTextColor="rgba(255, 255, 255, 0.5)"
          
        //   value={username}
        //   onChangeText={setUsername}
        />
      <Text style = {styles.text}>Simpan Sebagai</Text>
      <View style={styles.tempat}>
        <TouchableOpacity>  
        <View style = {styles.rumah}>
        <Text >
        Rumah
        </Text>
        </View>
        </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.kantor}>
        <Text>
          Kantor
        </Text>
        </View></TouchableOpacity>
        
      </View>
      <TouchableOpacity>
      <View style= {{ marginTop:25 }}>
      <Button title="Tambah" onPress={null}
        color="black"
        borderRadius="8"
        borderWidth="5"
        />
        </View>
        </TouchableOpacity>
      
      </View>

    </View>
    </>
  )
}

const styles = StyleSheet.create({
text:{fontWeight:'bold'},
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
    alignItems: 'center', 
    flexDirection: 'column',
    
  },

  rumah:{
    fontSize : 20,
    color:'black',
    borderColor:'green',
    borderRadius:4,
    borderWidth:2,
    padding:5,
    paddingLeft:25,
    paddingRight:25,
    alignItems:'center',
    textAlign:'center',
    // fontWeight:'bold'
    fontWeight:'300'
    // backgroundColor:'black'
  },
  kantor:{
    fontSize : 20,
    color:'black',
    borderColor:'green',
    borderRadius:4,
    borderWidth:2,
    padding:5,
    paddingLeft:25,
    paddingRight:25,
    alignItems:'center',
    textAlign:'center',
    // fontWeight:'bold'
    fontWeight:'300'
    // backgroundColor:'black'
  },

  tempat:{
      flexDirection:'row',
      justifyContent: 'space-evenly',
      alignItems:'center', 
      paddingTop : 20,
      
      
  },  

  form:{
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop:40,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  
  form2: {
    backgroundColor:'white',
    color:'black',
    marginTop:10,
    marginBottom:10,
  },
input: {
  height: 40,
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  color:'black',
},
  
})