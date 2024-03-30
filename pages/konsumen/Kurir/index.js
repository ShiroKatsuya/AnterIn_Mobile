import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Kurir() {
  return (
    <View style={styles.container}>
            <View style={styles.cardInfo}>
        <View style={styles.cardInfoRow}>
          <Image source={require('../../img/logo.png')} style={styles.logo} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Rizky Sulaeman</Text>
            <Text style={styles.userPhone}>0895335992932</Text>

          </View>
        </View>
        <View style={styles.Pilih}>
    
            <Text style={styles.text}>Pilih Disini</Text>
            </View>
            <Text style={styles.rating}>Icon Bintang</Text>
      </View>
      
    </View>
    
    
  )
}

const styles = StyleSheet.create({
  rating:{
    color:'white',
    fontWeight:'900',
    // marginTop:1

  },
  Pilih:{
    alignSelf:'flex-end',
    flexDirection:'row',
    backgroundColor:'#EDA01F',
    padding:8,
    borderRadius:8
  },
  text:{
    color:'white',
    fontWeight:'900',

  },
  container:{
    flex:1,
    backgroundColor:'#EDA01F',
    padding:10
  },
  cardInfo: {
    backgroundColor: '#0B111F',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  userDetails: {

  },
  userName: {
    fontWeight: 'bold',
    color: 'white',
  },
  userPhone: {
    fontWeight: 'bold',
    color: 'white',
  },
})