import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image,Dimensions, ViewComponent } from 'react-native';
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
            {/* <Text style = {styles.text}>
                BERIKAN RATING ANDA
            </Text>  */}
            <TextInput

                placeholder='Berikan rating anda pada pelayanan kami,agar kami dapat mengukur kualitas pelayanan kami'
                editable={false}
                multiline={true}
                style={{fontSize:15,textAlign:'center', width:400, alignSelf:'center'}}
            />

            <Rating
            ratingCount={5}
            startingValue={0}
            showRating
            onFinishRating={(rating) => handleInputChange('rating', rating)}
            style={{ paddingVertical: 10 }}
            value={form.rating}
/>

{/* 
            <View style= {styles.inputform}>
                    <TextInput
                        style={{ backgroundColor:'#EDA01F', color:'white', marginBottom:20 , height:50 , fontSize:20 , borderRadius:10}}
                        multiline
                        numberOfLines={4}
                        value={form.rating}
                        onChangeText={(text) => handleInputChange('rating', text)}
                    /> */}
                   

       
                      <TouchableOpacity
           
                        onPress={() => {
                            if (form.rating) {
                                kirimPesanan();
                                alert('Data berhasil dikirim!');
                                navigation.navigate('Home');
                            } else {
                                alert('Rating Tidak Boleh 0');
                            }
                        
                        }}
                
                    >
                        <View         style={styles.submit}>
                        <Text style={styles.textsubmit}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                                 </View>
                    {showMessage && <Text>{showMessage}</Text>}

            </View>


  )
}

const styles = StyleSheet.create({

    submit:{
        // alignSelf:'center',
        // marginTop:20,
        padding:10,
        backgroundColor:'#EDA01F',
        borderRadius:10,
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
        // width:100
        alignSelf:'flex-end',
        justifyContent:'center',
        // flex:1
        // width:100,
        paddingLeft:100,
        paddingRight:100,
        borderRadius:10,
        elevation:5,
        marginHorizontal:10,
        marginVertical:10

    },
    textsubmit:{
        color:'white',
        fontWeight:'bold',
        fontSize:17,
        textAlign:'center'

    },
    // submit1:{
    //     width:10
    // },

    textsubmit:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },

    inputform:{
        // padding:10,
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
        // padding:10,
        justifyContent:'center'
    },

    form:{
        padding:10,
        backgroundColor:'white',
        // borderRadius:10,
        flex:1,
        justifyContent:'center'
    }


})