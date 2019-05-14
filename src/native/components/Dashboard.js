/* eslint-disable */
import React, { Component } from 'react';
import Animation from 'lottie-react-native';
import Image from 'react-native-scalable-image';
import { Animated, FlatList } from 'react-native';
import {
  View, Segment, Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator, Tab, Tabs, ScrollableTab,
} from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Modal from "react-native-modal";
import { enrollSubscription } from '../../actions/bank';
import TransactionList from './TransactionList';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import Spacer from './Spacer';
import styles from './style.js';


import { getTransactions, getBalance } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';


global.lastDate = 'date';
global.pieDictionaryData = new Object();
const data = [, , 0.27];

const screenWidth = Dimensions.get('window').width;


class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    match: null,
  }
  static navigationOptions = {
  headerTitleStyle: { fontSize: 30 }
  }

  constructor(props) {
    super(props);
    this.state = {
      entryItems: [
        {
          title: 'Item 1',
          balance: 0,
          active: false,
          outstandingBalance: 0
        },
        {
          title: 'Item 2',
        },
        {
          title: 'Item 3',
        },
      ],
      selected: 'key1',
      transactions: {},
      slider1ActiveSlide: 0,
      isModalVisible: false,
      isConfirmModalVisible: false,
      baseModalVisible: false,
      confirmTextModal: false,
      progress: new Animated.Value(0),
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  componentWillMount() {
    const { member } = this.props;
  }

  componentDidMount = () => {
    if (this.animation) {
     this.animation.play();
    }
    const { member } = this.props;
    console.log('dispatched member');
    if (!member.bankSet) {
      Actions.replace('linkBank');
    }
    this.props.getTransactions(member.token);

    getBalance(member.token,
      (res) => {
        console.log('reached balance update')
        const entryItems = this.state.entryItems.slice() //copy the array
        entryItems[0].balance = res; //execute the manipulations
        this.setState({ entryItems });
      }
    );

    this.props.getUserData(member.token, (res) => {
      const entryItems = this.state.entryItems.slice() //copy the array
      entryItems[0].active = res.active; //execute the manipulations
      entryItems[0].outstandingBalance = res.outstandingBalance;
      this.setState({ entryItems })
      // console.log(this.state.entryItems);
    });

  }

  renderJSXPieChartData(transactions) {
    for (x in transactions) {
      if (transactions[x].category[0] in global.pieDictionaryData) {
        global.pieDictionaryData[transactions[x].category[0]] = global.pieDictionaryData[transactions[x].category[0]] + transactions[x].amount;
      } else {
        global.pieDictionaryData[transactions[x].category[0]] = transactions[x].amount;
      }
    }
  }

  _renderItem = ({ item, index }) => {
    const { member } = this.props;
    let { balance } = this.state;

    // console.log(item);
    if (index == 0) {

      if (!item.active){
          return (
            <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
              <View style={styles.slide}>
                <View>

                  <Text style={styles.balance}>
                    ${item.balance.toFixed(2)}
                  </Text>
                  <Text style={styles.balanceTitle}>
                    Current Bank Balance
                  </Text>
                  <View style={styles.spacer}>
                  </View>
                  <View style={{flexGrow: 1, justifyContent: 'center'}}>
                  <Text style={styles.nonActiveText}>
                  [Name] has you covered in case your balance runs low. Get a $300 interest-free loan now and pay us back when your paycheck arrives.
                  </Text>
                  <View style={styles.spacer}>
                  </View>
                  <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: 'white', width: 300, borderRadius: 35}} onPress={() => {
                    this.toggleBaseModal();
                    setTimeout(()=> this.toggleModal(), 500);

                  }}
                  >
                    <Text style={{ color: '#21D0A5', textAlign: 'center', width: 300,}}>
                      Get Started
                    </Text>
                  </Button>

                  </View>
                  <View style={{width: scale(270), justifyContent: 'center', alignSelf: 'flex-end'}} >
                  <Image width={scale(130)} style={{opacity: 0.6, alignSelf: 'center'}} source={require('../../images/monyCircleCropped.png')} />
                  </View>

                </View>
              </View>
              <View style={styles.spacer}>
              </View>
            </View>
          );
      } else if (item.active && item.outstandingBalance === 0){
        return (
          <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
            <View style={styles.slide}>
              <View>

                <Text style={styles.balance}>
                  ${item.balance.toFixed(2)}
                </Text>
                <Text style={styles.balanceTitle}>
                  Current Bank Balance
                </Text>
                <View style={styles.spacer}>
                </View>
                <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <Text style={styles.nonActiveText}>
                Balance running low? Borrow up to $300 interest-free
                </Text>
                <View style={styles.spacer}>
                </View>
                <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: 'white', width: 300, borderRadius: 35}} onPress={() => {
                  this.toggleModal();
                }}
                >
                  <Text style={{ color: '#21D0A5', textAlign: 'center', width: 300,}}>
                    Borrow now
                  </Text>
                </Button>

                </View>
                <View style={{width: scale(270), justifyContent: 'center', alignSelf: 'flex-end'}} >
                <Image width={scale(130)} style={{opacity: 0.6, alignSelf: 'center'}} source={require('../../images/monyCircleCropped.png')} />
                </View>

              </View>
            </View>
            <View style={styles.spacer}>
            </View>
          </View>
        );
      }
      else {
        <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
          <View style={styles.slide}>
            {member.outstandingBalance}
          </View>
        </View>
      }


    } if (index == 1) {

      return (
        <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
          <View style={styles.slide}>

          </View>
          <View style={styles.spacer}>
          </View>
        </View>
      );
    }

    return (
      <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
        <View style={styles.slide}>

        </View>
        <View style={styles.spacer}>
        </View>
      </View>
    );
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleConfirmModal = () => {
    this.setState({ isConfirmModalVisible: !this.state.isConfirmModalVisible });
    // this.setState({ confirmTextModal: !this.state.confirmTextModal });
  };

  toggleBaseModal = () => {
    this.setState({ baseModalVisible: !this.state.baseModalVisible });
  };

  toggleConfirmTextModal = () => {
    const { member } = this.props;
    this.setState({ confirmTextModal: !this.state.confirmTextModal });
    this.props.getUserData(member.token, () => {});
  };

  closeAllModals = () => {
    this.setState({
      isModalVisible: false,
      isConfirmModalVisible: false,
      baseModalVisible: false,
      confirmTextModal: false,
      });
  }

  render = () => {
    const transactions = this.props.transactions;
    if (transactions) {
      console.log(`III transactions.length ${transactions.length}`);
    }
    else {
      console.log('III transactions null');
    }

    // let transactionsListItems = [];
    const { slider1ActiveSlide } = this.state;
    const { member } = this.props;
    { this.renderJSXPieChartData(transactions); }
    console.log('printing transactions in render');
    let transactionList = null;
    // Check that transactions are not null and that transactions are not an empty list
    if (transactions && Object.keys(transactions).length >= 2) {
      transactionList = <TransactionList transactions = { transactions } />
    }
    else {
      transactionList = 
      <View style={{flex:1, height: verticalScale(150), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
             <Animation
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 180,
                height: 180
              }}
              loop={true}
              source={require('../../images/loading.json')}
              resizeMode="cover"
            />
            <Text style={styles.loadingText}>
              Retrieving Transactions
            </Text>
          </View>
    }
    console.log('pre transactions');
    // console.log(transactions);
    console.log('post transactions');
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}} // important!
        >
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entryItems}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          height={verticalScale(280)}
          marginTop={20}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={this.state.entryItems.length}
          activeDotIndex={slider1ActiveSlide}
            // containerStyle={styles.paginationContainer}
          dotColor='#21D0A5'
            // dotStyle={styles.paginationDot}
          inactiveDotColor="#000000"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
          <Text style={styles.transactionHeader}>
            Transactions
          </Text>
          {transactionList}
        <Modal
        backdropOpacity={0.2}
        isVisible={this.state.baseModalVisible}
        >
        <Modal
        onSwipeComplete={() => this.setState({ isModalVisible: false })}
        swipeDirection={['up']}
        backdropOpacity={0.0}
        isVisible={this.state.isModalVisible}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Say Goodbye to Bank Overdraft Fees</Text>
            <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: '#21D0A5', width: scale(200), borderRadius: 35}} onPress={() => {
              this.props.enrollSubscription(member.token, () => {
                this.toggleConfirmModal()
              });
              this.toggleModal();
            }}
            >
              <Text style={{ color: 'white', textAlign: 'center', width: scale(200)}}>
                Enroll Now
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
      onSwipeComplete={() => this.setState({ isConfirmModalVisible: false })}
      isVisible={this.state.isConfirmModalVisible}
      backdropOpacity={0.0}
      onModalShow={() => {
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }).start(() => {this.toggleConfirmTextModal()});
      }}>
        <View style={styles.modalContainer}>
        <Animation
          ref={animation => {
            this.confetti = animation;
          }}
          style={{
            width: 380,
            height: 380
          }}
          loop={false}
          source={require('../../images/confetti.json')}
          progress={this.state.progress}
          resizeMode="cover"
        />
        </View>
        <Modal
        backdropOpacity={0.0}
        isVisible={this.state.confirmTextModal}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Thanks for Enrolling</Text>
            <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: '#21D0A5', width: scale(200), borderRadius: 35}} onPress={() => {
              this.closeAllModals();
            }}
            >
              <Text style={{ color: 'white', textAlign: 'center', width: scale(200)}}>
                Borrow now
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
      </Modal>
      </Modal>
        </Content>
        <FooterBar/>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
  getTransactions,
  enrollSubscription,
  getUserData,
};

const mapStateToProps = state => (
{
    transactions: state.bank.transactions
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
