import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

export const AuthContext = React.createContext({});

GoogleSignin.configure({
  webClientId:
    '15426169653-rhbrmn7aosco5fn7julv7019ilu67m9e.apps.googleusercontent.com',
  offlineAccess: true,
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

export const AuthProvider = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  8;

  const VerifyAndFetch = (token, provider) => {
    axios
      .post('http://192.168.1.148:3000/auth/login', {
        provider: provider,
        token: token,
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.signIn().then(googUser => {
        VerifyAndFetch(googUser.idToken, 'google');
        AsyncStorage.setItem('withProvider', 'google');
      });
      setLoading(false);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('user already logging in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('no play services');
      } else {
        console.log(error);
      }
    }
  };

  const silentGoogleLogin = async () => {
    try {
      await GoogleSignin.signInSilently().then(googUser => {
        VerifyAndFetch(googUser.idToken, 'google');
      });
      setLoading(false);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        setLoading(false);
      } else {
        console.log('something else happened');
      }
    }
  };

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
        googleLogin,
        silentGoogleLogin,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
