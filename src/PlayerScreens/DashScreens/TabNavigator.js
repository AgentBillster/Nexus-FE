import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileTab } from './ProfileTab';
import { SetupSlides } from '../SetupScreens/SetupSlides';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import { SetupProvider } from "../SetupScreens/SetupProvider"


const Tab = createBottomTabNavigator();


function Somethingelse() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Home!</Text>
    </View>
  );
}

export const TabNavigator = () => {
  const { user } = useContext(AuthContext);

  if (user.setup === false) {
    return (
      <SetupSlides />
    );
  }


  return (
    <Tab.Navigator

    // screenOptions={({route}) => ({
    //   tabBarIcon: ({focused, color, size}) => {
    //     let iconName;

    //     if (route.name === 'Home') {
    //       iconName = focused
    //         ? 'ios-information-circle'
    //         : 'ios-information-circle-outline';
    //     } else if (route.name === 'Settings') {
    //       iconName = focused ? 'ios-list-box' : 'ios-list';
    //     }

    //     // You can return any component that you like here!
    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    //   tabBarActiveTintColor: 'tomato',
    //   tabBarInactiveTintColor: 'gray',
    // })}
    >
      <Tab.Screen
        name="profile"
        options={{ tabBarBadge: 1, headerShown: false }}
        component={ProfileTab}
      />
      <Tab.Screen
        name="somethingelse"
        options={{ tabBarBadge: 3, headerShown: false }}
        component={Somethingelse}
      />
    </Tab.Navigator>
  );
};
