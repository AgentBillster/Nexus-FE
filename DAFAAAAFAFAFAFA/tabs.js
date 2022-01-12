import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import {AuthContext} from './AuthProvider';
import HomeStack from './HomeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tabs = createBottomTabNavigator();

const Search = () => {
  return (
    <View>
      <Text>poop</Text>
    </View>
  );
};

export const Setup = () => {
  const {logout, user} = useContext(AuthContext);
  console.log(user);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>made it</Text>

      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen name="Search" component={Search} />
      </Tabs.Navigator>
    </View>
  );
};
