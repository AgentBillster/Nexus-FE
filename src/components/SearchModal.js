import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {CloseIcon} from '../assets/Icons';
import {getGameData} from '../../apiconfig';
import {Picker} from '@react-native-picker/picker';
import localhost from 'react-native-localhost';
import {AuthContext} from '../AuthStuff/AuthProvider';
import {SetupContext} from '../PlayerScreens/SetupScreens/SetupProvider';
import {TabNavigator} from '../PlayerScreens/DashScreens/TabNavigator';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

export const SearchModal = ({
  modalVisible,
  setModalVisible,
  name,
  platforms,
}) => {
  const {user} = useContext(AuthContext);
  const {setupInfo} = useContext(SetupContext);
  const [timeLeft, setTimeLeft] = useState();
  const [text, setText] = useState(null);
  const [slug, setSlug] = useState(platforms[0]);
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    console.log(timeLeft);
    if (timeLeft === 0) {
      getGameData(name, slug, text, setData);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleInput = e => {
    const {text} = e.nativeEvent;
    setText(text);
    setTimeLeft(2);
  };

  const linkProfile = () => {
    axios
      .post(`http://${localhost}:3000/player/finishSetup`, {
        id: user._id,
        name: name,
        data: data,
        setupInfo: setupInfo,
      })
      .then(res => {
        if (res.data === 'success') {
          navigation.navigate('profile');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        position: 'absolute',
      }}>
      <View style={sModal.centeredView}>
        <View style={sModal.modalView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <CloseIcon />
          </TouchableOpacity>

          <Picker
            selectedValue={slug}
            onValueChange={itemValue => setSlug(itemValue)}>
            {platforms.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <TextInput
            style={sModal.modalInput}
            onChange={e => handleInput(e)}
            value={text}
          />

          {timeLeft <= 2 && timeLeft != 0 && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}

          {data && (
            <TouchableOpacity
              onPress={linkProfile}
              style={{width: 70, height: 70, alignSelf: 'center'}}>
              <Image
                source={{uri: data.avatar}}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const sModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  modalInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
