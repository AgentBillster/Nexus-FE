import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {AuthContext} from './AuthStuff/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStuff/AuthStack';
import {Dispatch, getFromStorage} from './Utils/HelperFunctions';

// import {Profile, LoginManager} from 'react-native-fbsdk-next';

export const Main = () => {
  const {user, handleGoogleLogin, loading, setLoading} =
    useContext(AuthContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  useEffect(() => {
    AsyncStorage.getItem('withProvider').then(provider => {
      if (provider) {
        switch (provider) {
          case 'google':
            handleGoogleLogin();
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
