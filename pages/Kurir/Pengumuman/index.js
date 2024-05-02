import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Pengumuman() {
  return (
    <View style={styles.container}>

      <View style={styles.boxmessage}>
        <View style={styles.information}>
            <View style = {styles.foto}>
            <Image
                    source={require('../../img/Pemberithuan.png')}
                    resizeMode="cover"
                    style={styles.img}
                />
                <View>
                <Text style={styles.info}>
           Pemberitahuan
                </Text>
                <Text style={styles.info}>
          By.Admin
                </Text>
                <Text style={styles.info}>
                5-2-2024
                </Text>
                <Text style={styles.info}>
                Migrasi server aplication to point 1.1...
                </Text>
                </View>
            </View>
            <View>
            <Text style={styles.info}>
              Selengkapnya
          </Text>
            </View>

       
        </View>
        
      </View>
      <View style={styles.boxmessage}>
        <View style={styles.information}>
            <View style = {styles.foto}>
            <Image
                    source={require('../../img/Pemberithuan.png')}
                    resizeMode="cover"
                    style={styles.img}
                />
                <View>
                <Text style={styles.info}>
           Pemberitahuan
                </Text>
                <Text style={styles.info}>
          By.Admin
                </Text>
                <Text style={styles.info}>
                5-2-2024
                </Text>
                <Text style={styles.info}>
                Migrasi server aplication to point 1.1...
                </Text>
                </View>
            </View>
            <View>
            <Text style={styles.info}>
              Selengkapnya
          </Text>
            </View>

       
        </View>
        
      </View>
      <View style={styles.boxmessage}>
        <View style={styles.information}>
            <View style = {styles.foto}>
            <Image
                    source={require('../../img/Pemberithuan.png')}
                    resizeMode="cover"
                    style={styles.img}
                />
                <View>
                <Text style={styles.info}>
           Pemberitahuan
                </Text>
                <Text style={styles.info}>
          By.Admin
                </Text>
                <Text style={styles.info}>
                5-2-2024
                </Text>
                <Text style={styles.info}>
                Migrasi server aplication to point 1.1...
                </Text>
                </View>
            </View>
            <View>
            <Text style={styles.info}>
              Selengkapnya
          </Text>
            </View>

       
        </View>
        
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
foto:{
    // backgroundColor:'white'
    flexDirection:'row',
    // width:70,
    // height:70
    alignItems: 'center',
  },
  img:{
    // width:'1%'
    width:50,
    height:50,
    marginRight:4
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
    alignContent:'center'
  },
  info: {
    color: 'white',
    fontWeight:'bold',
    fontSize:15
    
  },
  // leftInfo: {
  //   alignSelf: 'flex-start',
  // },
  // rightInfo: {
  //   alignSelf: 'flex-end',
  // },
  boxmessage: {
    backgroundColor: '#0B111F',
    padding: 10,
    marginTop: 10,
    borderRadius: 1,
    alignSelf: 'center',
    width: '90%', // Ensure the container is wide enough
    borderRadius:4
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    // justifyContent: 'center', // Center the content vertically
    // alignItems: 'center', // Center the content horizontally
  },
})
