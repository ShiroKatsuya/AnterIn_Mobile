import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Chatting() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.main}>
          <View style={styles.cardInfo}>
            <View style={styles.cardInfoRow}>
              <Image source={require('../../img/logo.png')} style={styles.logo} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>Delia</Text>
                <Text style={styles.text}>Hidup Seperti Lerry</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#EDA01F' }}>0812121313131</Text>
              </View>
            </View>
          </View>
          <View style={styles.resultcontainer}>
            <View style={styles.result1}>
              <Text style={styles.text}>Halo, maaf mengganggu Pekerjaan anda</Text>
            </View>
            <View style={styles.result2}>
              <Text style={styles.text}>Iya, ada apa kawanku?</Text>
            </View>
            <View style={styles.result3}>
              <Text style={styles.text}>Paketmu sudah sampai kocak, sini keluar</Text>
            </View>
          </View>
          <View style={styles.chatbar}>
            <TextInput
              style={[styles.input, styles.form2]}
              placeholder="Ketik Pesan"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"/>
            <View style={styles.buttonsend}>
              <Image source={require('../../img/Send-Message.png')} style={styles.sendbuttonicon}/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
text:{color: 'white'},
  resultcontainer: {
    flexDirection: 'column',
    marginTop: 40,
  },
  result1: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    marginRight: width * 0.30, 
  },
  result2: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginLeft: width * 0.30, 
    marginRight: 20,
    marginTop: 20,
  },
  result3: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginLeft: 20,
    marginRight: width * 0.30, 
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardInfo: {
    backgroundColor: '#0B111F',
    padding: 15,
  },
  cardInfoRow: {
    marginRight: 40,
    marginLeft: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
  },
  header: {
    marginTop: 15,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  main: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    height: 800,
  },
  chatbar: {
    marginRight: 20,
    marginLeft: 20,
    flex:1,
    marginTop:300,
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 400,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  form2: {
    backgroundColor:'#d9d9d9',
    color:'white'
  },
  buttonsend:{
    backgroundColor:'pink',
    width:40,
    height:40,
    justifyContent: 'space-between',
    marginLeft:10,
    borderRadius:100,
    alignItems: 'center',
  },
  sendbuttonicon:{
    width:40,
    height: 40,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  }
});