// app.js
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Login, Dashboard, Daftar, Profile, Transaksi, Alamat, TambahALamat, KlasifikasiObjek, Chatting, Riwayat, DetailPesanan, Checkout, InputPesanan, Kurir, rating, Rating, Maps, RajaOngkir, DaftarKurir, LoginKurir, } from './pages/route'; 


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
        let sizes = 30;

        if (route.name === 'Home') {
          iconName = focused
            // ? 'ios-information-circle'
            // : 'ios-information-circle-outline';
        } else if (route.name === 'Transaksi') {
          iconName = focused 
          // ? 'ios-list' : 'ios-list-outline';
        }else if (route.name=='Profile'){
                    iconName = focused 
                    // ? 'ios-list' : 'ios-list-outline';
        }else if (route.name == 'Rating'){
          iconName = focused 
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={sizes} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
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
        name="Rating"
        component={Rating}
        options={{
   
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Rating",
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Checkout Sekarang !",
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
    name="RajaOngkir"
    component={RajaOngkir}
    options={{
      ...headerOption,
      HeaderCustome: (props) => <headerTitle {...props} />, 
      title: "Raja Ongkir",
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

<Stack.Screen
          name="DaftarKurir"
          component={DaftarKurir}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "DaftarKurir",
          }}
        />

<Stack.Screen
          name="LoginKurir"
          component={LoginKurir}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "DaftarKurir",
          }}
        />
        
<Tab.Screen
        name="InputPesanan"
        component={InputPesanan}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Input Pesanan",
        }}
      />
  

        <Tab.Screen
                name="Kurir"
                component={Kurir}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "List Rekomendasi Kurir",
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
              
              <Tab.Screen
                name="Maps"
                component={Maps}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Open Maps",
                }}
              />
                       <Tab.Screen
                name="DetailPesanan"
                component={DetailPesanan}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Detail Pesanan",
                }}
              />
                      <Tab.Screen
                name="Checkout"
                component={Checkout}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Checkout Pesanan",
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