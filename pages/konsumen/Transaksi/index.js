import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Transaksi() {
  const navigation =  useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pilih Paket yang Anda Mau:</Text>
      <View style={styles.cardPaket}>
        <View style={styles.cardPaketChild}>
        </View>
        <View style={styles.cardPaketChild}>
        </View>
        <View style={styles.cardPaketChild}>
        </View>
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eda01f',
    padding: 20
  },
  cardPaket:{
    backgroundColor: '#0b111f',
    flexDirection: 'row',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight:'bold',
  },
  text1: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
    fontWeight:'bold',
  },
  cardPaketChild:{
    backgroundColor: 'grey',
    
    width: 0.1, 
    height: 0.1, 
    borderRadius: 7,
    color: 'white',
    // padding: 5,
    marginRight: 10,
    marginTop:40,
    padding: 20
  }
})