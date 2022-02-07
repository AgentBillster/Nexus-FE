import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import localhost from 'react-native-localhost';
import { SharedElement } from 'react-navigation-shared-element';
import { Modals } from "./Modals"
import { BlurView, VibrancyView } from "@react-native-community/blur";


const { width, height } = Dimensions.get('screen');

export const GameList = () => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const numColumns = 2;

  const formatData = (dataList, numColumns) => {
    while (dataList.length % numColumns != 0) {
      dataList.push({ key: 'blank', empty: true });
    }
    return dataList;
  };

  useEffect(() => {
    axios
      .get(`http://${"10.0.2.2"}:3000/auth/get`)
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const _renderItem = ({ item }) => {
    // invisible render item
    if (item.empty) {
      return (
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            margin: 5,
            height: width / numColumns,
          }}
        />
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          // OPEN MODAL
          setModalVisible(true)
        }}
        style={{
          flex: 1,
          height: height * 0.3,
          backgroundColor: 'black',
          margin: 4,
          borderRadius: 10,
        }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}></Image>
      </TouchableOpacity>
    );
  };

  if (!loading) {
    return (
      <View style={{ width: width }}>


        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <FlatList
          data={formatData(games, numColumns)}
          keyExtractor={item => item._id}
          numColumns={numColumns}
          renderItem={_renderItem}
        />

        {modalVisible && <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
          blurType="dark"
          blurAmount={10}
        />}

        <Modals modalVisible={modalVisible} setModalVisible={setModalVisible} >
          <Text>afasfasf</Text>
        </Modals>



      </View>
    );
  } else {
    return <Text>you aint supposed to see this</Text>;
  }
};

