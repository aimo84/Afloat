import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Segment, Container, Content, H1, H2, H3, Header, List, ListItem, Button, Left, Body, Right, Thumbnail, Text, Icon, Switch,
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
      transactions: {},
    };
  }

  componentDidMount() {
    const { member } = this.props;
    getTransactions(member.token,
      (res) => {
        this.setState({ transactions: res });
        const { transactions } = this.state;
      });
  }

  render = () => {
    const transactions = this.state.transactions.transactions;
    let transactionsListItems = [];
    if (transactions) {
      transactionsListItems = transactions.map((transaction) => {
        // Deven you can look in terminal to see transaction js object
        // printed out so you know what data you could potentially display in UI
        // e.g. name, amount, date, etc
        console.log(transaction);
        console.log('transaction printed');
        return (
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/x_card_2.png' }} />
            </Left>
            <Body>
              <Text>{transaction.name}</Text>
            </Body>
            <Right>
              <Text>{transaction.amount}</Text>
            </Right>
          </ListItem>
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
        <Segment>
          <Button first last active>
            <Text>My Account</Text>
          </Button>
          <Button>
            <Text>Finances</Text>
          </Button>
        </Segment>

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
          <Spacer size={10} />
          <Text style={styles.dayText}>Bank balance $195.34</Text>
          <List>
            {transactionsListItems}
          </List>
        </Content>
        <View>
          <Text>
          Bezier Line Chart
          </Text>
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
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);
