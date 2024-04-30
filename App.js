// app.js
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Login, Dashboard, Daftar, Profile, Transaksi, Alamat, TambahALamat, KlasifikasiObjek, Chatting, Riwayat, DetailPesanan, Checkout, InputPesanan, Kurir, rating, Rating, Maps, RajaOngkir, DaftarKurir, LoginKurir, HomeKurir, Pengumuman, Gaji, RiwayatPemesanan, MapsKurir, ChattingKonsumen, ProfileKurir, } from './pages/route'; 
import Icon from 'react-native-vector-icons/Ionicons';  

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MaintabKurir = createBottomTabNavigator();


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



function KurirMaintab() {
  const navigation = useNavigation(); 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#0B111F',
          position: 'absolute',
          borderTopWidth: 0,
          // fontWeight:3
          // fontSize:1,

          
          
        },
      })}
    >
      <MaintabKurir.Screen
        name="HomeKurir"
        component={HomeKurir}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props}  />, 
          title:"Home Kurir",
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Home.png')} style={{ width: 45, height: 45, tintColor: color }} />
          ),


        }}
      />
            <MaintabKurir.Screen
        name="ProfileKurir"
        component={ProfileKurir}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props}  />, 
          title:"Profile",
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Home.png')} style={{ width: 45, height: 45, tintColor: color }} />
          ),


        }}
      />


<MaintabKurir.Screen
        name="Pengumuman"
        component={Pengumuman}
        options={{
   
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title:"Pengumuman",
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Rating.png')} style={{ width: 45, height: 45, tintColor: color }} />
          )

        }}
      />
      
    </Tab.Navigator>
  );
}


{/* <Stack.Screen>
    KurirMaintab()
</Stack.Screen>
 */}




function MainTab() {
  const navigation = useNavigation(); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarStyle: {
          // height: 90,
          // paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#0B111F',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
 
        name="Home"
        component={Dashboard}
        options={{
          ...headerOption,
          headerTitle: (props) => <HeaderCustome {...props} />,
          title : "Home" ,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Home.png')} style={{ width: 60, height: 60, tintColor: color }} />
          )
        }}
      />
{/* 
<Tab.Screen
 
 name="HomeKurir"
 component={HomeKurir}
 headerShown={true}
 options={{
   ...headerOption,
   headerTitle: (props) => <HeaderCustome {...props} />,
   title : "Home" ,
   tabBarLabel: 'Home',
   tabBarIcon: ({ color }) => (
     <Image source={require('../AnterIn/pages/img/Home.png')} style={{ width: 60, height: 60, tintColor: color }} />
   )
 }}
/> */}


           <Tab.Screen
        name="Rating"
        component={Rating}
        options={{
   
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title:"Rating",
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Rating.png')} style={{ width: 45, height: 45, tintColor: color }} />
          )

        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props}  />, 
          title:"Checkout Sekarang !",
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Cart.png')} style={{ width: 60, height: 60, tintColor: color }} />
          )
        }}
      />

  

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />, 
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Image source={require('../AnterIn/pages/img/Profil.png')} style={{ width: 60, height: 60, tintColor: color }} />
          )
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
            title: "Daftar Sebagai Kurir",
          }}
        />

{/* <Stack.Screen
          name="HomeKurir"
          component={HomeKurir}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "Home Kurir",
          }}
        />  */}

<Stack.Screen
          name="LoginKurir"
          component={LoginKurir}
          options={{
            ...headerOption,
            HeaderCustome: (props) => <headerTitle {...props} />, 
            title: "Login Sebagai Kurir",
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
                            <Tab.Screen
                name="Gaji"
                component={Gaji}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Gaji",
                }}
              />
                <Tab.Screen
                name="RiwayatPemesanan"
                component={RiwayatPemesanan}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "List Pemesanan Konsumen",
                }}
              />
                            <Tab.Screen
                name="MapsKurir"
                component={MapsKurir}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Maps Kurir",
                }}
              />
                                        <Tab.Screen
                name="ChattingKonsumen"
                component={ChattingKonsumen}
                options={{
                  ...headerOption,
                  HeaderCustome: (props) => <headerTitle {...props} />, 
                  title: "Message",
                }}
              />
                <Stack.Screen
          name="KurirMaintab"
          component={KurirMaintab}
          options={{ headerShown: false }} 
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