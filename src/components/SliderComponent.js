import { Text, View } from "react-native"
import Slider from "@react-native-community/slider";
import React from 'react';


export const SliderComponent = ({ onSliderValueChange, getClans, sliderValue }) => {
    return (
        <View>
            <Slider minimumValue={2} maximumValue={20} step={.1} value={2} onValueChange={onSliderValueChange} onSlidingComplete={getClans} />
            <Text>{sliderValue}</Text>
        </View>
    )
}

