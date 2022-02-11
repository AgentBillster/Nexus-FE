import React, { useContext } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import { Dots } from '../../assets/Icons';
import { transform } from '@babel/core';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');




export const ProfileTab = () => {
  const { user } = useContext(AuthContext);


  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={profileStyles.imageContainer}>
        <Image style={profileStyles.img} source={{ uri: user.avatar }} />

        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgb(27,34,47)']}
          locations={[0.4, 1]}
          style={{
            width: width,
            zIndex: 2,
            opacity: 1,
            height: height * 0.45
            // transform: [{translateY: }],
          }} />

        <View style={profileStyles.imageContainerItems}>
          <View style={profileStyles.imageContainerIcon}>
            <Dots width={"50%"} height={"50%"} />
          </View>

          <View style={profileStyles.imageContainerInfo}>
            <View>
              <Text style={{ fontSize: RFPercentage(5), color: "white" }}>RECKLESS</Text>
              <Text style={profileStyles.realname}>William Wilson</Text>
            </View>
            <View>
              <Image
                style={{ width: 75, height: 75 }}
                source={require('../../assets/PNGS/logo.png')}
              />
            </View>
          </View>

        </View>



      </View>

      <View
        style={[
          profileStyles.historyCont,
          { height: height * 0.50 - tabBarHeight },
        ]}>
      </View>
    </View>
  );
};

const profileStyles = StyleSheet.create({
  imageContainer: {
    height: height * 0.45,
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: '#3F4080',
    alignItems: "center",
  },

  imageContainerItems: {
    height: height * 0.45,
    position: "absolute",
    zIndex: 2
  },

  imageContainerInfo: {
    flexDirection: "row",
    width: width * 0.85,
    justifyContent: "space-between",
    marginTop: "auto",
    transform: [{ translateY: -50 }]
  },

  imageContainerIcon: {
    backgroundColor: "white",
    height: height / 15,
    width: height / 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: '90deg' }]

  },



  historyCont: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '',
  },

  img: {
    width: '100%',
    height: '100%',
    position: "absolute"
  },




});
