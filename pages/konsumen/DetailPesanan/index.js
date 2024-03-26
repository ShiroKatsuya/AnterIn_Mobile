import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailPesanan() {
  return (
    <View style={styles.container}>
      <View style={styles.alldescriptOrder}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#eda01f',
    flex: 1
  },
  alldescriptOrder:{
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
  }
})