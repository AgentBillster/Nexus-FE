import React, {useState, useContext, useEffect, useRef} from 'react';
import {ProgressBarLine} from '../components/ProgressBarLine';
import styles from './Styles';
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
} from 'react-native';
import {ProgressBarCircle} from '../components/ProgressBarCircle';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');
import {AuthContext} from '../AuthStuff/AuthProvider';

export const PlayerSetup = ({navigation}) => {
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
    flatListRef.current.scrollToIndex({index: index});
  };

  const slides = [
    {
      component: <Slide1 scrollToPage={scrollToPage} />,
    },
    {
      component: <Slide2 scrollToPage={scrollToPage} />,
    },
    {
      component: <Slide3 scrollToPage={scrollToPage} />,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ecf0f1',
      }}>
      <StatusBar hidden />

      <FlatList
        scrollEnabled={false}
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        renderItem={({item, index}) => item.component}
      />
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '75%',
        }}>
        {/* <ProgressBarCircle
          percentage={percentage}
          radius={50}
          // strokeWidth = 10,
          // duration = 500,
          // color = 'tomato',
          // delay = 0,
          // textColor,
          // max = 100,
        /> */}
      </View>
    </View>
  );
};

const Slide1 = ({scrollToPage}) => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.slideDiv}>
      <View style={styles.content}>
        <Text style={styles.slideHeader}>Welcome, Fuckhead</Text>
        <Text style={styles.subText}>
          Here your gonna blah blah but we need some basic information and what
          not yeah words words words yes.
        </Text>
        <TouchableOpacity
          style={styles.slide1Button}
          onPress={() => {
            scrollToPage(1);
          }}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <Button title={'logout'} onPress={logout} />
      </View>
    </View>
  );
};

const Slide2 = ({scrollToPage}) => {
  return (
    <View style={styles.slideDiv}>
      <Text style={styles.slideHeader}>How old are you, </Text>
      <Button
        title="Next"
        onPress={() => {
          scrollToPage(2);
        }}
      />
    </View>
  );
};

const Slide3 = ({scrollToPage}) => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);

  const numColumns = 2;

  const formatData = (dataList, numColumns) => {
    while (dataList.length % numColumns != 0) {
      dataList.push({key: 'blank', empty: true});
    }
    return dataList;
  };

  useEffect(() => {
    axios
      .get('http://192.168.1.148:3000/auth/get')
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const _renderItem = item => {
    // invisible render item
    if (item.item.empty) {
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
    // actual render item
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#4D243D',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 5,
          height: width * 0.5,
        }}>
        <Text style={{color: 'white'}}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (!loading) {
    return (
      <View
        style={{
          width: width,
        }}>
        <FlatList
          data={formatData(games, numColumns)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={numColumns}
          renderItem={_renderItem}
        />
      </View>
    );
  } else {
    return <Text>you aint supposed to see this</Text>;
  }
};
