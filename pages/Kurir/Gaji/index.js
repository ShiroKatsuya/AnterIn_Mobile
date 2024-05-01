import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Gaji() {
  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Text>Gaji</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDA01F',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    box: {
        // flex: 1,
        backgroundColor: '#0B111F',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 100,
        // marginLeft: 100,
        // marginRight: 100,
        borderRadius: 3,
    }
})

