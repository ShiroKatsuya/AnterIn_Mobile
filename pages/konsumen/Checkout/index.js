import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Checkout() {
  return (
    <View style={styles.container}>
      <View style={styles.alamat}>
        <Text style={styles.text1}>Alamat Pengiriman ---> | </Text>
        <View style={styles.body}>
          <Text style={styles.text}>Delia Putri Andari</Text>
          <Text style={styles.text}>(+62)0895335992932</Text>
          <Text style={styles.text}>Jalan Asoy Geboy Blok Pinggir Jalan RT/RW 01/02 Cibaduyut  KAB.Tanggerang Banten</Text>
        </View>

      </View>
      <View style={styles.footer}>
          <View style={styles.footer}>
            <Text style={styles.text1}>Produk Yang Dipesan</Text>
            <Text style={styles.text1}>  PAKET CEPAT</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
            <Text style={styles.button1}></Text>
            <View style={styles.button2}>
              <Text style={{color:'black'}}>PAKET CEPAT</Text>
            </View>
            <View style={styles.button3}>
                {/* icon here */}
            </View>
          </View>
      </View>
      <View style={styles.footer}>
          <View>
              <Text style={styles.pembayaran}> METODE PEMBAYARAN </Text>
          </View>
          <View style={styles.footer1}>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>

          </View>
      </View>

      <View style={styles.footer2}>
          <View style={{ marginTop:40}}>
          <Text style={styles.harga}>
              Jumlah : 
          </Text>
          <Text style={styles.harga}>
              Rp350.000 
          </Text>

          </View>
          <View style={styles.checkout}>
            <Text  style={styles.hargacheck }>  Bayar Sekarang</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkout:{
    alignItems: 'flex-end',
 
    // textAlign:'auto',
    marginRight:20,

  },
  hargacheck:{
    backgroundColor:'#EDA01F',
    padding:10,
    // width:10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
        textAlign:'center',
        borderRadius:10,
        alignContent: 'center',
        justifyContent: 'center',
      paddingRight:20
        
  },
  harga:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
        marginLeft: 30,
   
  },
  footer1:{
    flexDirection:'row',
    marginTop:20,
    justifyContent:'space-between',
    justifyContent:'center',
    alignItems:'center'

  },
  footer2:{
    flexDirection:'column',
    paddingBottom:40,
    backgroundColor: '#0B111F',
    borderRadius: 3,
    margin: 10,
    borderColor: '#EDA01F',
    borderWidth: 4,
  },
  buttonbayar:{
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
   width:60,
   padding:6,
    backgroundColor:'white',
    borderRadius: 3,
    marginLeft: 20,
    borderRadius:4,
    marginRight: 20,
  },
  pembayaran:{
      color:'white',
      fontWeight:'bold',
      fontSize:18,
      marginTop:10,
      marginLeft:10
  },
  button1:{
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
   width:30,
    backgroundColor:'white',
    borderRadius: 3,
    marginLeft: 20,
  },
  button2:{
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
   width:250,
    backgroundColor:'white',
    alignItems:'center',
    marginLeft: 20,
    padding: 80,
    borderRadius:5,
  },
  button3:{
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
   width:50,
    backgroundColor:'white',
    color:'black',
    marginLeft: 80,
    padding:35,
    borderRadius:40,
    // alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  alamat:{
    padding: 10,
    backgroundColor: '#0B111F',
    borderRadius: 10,
    margin: 10,

  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',



  },
  text1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
        marginLeft: 30,

  },
  body:{
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  },
  
  footer: {

    paddingBottom:40,
    backgroundColor: '#0B111F',
    borderRadius: 3,
    margin: 10,
    borderColor: '#EDA01F',
    borderWidth: 4,
  }
})

