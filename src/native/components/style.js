/* eslint-disable */
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';


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

export default ScaledSheet.create({
  cardContainer: {
    width: widthw,
    height: heighth,
    backgroundColor: 'white',
    padding: 10,
    marginRight,
    marginLeft: marginRight,
  },
  balanceText: {
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  redTransactionText: {
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  greenTransactionText: {
    color: 'green',
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  listDividerBackgroundColor: {
    backgroundColor: 'white',
  },
  listDividerText: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 17,
    fontFamily: 'Roboto',
  },
  ProgressChartAvailableText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 70,
    marginTop: -170,
    color: 'grey',
    fontSize: 23,
    fontFamily: 'Avenir-Light',
  },
  ProgressChartAmountText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 80,
    marginTop: -142,
    fontWeight: 'bold',
    color: 'green',
    fontSize: 34,
    fontFamily: 'AvenirNext-Heavy',
  },
  ProgressChartFromText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 70,
    marginTop: -106,
    color: 'grey',
    fontSize: 23,
    fontFamily: 'Avenir-Light',
  },
  ListItemStyling: {
    borderBottomWidth: 0,
    marginTop: 0,
  },
  TransactionText: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'AvenirNext-Heavy',
  },
  LeftNoteText: {
    fontFamily: 'Avenir-Light',
    fontSize: 17,
  },
  RightNoteText: {
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical: 'center',
    borderBottomWidth: 0,
    marginTop: 5,
  },
  slide: {
    flex: 1,
    backgroundColor: '#21D0A5',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '50%',
    width: '315@s',
    marginLeft: '5%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingTop: '20@vs',
  },
  name: {
    fontFamily: 'Lato_black',
    fontSize: viewportWidth * 0.05,
    color: '#333333',
  },
  balanceTitle: {
    fontFamily: 'Lato_regular',
    fontSize: viewportWidth * 0.04,
    color: '#324251',
  },
  balance: {
    fontWeight: 'bold',
    fontFamily: 'Lato_regular',
    fontSize: viewportWidth * 0.13,
    color: 'white',
  },
  nonActiveText: {
    fontFamily: 'Lato_regular',
    fontSize: viewportWidth * 0.05,
    color: '#324251',
    textAlign: 'center',
  },
  spacer: {
    display: 'flex',
    height: '10@vs'
  }
});
