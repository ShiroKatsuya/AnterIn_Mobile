// app.js
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Login, Dashboard, Daftar, Profile, Transaksi, Alamat, TambahALamat, KlasifikasiObjek, Chatting, Riwayat } from './pages/route'; 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const headerOption = {
  headerStyle: {
    backgroundColor: '#0B111F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};


function HeaderCustome(props) {
  return (
    <View>
      <Text>{props.children}</Text>
    </View>
  );
}

function MainTab() {
  const navigation = useNavigation(); 

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
    
        if (route.name === 'Home') {
          iconName = focused
            ? require('./pages/img/Home.png') // Ganti dengan path ke gambar aktif Anda
            : require('./pages/img/Home.png'); // Ganti dengan path ke gambar default Anda
        } else if (route.name === 'Transaksi') {
          iconName = focused
            ? require('./pages/img/Transaksi.png') // Ganti dengan path ke gambar aktif Anda
            : require('./pages/img/Transaksi.png'); // Ganti dengan path ke gambar default Anda
        } else if (route.name === 'Profile') {
          iconName = focused
            ? require('./pages/img/Profil-aktif.png') // Ganti dengan path ke gambar aktif Anda
            : require('./pages/img/Profil.png'); // Ganti dengan path ke gambar default Anda
        } else if (route.name === 'Profile') {
          iconName = focused
            ? require('./pages/img/Profil-aktif.png') // Ganti dengan path ke gambar aktif Anda
            : require('./pages/img/Profil.png'); // Ganti dengan path ke gambar default Anda
        } else if (route.name === 'Profile') {
          iconName = focused
            ? require('./pages/img/Profil-aktif.png') // Ganti dengan path ke gambar aktif Anda
            : require('./pages/img/Profil.png'); // Ganti dengan path ke gambar default Anda
        } 

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#eda01f',
      tabBarInactiveTintColor: '#0b111f',
    })}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
   
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Transaksi",
        }}
      />
  

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Profile",
        }}
      />
  
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "Halaman Login",
          }}
        />
        <Stack.Screen
          name="Daftar"
          component={Daftar}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "Daftar",
          }}
        />

        <Tab.Screen
                name="Alamat"
                component={Alamat}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Alamat",
                }}
              />
                <Tab.Screen
                name="TambahAlamat"
                component={TambahALamat}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Tambah Alamat",
                }}
              />
                   <Tab.Screen
                name="KlasifikasiObjek"
                component={KlasifikasiObjek}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Klasifikasi Objek",
                }}
              />
                               <Tab.Screen
                name="Chatting"
                component={Chatting}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Chatting",
                }}
              />

              <Tab.Screen
                name="Riwayat"
                component={Riwayat}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Riwayat Pesanan",
                }}
              />

        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;