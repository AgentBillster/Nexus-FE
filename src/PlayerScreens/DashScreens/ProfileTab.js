import React, { useContext } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../AuthStuff/AuthProvider';
const { width, height } = Dimensions.get('screen');

export const ProfileTab = () => {
  const { user } = useContext(AuthContext);


  const tabBarHeight = useBottomTabBarHeight();
  console.log(user);
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={[profileStyles.infoCont, { height: height * 0.45 - tabBarHeight }]}>

      </View>
      <View
        style={[
          profileStyles.historyCont,
          { height: height * 0.55 - tabBarHeight },
        ]}>

      </View>
    </View>
  );
};

const profileStyles = StyleSheet.create({
  infoCont: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#3F4080',

  },

  historyCont: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '',
  },
});
