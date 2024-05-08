import { StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
export default function TopUp() {
    const [number, onChangeNumber] = React.useState('');
    const [checkboxs, SetCheckbox] = useState({
        bri: false,
        bni: false,
        bca: false,
        cimb: false
    });

    const [showMessage, setShowMessage] = useState(null);
    const handleCheckboxChange = (bank) => {
        const updatedCheckboxes = { ...checkboxs };
        Object.keys(updatedCheckboxes).forEach((key) => {
            updatedCheckboxes[key] = key === bank;
        });
        SetCheckbox(updatedCheckboxes);
    };

    const navigation = useNavigation();

    const [form, setForm] = useState({
        amount: '',
        bank: checkboxs,
    });

    useEffect(() => {
        setForm(prevForm => ({
            ...prevForm,
            bank: checkboxs
        }));
    }, [checkboxs]);

    const kirimtopup = async () => {
        if (!form.amount) {
            setShowMessage('Masukan Jumlah Topup');
            return;
        }

        let selectedBank = Object.keys(checkboxs).find(key => checkboxs[key]);
        if (!selectedBank) {
            setShowMessage('Pilih Bank');
            return;
        }


        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                amount: form.amount,
                bank: selectedBank,
            };

            const response = await axios.post(`${baseUrl.url}/topup`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            
        if(form.amount && selectedBank){
            Alert.alert('TopUp Berhasil,Harap Lanjutkan Pembayaran')
            navigation.navigate('RiwayatTopUp')
            return;
        }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.amountcontainer}>
                <TextInput
                    placeholder='Input Amount Here'
                    style={styles.input}
                    value={form.amount}
                    onChangeText={(text) => setForm({ ...form, amount: text })}
                />
            </View>
            <View style={styles.bankcontainer}>
                {Object.keys(checkboxs).map((bank) => (
                    <View key={bank} style={styles.boxbank}>
                        <Text style={styles.banktext}>
                            {bank.toUpperCase()}
                        </Text>
                        <View style={styles.checkbutton}>
                            <CheckBox
                                disabled={false}
                                value={checkboxs[bank]}
                                onValueChange={() => handleCheckboxChange(bank)}
                            />
                        </View>
                    </View>
                ))}
            </View>
            <Button
                style={styles.button}
                onPress={kirimtopup}
            >
                <Text style={styles.buttontext}>TopUp Now !</Text>
            </Button>

            <View style={styles.alertmessage}>
            {showMessage && <Text>{showMessage}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alertmessage:{
        alignSelf:'center'
    },
    checkbutton:{
        // padding:5,
        // backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        // width:30,
        // height:30
        marginTop:-24
    },
    buttontext:{
        color:'white'
    },
    button:{
        backgroundColor:'black',
        // color:'white'
        borderRadius:3,
        margin:50,
        width:250,
        alignSelf:'center'
    },
    banktext: {
        color: 'black',
        textAlign:'center'
    },
    boxbank: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        width: 250,
        margin: 5, // Added margin for spacing between boxes
        alignContent:'center',
        // alignSelf:'center'
    },
    bankcontainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap', // Enable wrapping of children
        justifyContent: 'center'// Align children to the start of the main axis
    },
    amountcontainer:{
        marginTop:10
    },
    container:{
        flex:1,
        backgroundColor:'#EDA01F'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor:'black',
        backgroundColor: 'white', // Added background color for better style
        borderRadius: 5, // Added border radius for rounded corners
        fontSize: 16, // Increased font size for better readability
        color: 'black' // Set text color to black
      },
})