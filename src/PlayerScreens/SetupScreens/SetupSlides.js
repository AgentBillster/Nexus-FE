import React, { useState, useContext, useEffect, useRef } from 'react';

import {
  StatusBar,
  FlatList,
  Text,
  View,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  ScrollView,
  TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { GameList } from './GameList';
import { AuthContext } from '../../AuthStuff/AuthProvider';
import ImgToBase64 from "react-native-image-base64"

export const SetupSlides = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const { user } = useContext(AuthContext);
  const [setupInfo, setSetupInfo] = useState({
    age: null,
    playerImage: null,
    playerName: null,
  });



  const createUser = () => {
    axios
      .post(`http://${"10.0.2.2"}:3000/player/createUser`, {
        id: user._id,
        setupInfo
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  };


  const getItemLayout = (data, index) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };


  const scrollToPage = index => {
    flatListRef.current.scrollToIndex({ index: index });
  };


  const WelcomeSlide = () => {
    return (
      <View style={styles.slideDiv}>
        <View style={styles.content}>
          <Text style={styles.slideHeader}>Welcome, Fuckhead</Text>
          <Text style={styles.subText}>
            Here your gonna blah blah but we need some basic information and what
            not yeah words words words yes.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => {
            scrollToPage(1);
          }}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AgeSlide = () => {
    // this component makes me hate life but it works
    const [arr, setArr] = useState(Array.from({ length: 84 }, (v, k) => k + 17));
    const [age, setAge] = useState();

    const scrollRef = useRef(null);
    const space = width * 0.5;

    const handleOnScroll = event => {
      setAge(Math.round(event.nativeEvent.contentOffset.x / space + 17.01));
    };

    return (
      <View style={styles.slideDiv}>
        <Text style={styles.slideHeader}>How old are you, </Text>

        <ScrollView
          ref={scrollRef}
          onScroll={handleOnScroll}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          snapToOffsets={[...Array(84)].map((x, i) => i * space)}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          snapToAlignment="center"
          snapToEnd={false}>
          {arr.map((item, index) => {
            return (
              <View key={index} style={styles.oof}>
                <Text>{item}</Text>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            scrollToPage(2);
            setSetupInfo({ ...setupInfo, age: age })
          }}
          style={styles.slideButton}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const ImageUploadSlide = () => {
    const [file, setFile] = useState();
    const [localuri, setLocaluri] = useState();

    const OpenImagePicker = async () => {
      await launchImageLibrary().then(res => {
        setLocaluri(res.assets[0].uri)
        ImgToBase64.getBase64String(res.assets[0].uri)
          .then(base64String => setFile(base64String))
          .catch(err => console.log(err));
      }).catch(err => { console.log(err) })
    };

    return (
      <View style={styles.slideDiv}>
        <Text style={styles.slideHeader}>upload a pic </Text>

        <TouchableOpacity onPress={OpenImagePicker}>
          <Image
            style={styles.upload}
            source={file ? { uri: localuri } : require('../../assets/PNGS/user.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSetupInfo({ ...setupInfo, playerImage: file })
            scrollToPage(3);
          }}
          style={styles.slideButton}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const UserNameSlide = () => {
    const [name, setName] = useState();

    const handleInput = e => {
      const { text } = e.nativeEvent;
      setName(text);
    };

    return (
      <View style={styles.slideDiv}>
        <Text style={styles.slideHeader}>first and last name </Text>

        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChange={e => handleInput(e)}
          value={name}
        />

        <TouchableOpacity
          onPress={() => {
            setSetupInfo({ ...setupInfo, playerName: name })
            createUser()
            scrollToPage(4);
          }}
          style={styles.slideButton}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const slides = [
    <WelcomeSlide />,
    <AgeSlide />,
    <ImageUploadSlide />,
    <UserNameSlide />,
    <GameList user={user} navigation={navigation} />
  ]


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ecf0f1',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList
        scrollEnabled={false}
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        renderItem={({ item }) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  oof: {
    borderColor: 'black',
    borderWidth: 1,
    width: width * 0.5,
    height: 200,
  },

  slideDiv: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    width: width * 0.9,
    borderWidth: 1,
    borderColor: 'black',
    height: height * 0.1,
  },
  slideHeader: {
    fontSize: RFPercentage(4.9),
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  subText: {
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
  },
  slideButton: {
    width: width - 30,
    padding: 15,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },

  upload: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 100,
  },
});
