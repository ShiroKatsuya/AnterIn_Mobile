import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { baseUrl } from '../../baseUrl';

export default function Rating() {

    const [showMessage, setShowMessage] = useState(''); 
    const navigation = useNavigation();



    const [form, setForm] = useState({
        rating: '',
        saran: '',


    });

    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    }

    const kirimPesanan = async () => {
        if (!form.rating) {
            setShowMessage('Masukan Komentar');
            return;
        } else if (!form.saran) {
            setShowMessage('Masukkan Saran');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                rating: form.rating,
                saran: form.saran,
            };

            const response = await axios.post('http://192.168.100.56:8888/api/rating', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };




  return (
    <View style={styles.container}>
        <View style = {styles.form}>
            <Text style = {styles.text}>
                BERIKAN RATING ANDA
            </Text> 

            <View style= {styles.inputform}>
                    <TextInput
                        style={{ backgroundColor:'#EDA01F', color:'white', marginBottom:20 , height:50 , fontSize:20 , borderRadius:10}}
                        multiline
                        numberOfLines={4}
                        value={form.rating}
                        onChangeText={(text) => handleInputChange('rating', text)}
                    />
                            <Text style = {styles.text}>
                BERIKAN SARAN ANDA
            </Text> 
                           <TextInput
                        style={{ backgroundColor:'#EDA01F' , color :'white' , marginTop:20 , fontSize:15 , borderRadius:10 }}
                        multiline
                        numberOfLines={4}
                        value={form.saran}
                        onChangeText={(text) => handleInputChange('saran', text)}
                    />
                    <View style={{marginTop:10}}>

       
                      <Button
                        title="Submit"
                        // style={{marginTop:20}}
                        onPress={() => {
                            if (form.rating && form.saran) {
                                kirimPesanan();
                                alert('Data berhasil dikirim!');
                                navigation.navigate('Home');
                            } else {
                                alert('Harap lengkapi semua form sebelum submit');
                            }
                        
                        }}
                        color="black" 
                    />
                                 </View>
                    {showMessage && <Text>{showMessage}</Text>}

            </View>

        </View>

    </View>
  )
}

const styles = StyleSheet.create({

    submit:{
        alignSelf:'center',
        marginTop:20,
        padding:10,
        backgroundColor:'#EDA01F',
        borderRadius:5
    },

    textsubmit:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },

    inputform:{
        padding:10,
        // backgroundColor:'black',
        flexDirection:'column',
        justifyContent:'center',


        },

    text:{
        color:'black',
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold'

    },

    container:{
        flex :1,
        backgroundColor:'#EDA01F',
        padding:10
    },

    form:{
        padding:10,
        backgroundColor:'white',
        borderRadius:10,
        flex:1/2
    }


})