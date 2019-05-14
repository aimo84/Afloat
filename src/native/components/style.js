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
    fontFamily: 'Lato_regular',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  greenTransactionText: {
    fontFamily: 'Lato_regular',
    fontSize: 17,
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
    fontSize: 17,
    fontFamily: 'Lato_black',
  },
  LeftNoteText: {
    fontFamily: 'Lato_regular',
    fontSize: 17,
  },
  RightNoteText: {
    fontFamily: 'Lato_regular',
    fontSize: 17,
    textAlignVertical: 'center',
    borderBottomWidth: 0,
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '40%',
    width: '315@s',
    marginLeft: '5%',
    paddingRight: '5%',
    paddingLeft: '20@s',
    paddingTop: '20@vs',
  },
  name: {
    fontFamily: 'Lato_black',
    fontSize: viewportWidth * 0.05,
    color: '#333333',
  },
  statusLabel: {
    fontFamily: 'Lato_black',
    fontSize: viewportWidth * 0.04,
    color: '#808080',
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
    width: '200@s',
  },
  loanbalance: {
    fontWeight: 'bold',
    fontFamily: 'Lato_bold',
    fontSize: viewportWidth * 0.09,
    color: '#000000',
    alignItems:'center',
    justifyContent:'center',
  },
  nonActiveText: {
    fontFamily: 'Lato_regular',
    fontSize: viewportWidth * 0.05,
    color: '#324251',
    width: '250@vs',
    textAlign: 'center',
  },
  spacer: {
    display: 'flex',
    height: '10@vs'
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  amount: {
    fontSize: '65@ms',
    color: '#ebebeb',
    fontWeight: 'bold',
    marginBottom: '18@s',
  },
  form: {
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: '70@vs',
    paddingHorizontal: '12@s',
    backgroundColor: '#cd4d17',
  },
  payMeText: {
    fontSize: '22@ms',
    color: '#ebebeb',
  },
  button: {
    height: '68@vs',
  },
  slider: {
    width: '85%',
  },
  smallNoticeText: {
    fontSize: '18@s',
    color: '#8b8e8b',
  },
  bigNoticeText: {
    fontSize: '23@s',
    fontWeight: 'bold',
  },
  noticeView: {
    alignItems: 'center',
    alignContent: 'center',
  },
  submitButtonText: {
    fontSize: '18@ms',
  },
  slideLoanHistory: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor:"#8b8e8b",
    borderWidth: 2,
    shadowColor: "#000",
    alignItems:'center',
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
  UserIconStylingView: {
    height: 150,
    alignItems:'center',
    justifyContent:'center',
    marginVertical: 25
  },
  UserIconImage:{
    width: 120,
    height: 120,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:60,
    marginVertical: 10
  },
  UserNameStyling:{
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 24
  },
  UserMenuItems:{
    fontWeight: 'bold',
    fontFamily: 'Avenir-Light',
    fontSize: 20
  },
  transactionHeader: {
    marginLeft: '3%',
    fontSize: viewportWidth * 0.07,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: viewportWidth * 0.04
  },
  modalContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: 'white',
    width: '80%',
    height:'60%',
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Roboto',
    fontSize: viewportWidth * 0.05,
}});
