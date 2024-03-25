import { StyleSheet, Text, View,TextInput,COLORS,grey20,Button } from 'react-native'
import React from 'react'

export default function InputPesanan() {
  return (
    <View style={styles.container}>
        <View style={styles.headerinput}>
                <Text style={styles.text}>
                Cari Nama Barang, Alamat Tujuan, Jenis Paket, atau Kurir yang Ingin Dicek 
                </Text>
                        <View style={styles.form}>
                        <Text style={styles.text}>Nama Barang</Text>
                    <TextInput
                    style={[styles.input, styles.forminside]}
                    placeholder="Nama Barang"
                    // placeholderTextColor="black"
                    />
                     <Text style={styles.text}>Aalamat Tujuan</Text>
                     <TextInput
                    style={[styles.input, styles.forminside]}
                    placeholder="Aalamat Tujuan"
                    // placeholderTextColor="black"
                    />
    
    
                    
   
                    <Text style={styles.text}>Jenis Paket</Text>
                    <View style={styles.textAreaContainer}>
                                        <TextInput
                        style={[]}
                        placeholder="Jenis Paket"
                        multiline={true}
                        numberOfLines={4}
                    />
                    </View>
                    <Text style={styles.text}>Kurir</Text>
                    <TextInput
                    style={[styles.input, styles.forminside]}
                    placeholder="Kurir"
                    // placeholderTextColor="black"
                    />
                          <Button title="Submit" onPress={null}
        color="black"
        borderRadius="8"
        borderWidth="5"
        />
            
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textAreaContainer: {
        // borderColor: COLORS.grey20,
       borderRadius:2,
        padding: 5,
        width:300,
        marginBottom:10,
        borderWidth:1.2,
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
    text:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        marginBottom:10
    },
    container:{
        flex:1,
        backgroundColor:'#EDA01F'
    },

    headerinput:{
        backgroundColor:'white',
        padding:10,
        marginTop:10,
        borderRadius:4,
        // justifyContent:'center',
        // alignItems:'center',
        marginLeft:40,
        marginRight:40
    },

    forminside: {
        backgroundColor:'white',
        color:'black',
        marginTop:10,
        marginBottom:10,
        width:300
      },

      forminside1: {
        backgroundColor:'white',
        color:'black',
        marginTop:10,
        marginBottom:10,
        width:300,
 

      },
      input1: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color:'black',
        fontWeight:'bold',
        justifyContent:'center',

        alignItems:'center',
        textAlign:'center'

      },

      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color:'black',
        fontWeight:'bold',
        justifyContent:'center',


      },



})