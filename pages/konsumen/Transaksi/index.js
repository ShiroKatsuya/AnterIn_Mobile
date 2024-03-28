import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Transaksi() {
  const navigation =  useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.pilihpaket}>Pilih Paket yang Anda Mau:</Text>
      <View style={styles.cardPaket}>
        <View style={styles.cardPaket1}>
          <View style={styles.cardPaketChild}>
            <Image source={require('../../img/ikon-riwayatpesanan/limited.png')} style={styles.img1}></Image>
            <Text style={styles.textpaket}>Paket Standar</Text>
          </View>
          <View style={styles.cardPaketChild}>
          <Image source={require('../../img/ikon-riwayatpesanan/limited.png')} style={styles.img2}></Image>
            <Text style={styles.textpaket}>Paket Reguler</Text>
          </View>
        </View>
        <View style={styles.cardPaket2}>
          <View style={styles.cardPaketChild}>
          <Image source={require('../../img/ikon-riwayatpesanan/limited.png')} style={styles.img3}></Image>
            <Text style={styles.textpaket}>Paket Cepat</Text>
          </View>
        </View>
      </View>
      {/* Deskripsi Paket */}
      <View style={styles.paket}>
          <View>
            <Text style={styles.textpaket2}>1X</Text>
          </View>
          <View>
            <Text style={styles.textpaket1}>
            Paket Standar yang sangat mantap
            </Text>
          </View>
          <Text style={styles.textpaket1}>
              Rp35.000
          </Text>
          <View>
          </View>
      </View>
            {/* Checkout */}
      <View style={styles.checkout}>
        <View>
          <Text style={styles.textpaket4}>
                  Jumlah
          </Text>
          <Text style={styles.textpaket4}>
                 Rp350.000
            </Text>
        </View>
        <View style={styles.button}>
          <Text style={{color:'white' , fontWeight:'bold' ,justifyContent:'center' ,alignSelf:'center'}}>
            Checkout
          </Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img1:{
    height:50, width: 200, alignSelf: 'center',marginTop: -20
  },
  img2:{height:50, width: 200, alignSelf: 'center',marginTop: -20},
  img3:{height:50, width: 200, alignSelf: 'center',marginTop: -20},
  pilihpaket:{
    color:'black' ,
    marginTop:20 , 
    fontWeight:'bold',
    fontStyle:'italic' , 
    fontSize:19 , 
    marginLeft:20
  },
  button:{
    backgroundColor:'#EDA01F',
    padding:10,
    // width:110,
    alignSelf:'flex-end',
    marginTop: -30
  },
  checkout:{
    marginTop:30,
    backgroundColor:'#0B111F',
    padding:10,
     flex:1

  },
  paket:{
    backgroundColor:'#0B111F',
    padding:30,
    marginTop:480,
    // flex:1
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textpaket1:{
    color:'white',
    // textAlign:'center'
    padding:10
  },
  textpaket4:{
    color:'white',
    // textAlign:'center'
    // padding:
    // marginTop:-1000
      fontSize:20
  },
  textpaket2:{
    color:'white',
    // textAlign:'center'
    backgroundColor:'#EDA01F',
    padding:10,
    borderRadius:20,
    fontWeight:'bold'
  },
  textpaket:{
    color:'white',
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eda01f',
    // padding: 10,

  },
  cardPaket:{
    backgroundColor: '#0b111f',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom:40,
    marginLeft:10,
    marginRight:10
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
    color:'black'
  },
  cardPaketChild:{
    backgroundColor: '#000000',
    // marginBottom: 10,
    // flexDirection: 'row',
    flexDirection:'column',
    justifyContent:'space-around',
    // width: 10, 
    // height: 10, 
    borderRadius: 10,
    // color: 'white',
    // marginLeft:15,
    // marginRight: 15,
    // marginTop:30,
    // alignSelf:'center',
    marginLeft:10,
    marginTop:15,
    padding:40,
    // marginBottom:40
  }
})