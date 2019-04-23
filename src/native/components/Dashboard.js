import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Segment,Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator,
} from 'native-base';
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

import { getTransactions } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';
global.lastDate = "date";

const styles = StyleSheet.create({
  balanceText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 18,
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
        <Text style={{ color: 'red',fontWeight: 'bold'}}>${transactionAmount}</Text>
      );
    }else{
      return (
        <Text style={{ color: 'green',fontWeight: 'bold'}}>${transactionAmount}</Text>
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
        <ListItem itemDivider>
            <Text>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
  }

  render = () => {
    const data = [, , 0.8];
    const transactions = this.state.transactions.transactions;
    let transactionsListItems = [];
    if (transactions) {
      transactionsListItems = transactions.map((transaction) => {
        //console.log(transaction);
        return (
          <View>
          { this.renderJSXDividers(transaction.date) }
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/x_card_2.png' }} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}} >{transaction.name}</Text>
              <Text note>{transaction.category}</Text>
            </Body>
            <Right>
              { this.renderJSXAmount(transaction.amount) }
              <Text note>{transaction.date}</Text>
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
      <Container>
        <Content style={{ flex: 1 }}>
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
          <Text style={{textAlignVertical: "center",textAlign: "center", marginRight:70, marginTop:-178, color: 'grey', fontSize: 23, fontFamily:'Avenir-Light'}} >Available</Text>
          </View>

          <View>
          <Text style={{textAlignVertical: "center",textAlign: "center", marginRight:80, marginTop:-145, fontWeight: 'bold', color: 'green', fontSize: 34, fontFamily:'AvenirNext-Heavy'}} >$762</Text>
          </View>

          <View>
          <Text style={{textAlignVertical: "center",textAlign: "center", marginRight:70, marginTop:-108, color: 'grey', fontSize: 23, fontFamily:'Avenir-Light'}} >from $3144.88</Text>
          </View>

          <List>
            {transactionsListItems}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);
