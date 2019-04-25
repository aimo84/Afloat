/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Segment,Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator,Tab, Tabs, ScrollableTab,
} from 'native-base';
//import TabOne from './TabOne';
//import TabTwo from './TabTwo';
//import Head from '../app/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from './Spacer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BottomBar from './BottomBar';


import { getTransactions } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';
global.lastDate = "date";
global.pieDictionaryData = new Object();
global.data2  = [
  { name: 'Food/Drink', amount: 7134.37, color: '#393e46', legendFontColor: '#393e46', legendFontSize: 12 },
  { name: 'Payment', amount: 47721, color: '#085f63', legendFontColor: '#085f63', legendFontSize: 12 },
  { name: 'Recreation', amount: 471, color: '#ffb677', legendFontColor: '#ffb677', legendFontSize: 12 },
  { name: 'Shops', amount: 3500, color: '#5e0a0a', legendFontColor: '#5e0a0a', legendFontSize: 12 },
  { name: 'Transfer', amount: 5974.68, color: '#145374', legendFontColor: '#145374', legendFontSize: 12 },
  { name: 'Travel', amount: 576.71, color: '#616f39', legendFontColor: '#616f39', legendFontSize: 12 },

];
const data = [, , 0.27];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  contentContainer: {
      flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
      height: 60,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
  },
  footerButtons: {
    backgroundColor: 'white',
  },
  footerIcons: {
    color: 'black',
  },
  balanceText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  redTransactionText:{
    color: 'red',
    fontWeight: 'bold',
    fontFamily:'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical:'center'
  },
  greenTransactionText:{
    color: 'green',
    fontWeight: 'bold',
    fontFamily:'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical:'center'
  },
  listDividerBackgroundColor:{
    backgroundColor: 'rgb(234,233,239)',
  },
  listDividerText:{
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 17,
    fontFamily:'Avenir-Medium'
  },
  ProgressChartAvailableText:{
    textAlignVertical: "center",
    textAlign: "center",
    marginRight:70,
    marginTop:-170,
    color: 'grey',
    fontSize: 23,
    fontFamily:'Avenir-Light'
  },
  ProgressChartAmountText:{
    textAlignVertical: "center",
    textAlign: "center",
    marginRight:80,
    marginTop:-142,
    fontWeight: 'bold',
    color: 'green',
    fontSize: 34,
    fontFamily:'AvenirNext-Heavy'
  },
  ProgressChartFromText:{
    textAlignVertical: "center",
    textAlign: "center",
    marginRight:70,
    marginTop:-106,
    color: 'grey',
    fontSize: 23,
    fontFamily:'Avenir-Light'},
  ListItemStyling:{
    borderBottomWidth: 0,
    marginTop:0},
  TransactionText:{
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily:'AvenirNext-Heavy'
  },
  LeftNoteText:{
    fontFamily:'Avenir-Light',
    fontSize: 17
  },
  RightNoteText:{
    fontFamily:'AvenirNext-Heavy',
    fontSize: 20,
    textAlignVertical:'center',
    borderBottomWidth: 0,
    marginTop: 5
  },
});


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

  constructor(props) {
    super(props);
    this.state = {
      entryItems : [
        {
          title:"Item 1"
        },
        {
          title:"Item 2"
        },
        {
          title:"Item 3"
        }
      ],
      selected: "key1",
      transactions: {},
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  componentDidMount() {
    const { member } = this.props;
    getTransactions(member.token,
      (res) => {
        this.setState({ transactions: res });
        const { transactions } = this.state;
      });
  }

  renderJSXAmount(transactionAmount){
    if (transactionAmount <= 0){
      return (
        <Text style={styles.redTransactionText}>${transactionAmount}</Text>
      );
    }else{
      return (
        <Text style={styles.greenTransactionText}>${transactionAmount}</Text>
      );
    }
  }

  formatDate(transactionDate){
    var month = new Array();
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";
    var splitDate = String(transactionDate).split('-')
    return month[splitDate[1].replace(/^0+/, '')] + " " + splitDate[2]
  }

  renderJSXDividers(transactionDate){
    if (transactionDate != global.lastDate){
      global.lastDate = transactionDate;
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
            <Text style={styles.listDividerText} >{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
  }

  renderJSXPieChartData(transactions){
    for (x in transactions){
      if (transactions[x].category[0] in global.pieDictionaryData){
        global.pieDictionaryData[transactions[x].category[0]] = global.pieDictionaryData[transactions[x].category[0]] + transactions[x].amount;
      }else{
        global.pieDictionaryData[transactions[x].category[0]] = transactions[x].amount;
      }
    }
    console.log(pieDictionaryData);
    // Object.entries(global.pieDictionaryData).forEach(([key, value]) => {
    //   var pieChartObject = new Object();
    //   pieChartObject.amount = value.toFixed(2);
    //   pieChartObject.color = 'rgba(131, 167, 234, 1)';
    //   pieChartObject.legendFontColor = '#7F7F7F';
    //   pieChartObject.legendFontSize = 15;
    //   pieChartObject.name = key;
    //   global.data2.push(pieChartObject);
    // });

  }
  _renderItem ({item, index}) {
          // console.log(item);
          if (index == 0){
            return (
                <View style={styles.slide}>
                <View>
                  <ProgressChart
                    data={data}
                    width={screenWidth}
                    height={220}
                  chartConfig={{
                    backgroundColor: '#eae9ef',
                    backgroundGradientFrom: '#eae9ef',
                    backgroundGradientTo: '#eae9ef',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(46,139,87, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  />
                </View >
                <Spacer size={10} />

                <View>
                <Text style={styles.ProgressChartAvailableText} >Available</Text>
                </View>

                <View>
                <Text style={styles.ProgressChartAmountText} >$762</Text>
                </View>

                <View>
                <Text style={styles.ProgressChartFromText} >from $3144.88</Text>
                </View>
                </View>
            );
          } else if (index == 1){
            return (
                <View style={styles.slide}>
                  <PieChart
                    data={global.data2}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                      backgroundColor: '#eae9ef',
                      backgroundGradientFrom: '#eae9ef',
                      backgroundGradientTo: '#eae9ef',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(46,139,87, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </View>
            );
          }else{
            return (
              <View style={styles.slide}>
                <LineChart
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [{
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ],
                    color: (opacity = 1) => `rgba(255,255,255, ${opacity})`, // optional
                    //strokeWidth: 5 // optional
                    //strokeWidth = 2;
                  }]
                }}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: '#e20071',
                  backgroundGradientFrom: '#11267a',
                  backgroundGradientTo: '#253d93',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
                />
              </View>
              );
          }

  }
  render = () => {
    const transactions = this.state.transactions.transactions;
    let transactionsListItems = [];
    { this.renderJSXPieChartData(transactions) }
    if (transactions) {
      transactionsListItems = transactions.map((transaction) => {
        //console.log(transaction);
        return (
          <View>
          { this.renderJSXDividers(transaction.date) }
          <ListItem style={styles.ListItemStyling} avatar>
            <Left style={styles.ListItemStyling}>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/x_card_2.png' }} />
            </Left>
            <Body style={styles.ListItemStyling}>
              <Text style={styles.TransactionText} >{transaction.name}</Text>
              <Text style = {styles.LeftNoteText} note>{transaction.category[0]}</Text>
            </Body>
            <Right style={styles.RightNoteText}>
              { this.renderJSXAmount(transaction.amount) }
            </Right>
          </ListItem>
          </View>
        );
      });
    } else {
      transactionsListItems = (
        <ListItem>
          <Text>No transactions</Text>
        </ListItem>
      );
    }
    return (
      <Container style={styles.container}>
      <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entryItems}
              renderItem={this._renderItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              height={0}
              marginTop={20}
            />
        <Content style={{ flex: 1 }}>
          <List>
            {transactionsListItems}
          </List>
          <Button onPress={() => {
            this.props.logout(() => {
              Actions.replace('Landing');
            });
          }}
          >
            <Text>
              Log Out
            </Text>
          </Button>
        </Content>
        {/* <View style={styles.footer}>
          <Button style={styles.footerButtons}>
            <Icon name="switch" style={styles.footerIcons}/>
          </Button>
          <Button style={styles.footerButtons}>
            <Icon name="add" style={styles.footerIcons}/>
          </Button>
          <Button style={styles.footerButtons}>
            <Icon name="person" style={styles.footerIcons}/>
          </Button>
        </View> */}
        <BottomBar/>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);
