import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

export default function KlasifikasiObjek() {
  return (
    <View style={styles.container}>
        <View style={styles.kamera}>
        <Image source={require('../../img/camera.png')} style={styles.camera}/>
        <Text style={styles.txt}>Camera</Text>
        </View>

        <View style={styles.fotocontainer}>
            <View style={styles.foto}>
                <Image source={require('../../img/Kursi.png')} style={styles.img}/>
            </View>
        </View>
            <View style={styles.resultcontainer}>
                <View style={styles.result}>
                    <Text style={styles.textresul}>
                    Deskripsi : Barang Direkmendasikan ke Mobil   </Text>
                    <Text style={styles.textresul}>Percentase : 80%</Text>
                   <Text style={styles.textresul}>Nama : Kursi</Text>
                   <Text style={styles.textresul}>Klarifikasi : Berat </Text>
                </View>
            </View>
            <TouchableOpacity>
            <View style={styles.button}>
                    <Text style={{color:'white',textAlign:'center'}}>Kirim Sekarang !</Text>
                </View>
                </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    button:{
        marginTop: 15,
        display: 'flex',
        backgroundColor: 'black',
        width: 120,
        padding: 8,
        alignSelf:'flex-end',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


        
    },

    resultcontainer:{
        backgroundColor:'#FFFFFF',

        // alignContent:'center',
        // flexDirection:'row-reverse',
        padding:20,
        marginTop:10,
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    result:{
        flexDirection:'column',
        // justifyContent:'center',
        // alignContent:'center',
        alignItems:'center'
    },
    textresul:{
            fontWeight:'bold',
            fontSize:20,
            color:'black',
            

    },
    fotocontainer:{
        marginTop:15,
        backgroundColor:'#D9D9D9',
        padding:15,
        // paddingBottom:400
        // width:530
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignContent: 'space-between',

    },
    foto:{
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        // alignContent:'center',
        flexDirection:'row-reverse',
        padding:0.1,
        paddingBottom:0.1,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    container: {
        flex: 1, 
        backgroundColor: '#EDA01F',
        padding: 10,
      },
      kamera:{
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'column',
        alignItems: 'center',

      },
      kameratext:{
            fontWeight:'bold',
            fontSize:20,
            color:'black'
      },
      img:{
        width: 670,
        height: 800,
        borderRadius:10,
      },
      camera:{
        height:150,
        width:150,
        marginTop: -30
      },
      txt:{
        fontWeight:'bold',
        fontSize: 20,
        marginTop: -40
      }
})