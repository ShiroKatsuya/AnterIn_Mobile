import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Rating() {


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
                    />
                            <Text style = {styles.text}>
                BERIKAN SARAN ANDA
            </Text> 
                           <TextInput
                        style={{ backgroundColor:'#EDA01F' , color :'white' , marginTop:20 , fontSize:15 , borderRadius:10}}
                        multiline
                        numberOfLines={4}
                    />
        <TouchableOpacity>
            <View style={styles.submit}>
                    <Text style={styles.textsubmit}>
                        SUBMIT
                    </Text>
            </View>
            </TouchableOpacity>

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