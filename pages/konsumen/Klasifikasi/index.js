import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function KlasifikasiObjek() {
  return (
    <View style={styles.container}>
        <View style={styles.kamera}>
            <Text style={styles.kameratext}>KAMERA DISINI</Text>
        </View>

        <View style={styles.fotocontainer}>
            <View style={styles.foto}>
                
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
        alignSelf:'flex-end'

        
    },

    resultcontainer:{
        backgroundColor:'#FFFFFF',

        // alignContent:'center',
        // flexDirection:'row-reverse',
        padding:20,
        marginTop:10,
        borderRadius:20
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
            color:'black'

    },
    fotocontainer:{
        marginTop:15,
        backgroundColor:'#D9D9D9',
        padding:15,
        // paddingBottom:400
        // width:530
        borderRadius:10
    },
    foto:{
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        // alignContent:'center',
        flexDirection:'row-reverse',
        padding:90,
        paddingBottom:400,
        borderRadius:10
    },
    container: {
        flex: 1, 
        backgroundColor: '#EDA01F',
        padding: 10,
      },
      kamera:{
        justifyContent:'center',
        // alignContent:'center',
        flexDirection:'row-reverse',
        marginTop:40

      },
      kameratext:{
            fontWeight:'bold',
            fontSize:20,
            color:'black'
      }
})