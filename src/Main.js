import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ActivityIndicator, View, Button} from 'react-native';
import {AuthContext} from './AuthStuff/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStuff/AuthStack';
import Dispatch from './Utils/Dispatch';

// import {Profile, LoginManager} from 'react-native-fbsdk-next';

export const Main = () => {
  const {user, silentGoogleLogin, loading, setLoading} =
    useContext(AuthContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  // const currentProfile = Profile.getCurrentProfile().then(function (
  //   currentProfile,
  // ) {
  //   if (currentProfile) {
  //     console.log(
  //       'The current logged user is: ' +
  //         currentProfile.name +
  //         '. His profile id is: ' +
  //         currentProfile.userID,
  //     );
  //   }
  // });

  useEffect(() => {
    AsyncStorage.getItem('withProvider').then(provider => {
      if (provider) {
        switch (provider) {
          case 'google':
            silentGoogleLogin();
            break;
          case 'facebook':
            console.log('from facebook');
            break;
        }
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator
          animating={true}
          size="large"
          style={{opacity: 1}}
          color="#999999"
        />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <Dispatch /> : <AuthStack />}
    </NavigationContainer>
  );
};
