import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
          <Text style={styles.unggulanText1}>Chat</Text>
          <Text style={styles.unggulanText1}>Riwayat</Text>
          <Text style={styles.unggulanText1}>Pesanan</Text>
          <Text style={styles.unggulanText1}>Checkout</Text>
          <Text style={styles.unggulanText1}>Scan</Text>
        </View>
        <View style={styles.unggulanRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.unggulanText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
            <Text style={styles.unggulanText}>Riwayat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pesanan')}>
            <Text style={styles.unggulanText}>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.unggulanText}>Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.unggulanText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.unggulanArtikel}>Beberapa Rating atau Komentar</Text>
      <View style={styles.button}>
      <Text style={styles.text}>Semua</Text>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the entire screen
    backgroundColor: '#EDA01F',
    padding: 10,
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
  userDetails: {
    // No styles needed here for now
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
    fontWeight: 'bold',
    color: 'black',
    alignItems:'center',
   
  },

  unggulanArtikel:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginTop: 20,
  },

  unggulanText1: {
    fontWeight: 'bold',
    backgroundColor:'black',
    color: 'black',
    alignItems:'center',
    paddingBottom:20,
    borderRadius:10

    
 
  },
});

export default Dashboard;
