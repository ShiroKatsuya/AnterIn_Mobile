import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, PermissionsAndroid, Dimensions, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
export default function KlasifikasiObjek() {
    const navigation = useNavigation();
    const [cameraData, setCameraData] = useState(null);
    const [Nama_Barang, SetNamaBarang] = useState(null);
    const [Deskription, SetDeskription] = useState(null);
    const [Dedection, SetDedection] = useState(null);

    // const [lebar,Setlebar]=useState(null)

    const [Lebar_cm, setLebar_cm] = useState(null);
    const [Tinggi_cm,setTinggi_cm]= useState(null);

    const [gagal,setGagal]=useState(null);


    const generateUniquePictureName = () => {
        return Math.random().toString(36).substring(2, 15);
    };


    

    const uploadPhoto = async (fileUri) => {
        try {
            let uniquePictureName = generateUniquePictureName();
            let formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                type: 'image/jpeg',
                name: uniquePictureName + '.jpg',
            });


            let response = await axios.post(
                `${baseUrl.url}/send-klasifikasi`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Upload berhasil:', response.data);
          
                let responseJson = response.data;
                SetNamaBarang(responseJson.response.Nama_Barang);
                SetDeskription(responseJson.response.Deskripsi);
                SetDedection(responseJson.response.Persentase);
                setGagal(responseJson.response.error)

                // Setlebar(responseJson.response.Lebar_cm)
                // SetDedection(responseJson.response.Tinggi_cm)

                setLebar_cm(responseJson.response.Lebar_cm);
                setTinggi_cm(responseJson.response.Tinggi_cm);
                // setgagal(responseJson.response.error)


            } else {
                console.error('Upload gagal. Status:', response.status, 'Data:', response.data);
            }
        } catch (error) {
            console.error('Kesalahan mengunggah file:', error);
        }
    };
    // console.log(Nama_Barang)
    const navigateToInputPesanan = () => {
        console.log('Navigating to InputPesanan with Lebar_cm ,Nama_Barang , Tinggi_cm:', Lebar_cm , Nama_Barang , Tinggi_cm);
        // Ensure Lebar_cm is sent as an object with the property `Lebar_cm`
        navigation.navigate('InputPesanan', { 
            data: { 
                Lebar_cm: Lebar_cm,
                Nama_Barang : Nama_Barang,
                Tinggi_cm: Tinggi_cm,
               
            } 
        }); 
    };
    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 1280, 
            maxHeight: 720, 
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('Dibatalkan');
            } else if (response.errorCode) {
                console.log(response.errorMessage);
            } else {
                const data = response.assets;
                console.log(data);
                setCameraData(data);

                if (data && data[0] && data[0].uri) {
                    uploadPhoto(data[0].uri);
                }
            }
        });
    };

    const requestCameraPermission = async () => {
        let granted;
        do {
        try {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                openCamera();
                break;
            } else {
                console.log('Camera permission denied, asking again...');
            }
        } catch (err) {
            console.warn(err);
            break;
        }
    } while (granted !== PermissionsAndroid.RESULTS.GRANTED);
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);
    return (
        <View style={styles.container}>
                     <TouchableOpacity onPress={openCamera}>
            <View style={styles.kamera}>
       
                    <Image source={require('../../img/camera.png')} style={styles.camera} />
                    <Text style={styles.txt}>Camera</Text>
       
            </View>
            </TouchableOpacity>
            <View style={styles.fotocontainer}>
                {cameraData && cameraData[0] && cameraData[0].uri && (
                    <View style={styles.foto}>
                        <Image source={{ uri: cameraData[0].uri }} style={styles.img} />
                    </View>
                )}
            </View>

            <View style={styles.resultcontainer}>
                <View style={styles.result}>
                    <Text style={styles.textresul}>Nama : {Nama_Barang}</Text>
                    <Text style={styles.textresul}>Klasifikasi : {Deskription}</Text>
                    <Text style={styles.textresul}>Percentase Detection Objek  : {Dedection}</Text>
      {/* <Text style={styles.textresul}>Lebar_cm  : {lebar}</Text> */}
                  {/* <Text style={styles.textresul}>Percentase Detection Objek  : {Dedection}</Text> */}

                    <Text style={styles.textresul}>Lebar : {Lebar_cm} cm</Text>
                    <Text style={styles.textresul}>Tinggi : {Tinggi_cm} cm</Text>
                    <Text style={styles.textresul}>{gagal}</Text>

                </View>
            </View>

                        <TouchableOpacity onPress={navigateToInputPesanan}>
                <View style={styles.button}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Kirim Sekarang !</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    button:{
        marginTop: 15,
        backgroundColor: 'black',
        // width: windowWidth * 0.3,
        padding: 8,
        alignSelf: 'flex-end',
        borderRadius: 5,
    },
    resultcontainer:{
        backgroundColor:'#FFFFFF',
        padding: 20,
        marginTop: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    result:{
        alignItems: 'center'
    },
    textresul:{
        fontWeight:'bold',
        fontSize: 16,
        color:'black',
    },
    fotocontainer:{
        marginTop: 15,
        backgroundColor:'#D9D9D9',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    foto:{
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1, 
        backgroundColor: '#EDA01F',
        padding: 10,
    },
    kamera:{
        justifyContent:'center',
        alignItems: 'center',
    },
    camera:{
        height: windowWidth * 0.50,
        width: windowWidth * 0.50,
        marginTop : -60
    },
    txt:{
        fontWeight:'bold',
        fontSize: 20,
        marginTop : -60
    },
    img:{
        width: windowWidth * 0.8,
        height: windowHeight * 0.3,
        // borderRadius: 10,

        alignSelf:'center'
    }
})
