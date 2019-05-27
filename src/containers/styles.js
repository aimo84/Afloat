/* eslint-disable */
import { StyleSheet, Dimensions, Platform } from 'react-native';
// import PlaidAuthenticator from 'react-native-plaid-link';

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

const widthw = wp(70);
const heighth = wph(70);

export default StyleSheet.create({
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    width: viewportWidth,
    height: heighth,
    elevation: 5,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    width: viewportWidth,
    height: heighth,
    elevation: 5,
    backgroundColor: 'white',
  }
});
