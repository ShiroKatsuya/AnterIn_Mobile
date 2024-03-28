import { StyleSheet, Text, View, Image } from 'react-native';
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
    marginRight: width * 0.30, // Menggunakan persentase dari lebar layar
  },
  result2: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginLeft: width * 0.30, // Menggunakan persentase dari lebar layar
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
    marginRight: width * 0.30, // Menggunakan persentase dari lebar layar
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
});