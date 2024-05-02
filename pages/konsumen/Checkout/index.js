import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Checkout() {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const [dataPribadi,setDataPribadi]=useState({});
  const [ambilData, data] = useState([]);
  const [showMessage, setShowMessage] = useState(''); 
  const [pilih, setpilih] = useState(null);

  const [form, setForm] = useState({
    status: '',});

const handlePilih = (item) => {
  setpilih(item);
};

const handleCheckout = async () => {
  if (pilih) {
    console.log("Checkout dengan paket:", pilih);
    try {
      await tambahStatus();
      navigation.navigate('Riwayat');
      console.log("Status Sudah Dibayar");
    } catch (error) {
      console.error("Gagal:", error);
    }
  } else {
    console.log("Pilih paket terlebih dahulu!");
  }
};

useEffect(() => {
  // getDataUserLocal();
}, [dataPribadi.token]);


const tambahStatus = async () => {
  if (!pilih || !pilih.id) {
    throw new Error("Paket atau ID tidak valid.");
  }

  try {
    const token = await AsyncStorage.getItem('token');
    const data = {
      status: "Sudah Dibayar",
    };

    const response = await axios.put(`http://192.168.161.77:8888/api/inputpesanan/${pilih.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response.data);
    return response.data; // Mengembalikan data yang diperbarui jika perlu
  } catch (error) {
    console.error("Gagal memperbarui status:", error);
    throw error; // Melempar kembali kesalahan untuk penanganan di luar fungsi
  }
};




  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios({
          url: 'http://192.168.161.77:8888/api/datauser',
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        });
        setData(response.data["data"]);
        
      //  //lu cobain dulu dah console.log ada kgk datanya 
        console.log(response.data)


      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios({
            url: 'http://192.168.161.77:8888/api/riwayatpesanan',
            headers: {
              Authorization: `Bearer ${token}`
            },
            method: "GET"
          });
          data(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [dataPribadi.token]);



  return (

    <View style={styles.container}>
      {Data && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alamat Pengirim : {Data.alamat} <Text style={{ fontSize: 30 }}> →</Text> | </Text>
        <View style={styles.addressBody}>
          <Text style={styles.addressText}>Nama : {Data.nama}</Text>
          <Text style={styles.addressText}>No.hp : {Data.nohp}</Text>
        </View>
      </View>
           )}
      <View style={styles.section2}>
        <FlatList
          data={ambilData.filter(item => item.status === "Belum Dibayar")}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePilih(item)}>
            <View>
              <View style={styles.subSection}>
                <Text style={styles.sectionTitle}>Produk Yang Dipesan</Text>
                <Image source={require('../../img/ikon-riwayatpesanan/limited.png')} style={styles.iconLimited}/>
              </View>
              <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                  <Image source={require('../../img/ikon-riwayatpesanan/limited.png')} style={styles.iconLimited}/>
                  <Text style={styles.orderPackText}>{item.Nama_Paket}</Text>
                </View>
                <View style={styles.buttontrash}>
                  <Image source={require('../../img/Trashcan.png')} style={styles.deleteButton} />
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      

      <View style={styles.section1}>
        <Text style={styles.paymentMethod}>METODE PEMBAYARAN</Text>
        <View style={styles.paymentLogos}>
          <Image source={require('../../img/Logo-Dana.png')} style={styles.paymentLogo} />
          <Image source={require('../../img/Logo-BNI.png')} style={styles.paymentLogo} />
          <Image source={require('../../img/Logo-CIMB.png')} style={styles.paymentLogo} />
          <Image
            source={require('../../img/Logo-Sponsor-Liga-terbaik-Dunia-Akhirat.png')}
            style={styles.paymentLogo}
          />
        </View>
      </View>

      <View style={styles.checkoutSection}>
        <View style={styles.priceContainer}>
        {pilih && (
          <Text style={styles.priceText}>Nama Paket : {pilih.Nama_Paket}</Text>
        )}
        {pilih && ( 
          <Text style={styles.priceText}>Harga : {pilih.Harga_Paket}</Text>
          )}
        </View>
        <View style={styles.checkoutButton}>
          <TouchableOpacity onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDA01F',
    padding: 10,
  },
  section: {
    backgroundColor: '#0B111F',

    borderRadius: 10,
    marginBottom: 10,
    padding: 10,


  },
  section2: {
    backgroundColor: '#0B111F',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    paddingBottom:40,

  },
  section1: {
    backgroundColor: '#0B111F',
    borderRadius: 10,
    marginBottom: 50,
    padding: 10,
    marginTop: 5,
    // flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    marginRight: 40,
    
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingBottom:30,
    paddingTop:30,
    alignSelf:'flex-start',
    marginRight:300
    
  },
  buttonlist: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    padding:10,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  buttontrash: {
    backgroundColor: '#eda01f',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    padding:0.1,
    // marginHorizontal: 5,
    // paddingVertical: 10,
    borderRadius: 100,
    justifyContent:'flex-end',
    
  },
  orderPackText: {
    color: '#eda01f',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  paymentMethod: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 5
  },
  paymentLogos: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  paymentLogo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: 3,
    marginLeft: 5,
    backgroundColor:'#EDA01F'
  },
  checkoutSection: {
    backgroundColor: '#0B111F',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    // flex:1
  },
  priceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    alignItems: 'flex-end',
    // marginTop: -40,
    marginBottom: 20
  },
  checkoutButtonText: {
    backgroundColor: '#EDA01F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  deleteButton: {
    width:70,
    height: 70,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  },
  iconLimited: {
    width:180,
    height: 30,
    borderRadius: 3,
    marginLeft: 5,
    alignSelf:'center',
  }
});