import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* Card Info */}
      <View style={styles.cardInfo}>
        <View style={styles.cardInfoRow}>
          <Image source={require('../../img/logo.png')} style={styles.logo} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Delia</Text>
            <Text style={styles.userPhone}>0895335992932</Text>
          </View>
        </View>
      </View>

      {/* Fitur Unggulan */}
      <Text style={styles.unggulanTitle}>Fitur Unggulan Kami</Text>

      {/* Card Fitur Unggulan */}
      <View style={styles.unggulanCard}>
        <View style={styles.unggulanRow}>
    
          <Image source={require('../../img/ikon-navigasi/checkout.png')} style={styles.unggulanText1} />
          <Image source={require('../../img/ikon-navigasi/order-history.png')} style={styles.unggulanText1}/>
          <Image source={require('../../img/ikon-navigasi/order-detail.png')} style={styles.unggulanText1}/>
          <Image source={require('../../img/ikon-navigasi/chat.png')} style={styles.unggulanText1}/>
          <Image source={require('../../img/ikon-navigasi/scan.png')} style={styles.unggulanText1}/>
        </View>
        <View style={styles.unggulanRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.unggulanText}>Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
            <Text style={styles.unggulanText}>Riwayat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pesanan')}>
            <Text style={styles.unggulanText}>Detail Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chatting')}>
            <Text style={styles.unggulanText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('KlasifikasiObjek')}>
            <Text style={styles.unggulanText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.unggulanArtikel}>Beberapa Rating atau Komentar</Text>
      <View style={styles.button}>
      <Text style={styles.text}>Semua</Text>
      {/* card rating dan komentar */}
     
      </View>

      <View style={{ }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardrating}>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Dalam proses pengiriman sangat cepat</Text>
          </View>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Terkadang Pengiriman Ngaret</Text>
          </View>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Lumayan Lah</Text>
          </View>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Kok lama ya pengirimannya ?</Text>
          </View>
          {/* tambah banyak */}
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Oke Siap Sampai Tujuan</Text>
          </View>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Mantul</Text>
          </View>
          <View style={styles.cardmessage}>
            <Text style={styles.cardratingteks}>Rizky</Text>
            <Text style={styles.cardratingteks}>Kurir ramah </Text>
          </View>
        </View>
        
      </ScrollView>
    </View>
    
    </View>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#EDA01F',
    padding: 10,
  },
  cardratingteks:{
    color:'white',
    marginTop:5,
    textAlign:'auto'
  },
  cardrating:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    
  },
  cardmessage:{
    backgroundColor: 'black',
    width: width * 0.2, 
    height: width * 0.2, 
    borderRadius: 7,
    color: 'white',
    padding: 10,
    marginRight: 10,
  },
  text:{
    // alignContent:'flex-start',
    textAlign:'center',
    fontSize:14,
    color:'white',
    justifyContent:'center',
    paddingTop:5
   
  },

  button:{
    width:100,
    backgroundColor:'blue',
    paddingBottom:10,
    color:'#0D53F4',
    alignItems:'center',
    textAlign:'center',
    marginTop:10,
    borderRadius:30,
    borderColor:'black', // Added border color
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 // Added border width
  },
  
  cardInfo: {
    backgroundColor: '#0B111F',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logo1: {
    width: 50,
    height: 100,
    marginRight: 10,
  },
  userDetails: {

  },
  userName: {
    fontWeight: 'bold',
    color: 'white',
  },
  userPhone: {
    fontWeight: 'bold',
    color: 'white',
  },
  unggulanTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  unggulanCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  unggulanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  unggulanText: {
    // backgroundColor: 'black',
    width: width * 0.1, 
    height: width * 0.1, 
    borderRadius: 7,
    color: 'black',
    // padding: 5,
    marginRight: 10,
    textAlign:'center',
    // justifyContent:'center',
    // alignItems:'center'
    marginTop:5,
  },

  unggulanArtikel:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginTop: 20,
  },

  unggulanText1: {
    backgroundColor: 'black',
    width: width * 0.1, 
    height: width * 0.1, 
    borderRadius: 7,
    color: 'white',
    // padding: 5,
    marginRight: 10,
    marginTop:40,
    padding: 20
 
  },
});

export default Dashboard;
