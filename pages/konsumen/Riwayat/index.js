import { StyleSheet, Text, View,Dimensions} from 'react-native'
import React from 'react'

export default function Riwayat() {



  return (
    <>
    <View style={styles.container}>

      {/* <Text>Riwayat</Text> */}
    <View style={{marginBottom:40}}>
    </View>
      <View style={styles.header}>
        <Text style={styles.text}>
            Semua
        </Text>
        <Text style={styles.text}>
            Sedang Dikirim
        </Text>
        <Text style={styles.text}>
            Sudah Dikirim
        </Text>
        <Text style={styles.text}>
            Selesai
        </Text>

      </View>
        {/* search */}
      <View style={styles.search}>
        <Text style={{color:'black'}}>
                Cari nama produk yang dipesan
        </Text>

      </View>

      {/* daftarposes */}

      <View style={styles.proses}>


        <Text style={styles.textproses}>
                Produk yang Sedang Dipesan
        </Text>

        <View style={styles.jenispaket}>
            <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>
                LOGO HERE
            </Text>
            <Text style={{textAlign:'center',color:'white' ,marginTop:30 , fontWeight:'bold'}}>
                PAKET CEPAT
            </Text>
        </View>
        <View style={styles.produkproses}>
        <Text style={styles.textproses}>
                Paket yang Sedang Diproses
        </Text>
        <Text style={styles.textdetail}>
             Cek detail disini
        </Text>
        </View>
      </View>




    </View>
    </>
  )
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    produkproses:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    jenispaket:{
        backgroundColor:'#000000',
        padding:20,
        width:230,
        paddingBottom:50,
        marginTop:20,
        marginLeft:40,
        borderRadius:30


    },

    proses:{
        marginTop:20,
        backgroundColor:'#0B111F',
        padding:10,
        paddingBottom:25,
        borderColor:'black', // Added border color
        borderWidth:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontWeight:'bold',
        borderRadius:10
    
    },
    textproses:{
        color:'white',
        fontWeight:'bold',
        // marginRight :10,
        marginLeft:20,
        marginTop:20,
        // marginRight:40
        
    },
    textdetail:{
        color:'white',
        fontWeight:'bold',
        // marginRight :10,
        marginLeft:20,
        marginTop:20,
        marginRight:40,
        backgroundColor:'#EDA01F',
        padding:10,
        borderRadius:10,
        textAlign:'center'
    },
    
    
    search:{
        backgroundColor:'white',
        marginTop:20,
        padding:10,
        borderRadius:8
    },

    container:{
        flex:1,
        backgroundColor:'#EDA01F',
        padding:10

    },

    header:{
        flexDirection: 'row',
        alignItems: 'center',

        // width: width * 0.4, 
        // height: width * 0.4, 

        justifyContent:'space-between',
        // marginTop:'20',

        
    }   ,


    text:{
    //   borderRadius:1099999,
       backgroundColor:'white',
       padding:10,
       borderRadius:2,
       color:'black',
    //    paddingLeft:10,
    //    paddingRight:10
    width:120,
    textAlign:'center',
    borderColor:'black', // Added border color
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontWeight:'bold'


    }

})