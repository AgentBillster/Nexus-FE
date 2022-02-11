import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import localhost from 'react-native-localhost';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Platform } from 'react-native';
import { nodestuff } from "../../secrets"

export const AuthContext = React.createContext({});

GoogleSignin.configure({
  webClientId:
    '15426169653-rhbrmn7aosco5fn7julv7019ilu67m9e.apps.googleusercontent.com',
  offlineAccess: true,
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '15426169653-8pjq78dpmgi54k036dk6uun28s9ihb65.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});


export const AuthProvider = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [setup, setSetup] = useState(null);

  const validateUser = (token, provider) => {
    axios
      .post(`http://${nodestuff.net}:3000/auth/googleAuth`, {
        provider: provider,
        token: token,
        platform: Platform.OS,
      })
      .then(res => {
        setUser(res.data);
        setSetup(res.data.setup)
      })
      .catch(err => console.log(err + "node?"));
  };

  const handleGoogleLogin = async () => {
    const bool = await AsyncStorage.getItem('isAuthed');
    if (bool === 'true') {
      console.log("authed")

      await GoogleSignin.signInSilently().then(googUser => {
        validateUser(googUser.idToken, 'google')
      });
    } else {
      console.log('notelogged');
      await GoogleSignin.signIn()
        .then(googUser => {
          validateUser(googUser.idToken, 'google');
          const i = ['withProvider', 'google'];
          const k = ['isAuthed', 'true'];
          AsyncStorage.multiSet([i, k]);
        })
        .catch(error => {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('user cancelled login');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('user already logging in');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('no play services');
          } else {
            console.log(error);
          }
        });
    }
    setLoading(false);
  };

  // const handleGoogleLogin = async () => {
  //   await AsyncStorage.getItem('isAuthed').then(res => {
  //     if (res === 'true') {
  //       console.log('logged');
  //       GoogleSignin.signInSilently().then(googUser => {
  //         validateUser(googUser.idToken, 'google');
  //       });
  //     } else {
  //       console.log('notelogged');
  //       GoogleSignin.signIn()
  //         .then(googUser => {
  //           validateUser(googUser.idToken, 'google');
  //           const i = ['withProvider', 'google'];
  //           const k = ['isAuthed', 'true'];
  //           AsyncStorage.multiSet([i, k]);
  //         })
  //         .catch(error => {
  //           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //             console.log('user cancelled login');
  //           } else if (error.code === statusCodes.IN_PROGRESS) {
  //             console.log('user already logging in');
  //           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //             console.log('no play services');
  //           } else {
  //             console.log(error);
  //           }
  //         });
  //     }
  //   });
  //   setLoading(false);
  // };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        handleGoogleLogin,
        logout,
        setup,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
