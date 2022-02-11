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
  const { setup } = useContext(AuthContext);

  console.log(setup)


  return (
    <Tab.Navigator>
      {/* default tab is always the first therefore if user needs setup screen, we slip that in first and hide the bars*/}
      {setup === false && < Tab.Screen
        name="setup"
        options={{ tabBarStyle: { display: "none" }, tabBarBadge: 1, headerShown: false }}
        component={SetupSlides}
      />}

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