import React, {useContext} from 'react';
import {View, Text, StatusBar, StyleSheet, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {AuthContext} from '../../AuthStuff/AuthProvider';

const {width, height} = Dimensions.get('screen');

export const ProfileTab = () => {
  const {user} = useContext(AuthContext);

  if (user.setup === false) {
    return (
      <SetupProvider>
        <PlayerSetup />
      </SetupProvider>
    );
  }

  const tabBarHeight = useBottomTabBarHeight();
  console.log(user);
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={[profileStyles.infoCont, {height: height * 0.3 - tabBarHeight}]}>
        <Text></Text>
      </View>
      <View
        style={[
          profileStyles.historyCont,
          {height: height * 0.7 - tabBarHeight},
        ]}>
        {/* // match history stuff */}
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
