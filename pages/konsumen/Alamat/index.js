import { StyleSheet, Text, View,Image,Button,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Alamat() {

    const navigation = useNavigation();
    const handleTambahAlamat=()=>{
        navigation.navigate('TambahAlamat')
    }
    
  return (
    // Container
    <View style={styles.container}>
    <TouchableOpacity onPress={handleTambahAlamat}>
      <View style={styles.alamat}>
        <Text style={styles.textalamat}>
            Tambah Alamat
        </Text>
      </View>
      </TouchableOpacity>
      {/* CardForm */}
      <View style={styles.form}>
        <Text style={styles.cardtext}>ALamat Lengkap : </Text>
        <View>
        <Text style={styles.cardtext}>Jl. Lohbener Lama No.08, Legok, Kec. Lohbener, Kabupaten Indramayu, Jawa Barat 45252</Text>
        </View>
        {/* Button Edit dan Hapus */}
        <View style={styles.button}>
            {/* <View >
                    <Text style={{color:'black'}}>
                        Hapus
                    </Text>
            </View> */}
            <View style={styles.button}>
            <View style={styles.button2}>
                <Text style={{color:'white'}}>
                    Edit
                </Text>
                </View>
                
    
        </View>
        <View style={styles.button}>
            <View style={styles.button1}>
                <Text style={{color:'white'}}>
                    Hapus
                </Text>
                </View>
                
    
        </View>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDA01F',
        padding: 10,
        alignItems: 'center', 
        flexDirection: 'column',
        
      },
      button1:{
        backgroundColor:'red',
        padding:10,
        borderRadius:5,
        paddingLeft:40,
        paddingRight:40,
 

      },

      button2:{
        // backgroundColor:'green',
        padding:10,
        borderRadius:5,
     backgroundColor:'#EBBC42',
        paddingLeft:50,
        paddingRight:50,

      },
    
      button:{
        // display:'flex',
        flexDirection:'row-reverse',
        alignContent:'flex-end',
        // justifyContent:'space-around'
        paddingLeft:20,
        marginTop:20,
        alignItems:'center',
        marginRight:1
    
      },
      cardtext:{
        fontWeight:'bold',
        fontSize:15,
        color:'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      alamat:{
        alignItems:'center',
        marginTop:20,
        backgroundColor:'black',
        borderRadius:5,
        padding:10,
        paddingLeft:100,
        paddingRight:100
    
   
      },
      textalamat:{
        fontWeight:'bold',
        fontSize:15,
        color:'white'
      },
      form:{

            borderWidth:2,
            borderRadius:15,
            borderColor:'black',
            width:400,
            padding:20,
            backgroundColor:'white',
            justifyContent:'center', 
            marginTop:40,
        //    marginLeft:50
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,



            
      }
      
})