import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Transaksi() {
  const navigation =  useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pilih Paket yang Anda Mau:</Text>
      <View style={styles.cardPaket}>
        <View style={styles.cardPaket1}>
          <View style={styles.cardPaketChild}>
          </View>
          <View style={styles.cardPaketChild}>
          </View>
        </View>
        <View style={styles.cardPaket2}>
          <View style={styles.cardPaketChild}>
          </View>
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
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: 'center',
    alignItems: 'center'
    
  },
  cardPaket1:{
    backgroundColor: '#0b111f',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight:'bold',
  },
  cardPaketChild:{
    backgroundColor: 'yellow',
    marginBottom: 10,
    flexDirection: 'row',
    width: 10, 
    height: 10, 
    borderRadius: 10,
    color: 'white',
    marginLeft:15,
    marginRight: 15,
    marginTop:30,
    padding: 55,
  }
})