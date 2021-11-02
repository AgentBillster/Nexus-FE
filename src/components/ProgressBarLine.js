import React, {useState, useEffect, useRef} from 'react';

import {Animated, View} from 'react-native';

export const ProgressBarLine = ({step, steps, height}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactive = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  console.log(width);
  console.log(reactive);

  return (
    <View
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width);
      }}
      style={{
        height: height,
        backgroundColor: 'rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          height: height,
          borderRadius: 8,
          backgroundColor: 'purple',
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </View>
  );
};
