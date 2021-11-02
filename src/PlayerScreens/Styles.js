import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  slideDiv: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    width: width * 0.9,
    // borderWidth: 1,
    // borderColor: 'black',
    height: height * 0.2,
    justifyContent: 'space-evenly',
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
  slide1Button: {
    backgroundColor: 'orange',
    width: width * 0.75,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },

  // scrollViewContainerStyle: {
  //   alignContent: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 600,
  // },
});

export default styles;
