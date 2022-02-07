import React from 'react';
import {GameList} from '../src/PlayerScreens/SetupScreens/GameList';
import {GameDetails} from './GameDetails';
import {Button, Dimensions, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();

export const GameSelectStack = () => {
  return (
    <View style={{width: width}}>
      <Stack.Navigator initialRouteName="GameList">
        <Stack.Screen
          options={{headerShown: false}}
          name="GameList"
          component={GameList}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name="GameDetails"
          component={GameDetails}></Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};
