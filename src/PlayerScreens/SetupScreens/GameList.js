import React, {useEffect, useState} from 'react';
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
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('screen');

export const GameList = ({navigation}) => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState(0);

  const numColumns = 2;

  const formatData = (dataList, numColumns) => {
    while (dataList.length % numColumns != 0) {
      dataList.push({key: 'blank', empty: true});
    }
    return dataList;
  };

  useEffect(() => {
    axios
      .get(`http://${localhost}:3000/auth/get`)
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const _renderItem = ({item}) => {
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
          navigation.navigate('GameDetails', {item});
        }}
        style={{
          flex: 1,
          height: height * 0.3,
          backgroundColor: 'black',
          margin: 4,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: item.image}}
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
      <View
        style={{
          flex: 1,
        }}>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <FlatList
          data={formatData(games, numColumns)}
          keyExtractor={item => item._id}
          numColumns={numColumns}
          renderItem={_renderItem}
        />
        {/* <View
          style={{
            width: width,
            height: 50,
            backgroundColor: 'white',
          }}>
          <Text>{`${linked} games linked`}</Text>
        </View> */}
      </View>
    );
  } else {
    return <Text>you aint supposed to see this</Text>;
  }
};

// other thigns this screen needs:
// 1. a bar that dictates what games you have registered to yor account and how many.
// 2. the three dots top right corner dropdown a "dont see your game?" prompt
