import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, PermissionsAndroid, Dimensions,StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function KlasifikasiObjek  () {
    const navigation = useNavigation();
    const [cameraData, setCameraData] = useState(null);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
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
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
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
      
                }
            }
        });
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
                    <Text style={styles.textresul}>
                        Deskripsi : Barang Direkomendasikan ke Mobil
                    </Text>
                    <Text style={styles.textresul}>Percentase : 80%</Text>
                    <Text style={styles.textresul}>Nama : Kursi</Text>
                    <Text style={styles.textresul}>Klasifikasi : Berat</Text>
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Kirim Sekarang !</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    button:{
        marginTop: 15,
        backgroundColor: 'black',
        width: windowWidth * 0.3,
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
        height: windowWidth * 0.35,
        width: windowWidth * 0.35,
        marginTop : -60
    },
    txt:{
        fontWeight:'bold',
        fontSize: 20,
        marginTop : -60

    },
    img:{
        width:450 ,
        height: 400,
        borderRadius: 10,
        alignSelf:'center'
    }
})
