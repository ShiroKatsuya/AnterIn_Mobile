import { View, TextInput, Button, StyleSheet,Text,TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import { Login, Dashboard, Daftar, Profile, Transaksi } from './pages/route';


export default function Login() {
    const navigation = useNavigation();

    const handleLoginPress = () => {
      navigation.navigate('MainTab'); // Navigate to the MainTab navigator
    };

    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
        <View style={styles.container}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../img/logo.png')}
            resizeMode="cover"
            style={{ width: 150, height: 150 }}
          />
        </View>
     
      
        <Text style = {styles.anter}>
                ANTER-IN
            </Text>
            <Text >
               Silahkan Login Aplikasi 
            </Text>
            <Text style={{marginBottom:4 }}>
            Terlebih Dahulu Untuk Antar Barang
            </Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, styles.form2]}
          placeholder="Nama atau Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          
        //   value={username}
        //   onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input,styles.form2]}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
      
        //   value={password}
        //   onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login"
        color="#EDA01F"
      
         />
         <TouchableOpacity onPress={()=>navigation.navigate('Daftar')}>
          <Text  style = {{marginBottom:20,marginTop:20}}>Daftar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.links}>
     
        <Text style={styles.link}>Lupa Password?</Text>
      </View>
    </View>

        </View>
        <TouchableOpacity onPress={handleLoginPress}>
      <Text style={{marginTop: 10, backgroundColor: '#0B111F', padding: 10}}>
        {/* Login button content */}
      </Text>
    </TouchableOpacity>
        </>

      );
}

const styles = StyleSheet.create({

    anter:{
        fontSize:20,
        fontWeight:'bold',

        color:'black'
    },  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    form: {
      width: 300,
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
    },

    form2: {
        backgroundColor:'black',
        color:'white'
      },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      },
    link: {
      color: '#000',
    
    },
  });