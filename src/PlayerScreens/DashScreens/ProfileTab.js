import React, { useContext } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import { Dots } from '../../assets/Icons';
import { transform } from '@babel/core';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');

const IMAGE_HEIGHT = height * 0.40


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
            height: IMAGE_HEIGHT
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

      <View style={profileStyles.statCont}>
        <View style={profileStyles.metricBoxes}><Text style={profileStyles.statText}>23W</Text></View>
        <View style={profileStyles.metricBoxes}><Text style={profileStyles.statText}>2L</Text></View>
        <View style={profileStyles.metricBoxes}><Text style={profileStyles.statText}>89.52%</Text></View>
      </View>

      <View
        style={[
          profileStyles.historyCont,
          { height: height * 0.49 - tabBarHeight },
        ]}>

        {/* <View style={profileStyles.cardCont}> */}
        <CardSmall />
        <CardSmall />
        {/* </View> */}

        {/* <View style={profileStyles.cardCont}> */}
        <CardLong />
        {/* </View> */}

      </View>
    </View>
  );
};






const CardSmall = () => {
  return (
    <View style={profileStyles.cardSmall}>

    </View>
  )
}

const CardLong = () => {
  return (
    <View style={profileStyles.cardLong}>

    </View>
  )
}

const profileStyles = StyleSheet.create({
  imageContainer: {
    height: IMAGE_HEIGHT,
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: '#3F4080',
    alignItems: "center",
  },

  imageContainerItems: {
    height: IMAGE_HEIGHT,
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

  statCont: {
    flexDirection: "row",
    marginTop: 0
  },

  metricBoxes: {
    // borderRightWidth: 1,
    borderWidth: 1,
    width: width / 3,
    alignItems: "center",
  },

  statText: {
    color: "white",
    fontSize: RFPercentage(4.5),
  },

  historyCont: {
    borderWidth: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  },

  cardSmall: {
    backgroundColor: "whitesmoke",
    width: width * 0.55,
    height: "40%",
    borderRadius: 6,
    margin: "3%"
  },

  cardLong: {
    backgroundColor: "whitesmoke",
    width: width * 0.3,
    height: "86.5%",
    borderRadius: 6,
    margin: "2%"
  },

  img: {
    width: '100%',
    height: '100%',
    position: "absolute"
  },

});
