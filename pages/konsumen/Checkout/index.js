import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Checkout() {
  return (
    <View style={styles.container}>
      <View style={styles.alamat}>
        <Text style={styles.text1}>Alamat Pengiriman ---> | </Text>
        <View style={styles.body}>
          <Text style={styles.text}>Delia Putri Andari</Text>
          <Text style={styles.text}>(+62)0895335992932</Text>
          <Text style={styles.text}>
            Jalan Asoy Geboy Blok Pinggir Jalan RT/RW 01/02 Cibaduyut KAB.Tanggerang Banten
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footer}>
          <Text style={styles.text1}>Produk Yang Dipesan</Text>
          <Text style={styles.text1}> PAKET CEPAT</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.button1}></Text>
          <View style={styles.button2}>
            <Text style={{ color: 'black' }}>PAKET CEPAT</Text>
          </View>
          <View style={styles.button3}>
            {/* icon here */}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.pembayaran}>METODE PEMBAYARAN</Text>
        </View>
        <View style={styles.footer1}>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>
          <Text style={styles.buttonbayar}></Text>
        </View>
      </View>

      <View style={styles.footer2}>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.harga}>Jumlah :</Text>
          <Text style={styles.harga}>Rp350.000</Text>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity>
            <Text style={styles.hargacheck}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkout: {
    alignItems: 'flex-end',
    marginRight: '5%',
  },
  hargacheck: {
    backgroundColor: '#EDA01F',
    padding: '2%',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
  },
  harga: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  footer1: {
    flexDirection: 'row',
    marginTop: '2%',
    // justifyContent: 'space-between',
  },
  footer2: {
    flexDirection: 'column',
    paddingBottom: '5%',
    backgroundColor: '#0B111F',
    borderRadius: 3,
    margin: '2%',
    borderColor: '#EDA01F',
    borderWidth: 4,
  },
  buttonbayar: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    width: '15%',
    padding: '1%',
    backgroundColor: 'white',
    borderRadius: 3,
    marginLeft: '5%',
  },
  pembayaran: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '2%',
    marginLeft: '5%',
  },
  button1: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    width: '5%',
    backgroundColor: 'white',
    borderRadius: 3,
    marginLeft: '5%',
  },
  button2: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    width: '55%',
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: '5%',
    padding: '10%',
    borderRadius: 5,
  },
  button3: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    width: '10%',
    backgroundColor: 'white',
    color: 'black',
    marginLeft: '9%',
    padding: '7%',
    borderRadius: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
  },
  alamat: {
    padding: '2%',
    backgroundColor: '#0B111F',
    borderRadius: 10,
    margin: '2%',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingBottom: '5%',
    backgroundColor: '#0B111F',
    borderRadius: 3,
    margin: '2%',
    borderColor: '#EDA01F',
    borderWidth: 4,
  },
});
