import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard() {
  const navigation = useNavigation();
    return (

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>
            Hello
        </Text>
        </TouchableOpacity>
      </View>
    );
  }


const styles = StyleSheet.create({})