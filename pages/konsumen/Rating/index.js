import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { baseUrl } from '../../baseUrl';
import { Rating, AirbnbRating } from 'react-native-ratings';
export default function BerikanRating() {

    const [showMessage, setShowMessage] = useState(''); 
    const navigation = useNavigation();



    const [form, setForm] = useState({
        rating: '',
        // saran: '',


    });

    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    }

    const kirimPesanan = async () => {
        if (!form.rating) {
            setShowMessage('Jumlah Rating');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const data = {
                rating: form.rating,
   
            };

            const response = await axios.post(`${baseUrl.url}/rating`, data, {
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

            <Rating
            ratingCount={7}
            startingValue={0}
            showRating
            onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>


            <View style= {styles.inputform}>
                    <TextInput
                        style={{ backgroundColor:'#EDA01F', color:'white', marginBottom:20 , height:50 , fontSize:20 , borderRadius:10}}
                        multiline
                        numberOfLines={4}
                        value={form.rating}
                        onChangeText={(text) => handleInputChange('rating', text)}
                    />
                   

       
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