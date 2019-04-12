/* eslint-disable */
import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function wph(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const widthw = wp(80);
const heighth = wph(70);
const marginRight = wp(10);

export default StyleSheet.create({
  cardContainer: {
    width: widthw,
    height: heighth,
    backgroundColor: 'white',
    padding: 10,
    marginRight,
    marginLeft: marginRight,
  },
});
