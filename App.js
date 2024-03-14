// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Login,Dashboard } from './pages/route';




const Stack = createNativeStackNavigator();
const headerOption = {
  headerStyle: {
    backgroundColor: '#0B111F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function HeaderCustome(props){
  return(
    <View>
      <Text>
        {props.children}
      </Text>
    </View>
  )
}






function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
        options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />,
          title:"Halaman Login"
        }}
       />
        <Stack.Screen name="Dashboard" component={Dashboard} 
         options={{
          ...headerOption,
          HeaderCustome: (props) => <headerTitle {...props} />,
          title:"Login"

        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;