import React, { useState, useContext, useEffect, useRef } from 'react';
import localhost from 'react-native-localhost';

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
import { GameSelectStack } from '../../../DAFAAAAFAFAFAFA/GameSelectStack';
import { SetupContext } from './SetupProvider';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameList } from './GameList';

export const SetupSlides = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

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
          }}
          style={styles.slideButton}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const ImageUploadSlide = () => {
    const [file, setFile] = useState();

    const OpenImagePicker = async () => {
      await launchImageLibrary().then(res => {
        setFile(res.assets[0].uri);
      });
    };

    return (
      <View style={styles.slideDiv}>
        <Text style={styles.slideHeader}>upload a pic </Text>

        <TouchableOpacity onPress={OpenImagePicker}>
          <Image
            style={styles.upload}
            source={file ? { uri: file } : require('../../assets/PNGS/user.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            scrollToPage(3);
          }}
          style={styles.slideButton}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const UserNameSlide = () => {
    const [userName, setUsername] = useState();
    const [isAvailable, setIsAvailable] = useState(null);
    const [timeLeft, setTimeleft] = useState();
    let intervalRef = useRef();

    useEffect(() => {
      intervalRef.current = setTimeout(() => {
        timeLeft >= 1 ? setTimeleft(prev => prev - 1) : null;
      }, 1000);

      if (timeLeft === 0) {
        axios
          .post(`http://${"10.0.2.2"}:3000/player/isNameAvailable`, {
            username: userName,
          })
          .then(res => {
            setIsAvailable(res.data);
          });
        clearTimeout(intervalRef.current);
      }

      return () => clearTimeout(intervalRef.current);
    }, [timeLeft]);

    const handleInput = e => {
      const { text } = e.nativeEvent;
      setUsername(text);
      setTimeleft(2);
    };

    return (
      <View style={styles.slideDiv}>
        <Text style={styles.slideHeader}>display name </Text>

        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChange={e => handleInput(e)}
          value={userName}
        />

        {isAvailable ? <Text>good</Text> : <Text>enter vallid name</Text>}

        <TouchableOpacity
          disabled={!isAvailable}
          onPress={() => {
            scrollToPage(4);
          }}
          style={styles.slideButton}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const slides = [
    <WelcomeSlide />,
    <AgeSlide />,
    <ImageUploadSlide />,
    <UserNameSlide />,
    <GameList />
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
