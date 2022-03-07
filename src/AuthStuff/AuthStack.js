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
  Dimensions,
} from 'react-native';
import { AuthContext } from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTabs } from '../Dispatch';
import LottieView from 'lottie-react-native';
import { transform } from '@babel/core';

/*
AuthStack is solely responisble for handling UI for what happens when the user is NOT signed in. 
Actual auth Logic is being handled inside of AuthProvider component and passed in via context api.
*/


AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (error, stores) => {
    stores.map((result, i, store) => {
      console.log({ [store[i][0]]: store[i][1] });
      return true;
    });
  });
});

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('screen');
const circleSize = width * 1.4

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
  // backgroundColor: "rgb(34,41,47)"
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden={true} />

      <View style={styles.circleAnimContainer}>
        <LottieView
          style={{ width: "100%", height: "100%", }}
          source={require("../assets/lottie/thing.json")}
          autoPlay
        />
      </View>

      <View style={styles.textContainer}>
        <Text>Sign in!</Text>
      </View>




      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            handleGoogleLogin();
          }}>
          <Text style={{ fontSize: 15, textAlign: "center", }}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, { backgroundColor: "rgb(58,87,155)" }]}
          onPress={() => {
            loginthing();
          }}>
          <Text style={{ fontSize: 15, textAlign: "center", color: "white" }}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>





      {/* <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.navigate('register');
        }}>
        <Text style={{ fontSize: 25 }}>Log in with Phone Number</Text>
      </TouchableOpacity> */}
    </View >
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

  buttonContainer: {
    width,
    height: height * 0.2,
    position: "absolute",
    bottom: height * .15,
    justifyContent: "space-around",
    alignItems: "center",
  },

  textContainer: {
    marginTop: 20
  },

  starsAnimContainer: {
    width,
    height: height * 0.35
  },

  circleAnimContainer: {
    height: height * 0.3,
    borderWidth: 1,
  },

  Button: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  // roundButton2: {
  //   marginTop: 20,
  //   width: 150,
  //   height: 150,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 10,
  //   borderRadius: 100,
  //   backgroundColor: '#ccc',
  // },
});
