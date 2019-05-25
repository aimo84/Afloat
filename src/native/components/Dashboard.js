/* eslint-disable */
import React, { Component } from 'react';
import Animation from 'lottie-react-native';
import Image from 'react-native-scalable-image';
import { Animated, TouchableOpacity } from 'react-native';
import {
  View, Segment, Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator, Tab, Tabs, ScrollableTab,
} from 'native-base';
import Ticker, { Tick } from "react-native-ticker";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Modal from "react-native-modal";
import Emoji from 'react-native-emoji';

import { enrollSubscription, getLoanHistory } from '../../actions/bank';

import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import Spacer from './Spacer';
import styles from './style.js';

import { getTransactions, getBalance, transferAchToApp } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';


global.lastDate = 'date';
global.pieDictionaryData = new Object();
const data = [, , 0.27];

const screenWidth = Dimensions.get('window').width;


class Dashboard extends Component {

  intervalId = 0;

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
          balance: "~",
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
      confirmRepaymentModal: false,
      currency: "$",
      value: "123.00",
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


    const balance = this.props.balance;
    const active = this.props.active;
    const outstandingBalance = this.props.outstandingBalance;
    if (typeof balance !== 'undefined') {
      console.log('TESTING');
      console.log(balance)
      const entryItems = this.state.entryItems.slice() //copy the array
      entryItems[0].active = active; //execute the manipulations
      entryItems[0].balance = balance.toFixed(2);
      entryItems[0].outstandingBalance = outstandingBalance;
      this.setState({ entryItems })
    }

    this.props.getTransactions(member.token, (res) => {
      const entryItems = this.state.entryItems.slice() //copy the array
      console.log(res)
      entryItems[0].balance = res.toFixed(2) + ''; //execute the manipulations
      this.setState({ entryItems })

      clearInterval(this.intervalID);

      const { member } = this.props;
      this.props.getLoanHistory(member.token, () => {});

      this.props.getUserData(member.token, (res) => {
        console.log('link bank')
        const entryItems = this.state.entryItems.slice() //copy the array
        entryItems[0].active = res.active; //execute the manipulations
        entryItems[0].outstandingBalance = res.outstandingBalance;
        this.setState({ entryItems })
      });
    },
    () => {
      this.props.getUserData(member.token, (res) => {
        const entryItems = this.state.entryItems.slice() //copy the array
        entryItems[0].active = res.active; //execute the manipulations
        entryItems[0].outstandingBalance = res.outstandingBalance;
        this.setState({ entryItems })
      });
    });

  }

  getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2);
  }

  renderJSXAmount(transactionAmount) {
    if (transactionAmount <= 0) {
      return (
        <Text style={styles.redTransactionText}>
$
          {(transactionAmount*-1).toFixed(2)}
        </Text>
      );
    }
    return (
      <Text style={styles.greenTransactionText}>
-$
        {transactionAmount.toFixed(2)}
      </Text>
    );
  }

  formatDate(transactionDate) {
    const month = new Array();
    month[1] = 'January';
    month[2] = 'February';
    month[3] = 'March';
    month[4] = 'April';
    month[5] = 'May';
    month[6] = 'June';
    month[7] = 'July';
    month[8] = 'August';
    month[9] = 'September';
    month[10] = 'October';
    month[11] = 'November';
    month[12] = 'December';
    const splitDate = String(transactionDate).split('-');
    return `${month[splitDate[1].replace(/^0+/, '')]} ${splitDate[2]}`;
  }

  renderJSXDividers(transactionDate) {
    if (transactionDate != global.lastDate) {
      global.lastDate = transactionDate;
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
          <Text style={styles.listDividerText}>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
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
                  <View style={{ width: '30%'}}>
                  <Ticker text={'$'+item.balance} textStyle={styles.balance} rotateTime={50} />
                  </View>
                  <Text style={styles.balanceTitle}>
                    Current Bank Balance
                  </Text>
                  <View style={styles.spacer}>
                  </View>
                  <View style={{flexGrow: 1, justifyContent: 'center'}}>
                  <Text style={styles.nonActiveText}>
                  Afloat has you covered in case your balance runs low. Get a $300 interest-free loan now and pay us back when your paycheck arrives.
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
                  ${item.balance}
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
                  Actions.makeTransaction({ updateUser: () => {
                    this.props.getUserData(member.token, (res) => {
                      const entryItems = this.state.entryItems.slice() //copy the array
                      entryItems[0].active = res.active; //execute the manipulations
                      entryItems[0].outstandingBalance = res.outstandingBalance;
                      this.setState({ entryItems })
                    });
                  }});
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
        return (
          <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
            <View style={styles.slide}>
              <View>

                <Text style={styles.balance}>
                  ${item.balance}
                </Text>
                <Text style={styles.balanceTitle}>
                  Current Bank Balance
                </Text>
                <View style={styles.spacer}>
                </View>
                <Text style={styles.balance}>
                  ${item.outstandingBalance.toFixed(2)}
                </Text>
                <Text style={styles.balanceTitle}>
                  Current Loan Outstanding
                </Text>
                <View style={styles.spacer}>
                </View>
                <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <Text style={styles.nonActiveText}>
                Repay your loan early at any time or we'll automatically do it next paycheck.
                </Text>
                <View style={styles.spacer}>
                </View>
                <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: 'white', width: 300, borderRadius: 35}} onPress={() => {
                  this.toggleConfirmRepaymentModal()
                }}
                >
                  <Text style={{ color: '#21D0A5', textAlign: 'center', width: 300,}}>
                    Repay now
                  </Text>
                </Button>

                </View>

              </View>
            </View>
            <View style={styles.spacer}>
            </View>
          </View>
        );
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
    this.props.getUserData(member.token, (res) => {
      const entryItems = this.state.entryItems.slice() //copy the array
      entryItems[0].active = res.active; //execute the manipulations
      entryItems[0].outstandingBalance = res.outstandingBalance;
      this.setState({ entryItems })
    });
  };

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  closeFirstModals = () => {
    this.setState({
      isModalVisible: false,
    });
    this.sleep(50).then(() => {
      this.setState({
        baseModalVisible: false,
      })
    })
  };

  closeSecondModals = () => {
    const { member } = this.props;

    this.setState({
      confirmTextModal: false,
    });
    this.sleep(50).then(() => {
      this.setState({
        isConfirmModalVisible: false,
      });
      this.sleep(50).then(() => {
        this.setState({
          baseModalVisible: false,
        });
        console.log(this.state);
        Actions.makeTransaction({ updateUser: () => {
          this.props.getUserData(member.token, (res) => {
            const entryItems = this.state.entryItems.slice() //copy the array
            entryItems[0].active = res.active; //execute the manipulations
            entryItems[0].outstandingBalance = res.outstandingBalance;
            this.setState({ entryItems })
          });
        }})
        console.log('move called');
      })
    })
  }

  redirectTransaction = () => {
    this.setState({
      confirmTextModal: false,
    });
    this.sleep(15).then(() => {
      this.setState({
        baseModalVisible: false,
      })
    })
    this.sleep().then(() => {
      Actions.makeTransaction({ updateUser: () => {
        this.props.getUserData(member.token, (res) => {
          const entryItems = this.state.entryItems.slice() //copy the array
          entryItems[0].active = res.active; //execute the manipulations
          entryItems[0].outstandingBalance = res.outstandingBalance;
          this.setState({ entryItems })
        });
      }});
    })
  }

  toggleConfirmRepaymentModal = () => {
    this.setState({ confirmRepaymentModal: !this.state.confirmRepaymentModal});
  }

  render = () => {
    const transactions = this.props.transactions;
    let transactionsListItems = [];
    const { slider1ActiveSlide } = this.state;
    const { member } = this.props;

    if (typeof member.bankStaging !== 'undefined' && !member.bankStaging) {
      Actions.replace('linkBank');
    }

    { this.renderJSXPieChartData(transactions); }

    // Check that transactions are not null and that transactions are not an empty list
    if (transactions && Object.keys(transactions).length >= 2) {
      transactionsListItems = // console.log(transaction);
                              transactions.map(transaction => (
                                <View key={JSON.stringify(transaction)}>
                                  { this.renderJSXDividers(transaction.date) }
                                  <ListItem style={styles.ListItemStyling} avatar>
                                    <Left style={styles.ListItemStyling}>
                                      <Thumbnail small square source={{ uri: transaction.uri }} />
                                    </Left>
                                    <Body style={styles.ListItemStyling}>
                                      <Text style={styles.TransactionText}>{transaction.name}</Text>
                                      <Text style={styles.LeftNoteText} note>{transaction.category[0]}</Text>
                                    </Body>
                                    <Right style={styles.RightNoteText}>
                                      { this.renderJSXAmount(transaction.amount) }
                                    </Right>
                                  </ListItem>
                                </View>
                              ));
    } else {
      transactionsListItems = (
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
      );
    }
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content style={{ flex: 1 }}>
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
          <List style={{ flex: 1 }}>
            {transactionsListItems}
          </List>

        <Modal
        backdropOpacity={0.2}
        isVisible={this.state.baseModalVisible}
        useNativeDriver
        >
        <Modal
        backdropOpacity={0.0}
        isVisible={this.state.isModalVisible}
        useNativeDriver
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
          <TouchableOpacity style = {{ position: 'absolute', top: 15, right: 15 }} onPress={() => {
            this.closeFirstModals();
            console.log(this.state);
          }}>
            <Text style={{ fontSize: 30 }}>X</Text>
          </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.modalTitle}>Say Goodbye to Bank Overdraft Fees</Text>
              <View style={styles.spacer} />
            </View>
            <View style={{flexGrow: 1}}>
              <View style={styles.textRow}>
                <Emoji name="moneybag" style={{fontSize: 30}} />
                <Text style={styles.modalText}>Borrow money when you need it </Text>
              </View>
              <View style={styles.textRow}>
                <Emoji name="money_with_wings" style={{fontSize: 30}} />
                <Text style={styles.modalText}>Recieve in your bank next day </Text>
              </View>
              <View style={styles.textRow}>
                <Emoji name="man-gesturing-no" style={{fontSize: 30}} />
                <Text style={styles.modalText}>Pay no interest </Text>
              </View>
              <View style={styles.textRow}>
                <Emoji name="clock130" style={{fontSize: 30}} />
                <Text style={styles.modalText}>Automatic repayment next paycheck </Text>
              </View>
            </View>
            <View style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}> Subscribe for $9.99/month </Text>
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
        </View>
      </Modal>
      <Modal
      isVisible={this.state.isConfirmModalVisible}
      backdropOpacity={0.0}
      useNativeDriver
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
        useNativeDriver
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Thanks for Enrolling</Text>
            <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.textRow}>
              <Emoji name="white_check_mark" style={{fontSize: 30}} />
              <Text style={styles.modalText}>You're all set to borrow!</Text>
            </View>
            </View>
            <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: '#21D0A5', width: scale(200), borderRadius: 35}} onPress={() => {
              this.closeSecondModals();
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
      <Modal
      backdropOpacity={0.2}
      isVisible={this.state.confirmRepaymentModal}
      useNativeDriver

      >
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Confirm Repayment</Text>
          <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.textRow}>
              <Emoji name="money_with_wings" style={{fontSize: 30}} />
              <Text style={styles.modalText}>Repay ${this.state.entryItems[0].outstandingBalance}</Text>
            </View>
          </View>
          <Button style={{display: 'flex',  alignSelf: 'center', backgroundColor: '#21D0A5', width: scale(200), borderRadius: 35}} onPress={() => {
            this.props.transferAchToApp(member.token, (res) => {
              const entryItems = this.state.entryItems.slice() //copy the array
              entryItems[0].outstandingBalance = 0;
              this.setState({ entryItems })
              this.props.getLoanHistory(member.token, ()=>{console.log('LOANHISTORYCALLED')});
            });
            this.toggleConfirmRepaymentModal();
          }}
          >
            <Text style={{ color: 'white', textAlign: 'center', width: scale(200)}}>
              Confirm
            </Text>
          </Button>
        </View>
      </View>
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
  transferAchToApp,
  getLoanHistory
};

const mapStateToProps = state => (
{
    transactions: state.bank.transactions,
    balance: state.bank.balance,
    active: state.member.active,
    outstandingBalance: state.member.outstandingBalance
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
