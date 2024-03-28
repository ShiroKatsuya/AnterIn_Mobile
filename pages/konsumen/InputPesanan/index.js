import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function InputPesanan() {
  const navigation = useNavigation();
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
          <View >
            <TextInput
              style={[styles.input, styles.forminside]}
              placeholder="Jenis Paket"
              // multiline={true}
              // numberOfLines={4}
            />
          </View>
          <Text style={styles.text}>Kurir</Text>
          <View style={styles.pilihkurir}>
            <TouchableOpacity onPress={() => navigation.navigate('Kurir')}>
              <View style={styles.logo}>
                <Text>Sicepat</Text>
              </View>
              </TouchableOpacity>
              
              <View style={styles.logo}>
                <Text>J&T</Text>
              </View>
              <View style={styles.logo}>
                <Text>Logo Here</Text>
              </View>
              <View style={styles.logo}>
                <Text>Logo Here</Text>
              </View>
              
          </View>
          <Text style={styles.text}>Kurir Yang Anda Pilih Adalah</Text>
          <View >
            <TextInput
              style={[styles.input, styles.forminside]}
              // placeholder="Kurir"
              // multiline={true}
              // numberOfLines={4}
            />
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
    backgroundColor:'#EDA01F',
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
});
