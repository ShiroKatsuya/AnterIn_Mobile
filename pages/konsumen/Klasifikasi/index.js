import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

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
                    Deskripsi : Barang Direkomendasikan ke Mobil
                </Text>
                <Text style={styles.textresul}>Percentase : 80%</Text>
                <Text style={styles.textresul}>Nama : Kursi</Text>
                <Text style={styles.textresul}>Klasifikasi : Berat</Text>
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
        backgroundColor: 'black',
        width: windowWidth * 0.3,
        padding: 8,
        alignSelf: 'flex-end',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    resultcontainer:{
        backgroundColor:'#FFFFFF',
        padding: 20,
        marginTop: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    result:{
        alignItems: 'center'
    },
    textresul:{
        fontWeight:'bold',
        fontSize: 16,
        color:'black',
    },
    fotocontainer:{
        marginTop: 15,
        backgroundColor:'#D9D9D9',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    foto:{
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        padding: 10,
        borderRadius: 10,
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
        alignItems: 'center',
    },
    camera:{
        height: windowWidth * 0.35,
        width: windowWidth * 0.35,
        marginTop : -60
    },
    txt:{
        fontWeight:'bold',
        fontSize: 20,
        marginTop : -60

    },
    img:{
        width:450 ,
        height: 450,
        borderRadius: 10,
        alignSelf:'center'
    }
})
