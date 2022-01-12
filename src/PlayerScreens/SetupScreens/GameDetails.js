import {Dimensions, Modal, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Text, Button} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import RadialGradient from 'react-native-radial-gradient';
import {ArrowLeft, CloseIcon} from '../../assets/Icons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {SearchModal} from '../../components/SearchModal';

const {width, height} = Dimensions.get('screen');
const HEADER_IMAGE_HEIGHT = height * 0.4;
const PLATFORM_CONTAINER_WIDTH = width * 0.85;

export const GameDetails = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState();
  const {item} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(27,34,47)'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={detailStyles.backButton}>
        <ArrowLeft />
      </TouchableOpacity>

      <Image source={{uri: item.detailsImage}} style={detailStyles.img} />

      {/* {modalVisible ? (
        <View
          style={{
            backgroundColor: 'black',
            height,
            width,
            zIndex: 3,
            opacity: 0.4,
          }}
        />
      ) : null} */}

      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgb(27,34,47)']}
        locations={[0.4, 1]}
        style={{
          width: width,
          alignSelf: 'center',
          opacity: 1,
          transform: [{translateY: 15}],
          height: HEADER_IMAGE_HEIGHT,
          // transform: [{translateY: }],
        }}
      />

      <View>
        {Object.keys(item.gameData).map((console, index) => {
          return (
            <View key={index}>
              <Button
                onPress={() => {
                  setSelectedPlatform(console);
                  setModalVisible(true);
                }}
                title={console}
                disabled={!item.gameData[console].supported}
              />
            </View>
          );
        })}

        {selectedPlatform && (
          <SearchModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            name={item.name}
            platforms={item.gameData[selectedPlatform].platforms}
          />
        )}
      </View>
    </View>
  );
};

const detailStyles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
    alignItems: 'center',
    width: 45,
    height: 45,
    top: 25,
    left: 20,
    backgroundColor: '#d9dcde',
    borderRadius: 50,
  },

  img: {
    position: 'absolute',
    resizeMode: 'cover',
    width: width,
    alignSelf: 'center',
    height: HEADER_IMAGE_HEIGHT,
    zIndex: -1,
  },

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
