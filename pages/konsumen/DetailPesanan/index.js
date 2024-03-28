import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailPesanan() {
  return (
    <View style={styles.container}>
            <View style={styles.form1 }>
            <Text style = { styles.texttop}>Alamat Pengirim</Text>
            <Text style = { styles.texttop}>Delia Putri Andari</Text>
            <Text style = { styles.texttop}>(089-533-599-2932)</Text>
            <Text style = { styles.texttop2}>Jalan Raya RT004/RW007 Lohbener Kab. Indramayu Jawa Barat 45161</Text>
            <Text style ={{flexDirection:'row',justifyContent:'flex-end'}}>|</Text>
            </View>
            <View style={styles.form2 }>
            <Text style = {styles.textrow}>Subtotal</Text>
            <Text style = {styles.textrow}>SubtotalPengiriman</Text>
            <Text style = {styles.textrow}>BiayaLayanan</Text>
            <Text style = {styles.textrow}>TotalPesanan</Text>
            <Text style = {styles.textrow}>MetodePembayaran</Text>
            </View>
    <View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  texttop:{fontWeight:'bold',color: 'black', fontSize: 15},
  texttop2:{fontWeight:'bold',color: 'black',fontSize: 14 ,marginTop: 20},
  textrow:{fontWeight:'bold',color: 'black',},
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
    alignItems: 'center', 
    flexDirection: 'column',
  },
  form1:{
    width: 500,
    padding: 20,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop:40,
    flexDirection:'column',
    justifyContent:'flex-start'
    
  },
  form2:{
    width: 500,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'gray',
    flexDirection:'column',
    justifyContent:'flex-start'
  },
})
