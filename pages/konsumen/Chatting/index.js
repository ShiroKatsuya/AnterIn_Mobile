import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Chatting() {
  return (
    <View style={styles.container}>
            <View>

                <View style={styles.header}>


            
                <View style={styles.main}>
                          <View style={styles.cardInfo}>
            <View style={styles.cardInfoRow}>
              <Image source={require('../../img/logo.png')} style={styles.logo} />
              <View style={{flex: 1}}>
                <Text style={{color: 'white'}}>Delia</Text>
                <Text style={{color: 'white'}}>Hidup Seperti Lerry</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{color: '#EDA01F'}}>0812121313131</Text>
              </View>
            </View>
          </View>         
                    </View>
              
             
                </View>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardInfo: {
    backgroundColor: '#0B111F',
    padding: 20,


  },
  cardInfoRow: {
    marginRight: 40,
    marginLeft: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    container:{
        flex:1,
        backgroundColor:'#EDA01F',
        padding:10
    },
    header:{
      marginTop:15,
      backgroundColor:'black',
      padding:10,
      // paddingBottom:400
      // width:530
      borderRadius:10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    main:{
      backgroundColor:'#FFFFFF',

      marginTop:15,
      borderRadius:10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height:800
    },

})