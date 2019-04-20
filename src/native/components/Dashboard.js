import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Content, Text, H1, H2, H3, Header, List, ListItem, Button,
} from 'native-base';
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
          <ListItem key={transaction.transaction_id}>
            <Text>{transaction.name}</Text>
            <Text>--$10.52</Text>
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
        <Header>
          <Text style={styles.balanceText}>Bank balance $195.34</Text>
        </Header>
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
          <Text style={styles.dayText}>Today</Text>
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
