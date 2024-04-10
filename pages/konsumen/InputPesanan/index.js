import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputPesanan = ({ route }) => {
  const navigation = useNavigation();
  const [pilihPaket, setpilihPaket] = useState(route.params.pilih || {});
  const [pilihKurir, setpilihKurir] = useState(route.params.pilihkurir || {});
  const [pilihPaketData, setpilihPaketData] = useState({});

  useEffect(() => {
    setpilihPaket(route.params.pilih || {});
  }, [route.params.pilih]);

  useEffect(() => {
    setpilihKurir(route.params.pilihkurir || {});
  }, [route.params.pilihkurir]);


  useEffect(() => {
    if (pilihPaket && Object.keys(pilihPaket).length !== 0) {
      setpilihPaketData(pilihPaket);
    }
  }, [pilihPaket]);

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
          />
          <Text style={styles.text}>Alamat Tujuan</Text>
          <TextInput
            style={[styles.input, styles.forminside]}
            placeholder="Alamat Tujuan"
          />

          <Text style={styles.text}>Jenis Paket</Text>
          <View>
            <Text style={[styles.input, styles.forminside]}>
              {pilihPaketData.Nama_Paket}
            </Text>
            <Text style={styles.text}>Harga</Text>
            <Text style={[styles.input, styles.forminside]}>
              {pilihPaketData.Harga_Paket}
            </Text>
          </View>
          <Text style={styles.text}>Kurir</Text>
          <View style={styles.pilihkurir}>
            <TouchableOpacity onPress={() => navigation.navigate('Kurir')}>
              <View style={styles.logo}>
                <Image source={require('../../img/SiCepat.png')} style={styles.logo1} />
              </View>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={require('../../img/J&T.png')} style={styles.logo1} />
            </View>
            <View style={styles.logo}>
              <Image source={require('../../img/JNE.png')} style={styles.logo2} />
            </View>
            <View style={styles.logo}>
              <Text>Logo Here</Text>
            </View>
          </View>
          <Text style={styles.text}>Kurir Yang Anda Pilih Adalah</Text>
          <View>
            <Text style={[styles.input, styles.forminside]}>
              {pilihKurir.nama}
            </Text>
          </View>

          <Button title="Submit" onPress={null} color="black" />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  pilihkurir:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
    marginBottom:20

  },
  logo:{
    backgroundColor:'#ffffff',
    padding:20,
    borderRadius:5
  },

  textAreaContainer: {
    borderRadius: 2,
    padding: 5,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1.2,
  },
  textArea: {
    // height: 100,
    // justifyContent: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    paddingHorizontal: '5%', 
  },
  headerinput: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  form: {
    paddingHorizontal: '5%', 
  },
  forminside: {
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  logo1:{
    width:50,
    height: 10,
    borderRadius: 3,
    marginLeft: 3,
    alignSelf:'center',
  },
  logo2:{
    width:50,
    height: 20,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  }
});

export default InputPesanan