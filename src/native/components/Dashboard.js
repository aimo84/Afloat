/* eslint-disable */
import React, { Component } from 'react';
import Animation from 'lottie-react-native';
import Image from 'react-native-scalable-image';
import { Animated, FlatList, TouchableOpacity } from 'react-native';
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
import TransactionList from './TransactionList';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import Spacer from './Spacer';
import styles from './style.js';
import { getTransactions, getBalance, transferAchToApp, getBalanceOverTime } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryLine, VictoryGroup, VictoryLegend } from "victory-native";
import dateFormat from 'dateformat';
import { Svg } from 'expo';
const {Rect} = Svg;

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
      balanceOverTimeData: [],
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

    let lastWeek = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)
    let lastWeekFormattedDate = dateFormat(lastWeek, "mm/dd/yyyy")
    console.log(lastWeekFormattedDate)
    getBalanceOverTime(member.token, lastWeekFormattedDate, (res) => {

      // Map undefined values to 0
      let balanceOverTimeData = res.map((val) => {
        let outwardFlow = val.outwardCashFlow === undefined ? 0 : val.outwardCashFlow;
        let inwardFlow = val.inwardCashFlow === undefined ? 0 : val.inwardCashFlow;
        return {
          date: val.date, 
          outwardFlow,
          inwardFlow,
          endBalance: val.endBalance,
        }
      });

      let dateFromDate = (source, days) => {
        let copy = new Date(source.getTime())
        return new Date(copy.setDate(copy.getDate() + days));
      }
      let currentIndex = 0;
      // Insert blank records between dates
      while (currentIndex < balanceOverTimeData.length - 1) {
        
        // Get current date
        let current = new Date(dateFormat(balanceOverTimeData[currentIndex].date, 'isoDateTime'));
        current.setDate(current.getDate() + 1);

        // Get next date
        let next = new Date(dateFormat(balanceOverTimeData[currentIndex + 1].date, 'isoDateTime'));
        next.setDate(next.getDate() + 1);
        
        // Calculate correct next date
        let tmp = dateFromDate(current, -1);
        
        // If next isn't correct, insert blank record
        if (next.getTime() !== tmp.getTime()) {
          balanceOverTimeData.splice(currentIndex + 1, 0, {
            date: dateFormat(tmp, 'yyyy-mm-dd'),
            endBalance: balanceOverTimeData[currentIndex + 1].endBalance,
            inwardFlow: 0,
            outwardFlow: 0,
          });
        }
        currentIndex += 1;
      }

      // Reverse the sorted data
      balanceOverTimeData = balanceOverTimeData.reverse();

      this.setState({
        balanceOverTimeData: balanceOverTimeData.slice(0, 7),
      })
    })

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
        debugger;
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
      } else if (item.active && item.outstandingBalance === 0) {
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
      let xTickValues = this.state.balanceOverTimeData.filter((d, i) => i % 5 === 0);
      if (this.state.balanceOverTimeData.length > 1) {      
        return (
          <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
            <View style={styles.chartSlide}>
              <VictoryChart animate={{ duration: 2000 }} width={350} theme={VictoryTheme.material}>
              <VictoryLabel x = {10} y = {20} style={{
                  textAnchor: "start",
                  verticalAnchor: "end",
                  fill: "white",
                  fontFamily: "inherit",
                  fontSize: "22px",
                  fontWeight: "bold"
                }}
                text="Balance Over Time"
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`$${x}`)}
                style={{ tickLabels: {fontSize: '11', fill: 'white'}, grid: { stroke: 'rgba(255, 255, 255, 0.2)' } }}
              />
              <VictoryAxis padding={{ top: 20, bottom: 60 }} style={{
                                ticks: {fill: 'white', padding: 2},
                                tickLabels: {fill: 'white', angle: 0},
                                grid: { stroke: 'rgba(255, 255, 255, 0.1)' },
                              }}
                scale="time"
                tickValues={xTickValues}
                tickFormat={(x) => {
                  let d = new Date(x)
                  var weekday = new Array(7);
                  weekday[0] =  "Sunday";
                  weekday[1] = "Monday";
                  weekday[2] = "Tuesday";
                  weekday[3] = "Wednesday";
                  weekday[4] = "Thursday";
                  weekday[5] = "Friday";
                  weekday[6] = "Saturday";

                  var newDate = new Date(d.setTime( d.getTime() + 1 * 86400000 ));
                  return weekday[d.getDay()].substr(0, 2);
                }}
              />
              <VictoryBar data={this.state.balanceOverTimeData} x="date" y="endBalance" events={
                [{
                  target: 'data',
                  eventHandlers: {
                    onPress: props => console.log('boom'),
                  },
                },]
              }/>
              <VictoryTooltip
                  cornerRadius={0}
                  pointerLength={0}
                  flyoutStyle={{
                      stroke: "none",
                      fill: "blue"
                  }}
              />
              </VictoryChart>
            </View>
            <View style={styles.spacer}>
            </View>
          </View>
        );
      }
      else {
        return (<View/>)
      }
    }

    let xTickValues = this.state.balanceOverTimeData.filter((d, i) => i % 5 === 0);
    if (this.state.balanceOverTimeData.length > 1) {      
      return (
        <View style={{height: verticalScale(300), display: 'flex', flex: 1}}>
          <View style={styles.chartSlide}>
            <VictoryChart animate={{ duration: 2000 }} width={350} theme={VictoryTheme.material}>
            <VictoryLabel x = {10} y = {20} style={{
                textAnchor: "start",
                verticalAnchor: "end",
                fill: "white",
                fontFamily: "inherit",
                fontSize: "22px",
                fontWeight: "bold"
              }}
              text="Daily Cash Flow"
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x}`)}
              style={{ tickLabels: {fontSize: '11', fill: 'white'}, grid: { stroke: 'rgba(255, 255, 255, 0.2)' } }}
            />
            <VictoryAxis padding={{ top: 20, bottom: 60 }} style={{
                              ticks: {fill: 'white', padding: 2},
                              tickLabels: {fill: 'white', angle: 0},
                              grid: { stroke: 'rgba(255, 255, 255, 0.1)' },
                            }}
              scale="time"
              tickValues={xTickValues}
              tickFormat={(x) => {
                let d = new Date(x)
                var weekday = new Array(7);
                weekday[0] =  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                var newDate = new Date(d.setTime( d.getTime() + 1 * 86400000 ));
                return weekday[d.getDay()].substr(0, 2);
              }}
            />
            <VictoryLegend x={265} y={5}
                  orientation="vertical"
                  symbolSpacer={5}
                  gutter={20}
                  data={[
                    { name: "Income", symbol: { fill: "#455A64" } }, { name: "Spending", symbol: { fill: "yellow" }, },
                  ]}
                />
        <VictoryGroup
          color="#FF6B6B"
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
            />
          }
          data={this.state.balanceOverTimeData} x="date" y="outwardFlow"
        >
          <VictoryLine style={{ data: { stroke: "yellow", strokeWidth: 2 }, }} />
        </VictoryGroup>
        <VictoryGroup
          color="#028090"
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
            />
          }
          data={this.state.balanceOverTimeData} x="date" y="inwardFlow"
        >
          <VictoryLine style={{ data: { stroke: "#455A64", strokeWidth: 2 }, }} />
        </VictoryGroup>
              <VictoryTooltip
                  cornerRadius={0}
                  pointerLength={0}
                  flyoutStyle={{
                      stroke: "none",
                      fill: "blue"
                  }}
              />

            </VictoryChart>
          </View>
          <View style={styles.spacer}>
          </View>
        </View>
      );
    }
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

    const { slider1ActiveSlide } = this.state;
    const { member } = this.props;

    if (typeof member.bankStaging !== 'undefined' && !member.bankStaging) {
      Actions.replace('linkBank');
    }
    
    { this.renderJSXPieChartData(transactions); }
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

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content
          style={{flex: 1}}
          // contentContainerStyle={{flex: 1}} // important!
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
