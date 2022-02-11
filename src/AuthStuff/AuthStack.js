import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { AuthContext } from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTabs } from '../Dispatch';
// import {LoginManager} from 'react-native-fbsdk-next';
// import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

/*
AuthStack is solely responisble for handling UI for what happens when the user is NOT signed in. 
Actual auth Logic is being handled inside of AuthProvider component and passed in via context api.
*/

// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });

const Stack = createStackNavigator();

const AuthScreen = ({ navigation }) => {
  const { handleGoogleLogin, facebookLogin } = useContext(AuthContext);

  const loginthing = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar hidden={true} />

      <TouchableOpacity
        style={styles.Button1}
        onPress={() => {
          handleGoogleLogin();
        }}>
        <Text style={{ fontSize: 25 }}>Log in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button1}
        onPress={() => {
          loginthing();
        }}>
        <Text style={{ fontSize: 25 }}>Log in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button1}
        onPress={() => {
          navigation.navigate('register');
        }}>
        <Text style={{ fontSize: 25 }}>Log in with Phone Number</Text>
      </TouchableOpacity>
    </View>
  );
};



const Register = ({ navigation }) => {
  return (
    <View>
      <Text>i am a Register screen</Text>
      {/* <Button title="go to register" onPress={() => { navigation.navigate('login') }}></Button> */}
    </View>
  );
};

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="AuthScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="AuthScreen"
        component={AuthScreen}></Stack.Screen>
      <Stack.Screen name="register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  Button1: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  roundButton2: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
});
