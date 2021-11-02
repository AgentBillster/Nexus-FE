import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';

const Stack = createStackNavigator();

export default function GameSelectScreen() {
  return (
    <Stack.Navigator initialRouteName="AuthScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="AuthScreen"
        component={AuthScreen}></Stack.Screen>
      <Stack.Screen name="register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}
