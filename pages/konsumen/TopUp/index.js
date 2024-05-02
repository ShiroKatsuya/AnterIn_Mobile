import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'

export default function TopUp() {
    const [number, onChangeNumber] = React.useState('');
  return (
    <View style={styles.container}>
        <View style={styles.amountcontainer}>
            
        <TextInput
            placeholder='Input Amount Here'
            style={styles.input}
           />

   

        </View>
        <View style={styles.bankcontainer}>
            <View style={styles.boxbank}>
                <Text style={styles.banktext}>
                BRI
          
                </Text>
                <View style = {styles.checkbutton}>
                    
                    </View>
            </View>

            <View style={styles.boxbank}>
                <Text style={styles.banktext}>
              BNI
                </Text>
            </View>
            <View style={styles.boxbank}>
                <Text style={styles.banktext}>
             BCA
                </Text>
            </View>
            <View style={styles.boxbank}>
                <Text style={styles.banktext}>
              CIMB
                </Text>
            </View>
            
            
            
            


        </View>
        <Button
            // mode='contained'
            // onPress={() => console.log('TopUp Now!')}
            style={styles.button}
        >
           <Text style={styles.buttontext}>TopUp Now !</Text> 
            
        </Button>
      



     
    </View>
  )
}

const styles = StyleSheet.create({
    checkbutton:{
        // padding:5,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        width:30,
        height:30
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