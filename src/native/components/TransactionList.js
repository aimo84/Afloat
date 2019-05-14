/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Text, View, Left, Right, Thumbnail, Body, ListItem, List,
} from 'native-base';
import styles from './style.js';

class TransactionList extends Component {
  state = {
    list: [
    ],
    offset: 0,
    limit: 12,
    gettingMoreList: false,
    transactions: [],
  };

  componentDidMount() {
    console.log(`9z length ${this.props.transactions.length}`);
    this.setState(prevState => ({
      ...prevState,
      transactions: this.getTestTransactions(),
    }));
    console.log(this.getTestTransactions().length);
    console.log(`8c ${this.state.list.length}`);
    this.getNextCoupleTransactions();
  }

  // lazy loading adapted from
  // https://stackoverflow.com/questions/49648292/how-to-apply-lazy-loading-in-flatlist-in-react-native


  getNextCoupleTransactions = () => {
    console.log('fetching more');
    // console.log(this.props.transactions.length);
    const {
      offset, limit, list, transactions,
    } = this.state;
    this.setState(prevState => ({
      ...prevState,
      list: list.concat(prevState.transactions.slice(offset, offset + limit)),
      offset: offset + limit,
    }));
  }

  // Outside of the component
   isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
     const paddingToBottom = 90; // Distance from the bottom you want it to trigger.
     return layoutMeasurement.height + contentOffset.y
        >= contentSize.height - paddingToBottom;
   };

    getTestTransactions = () => {
      const transactions = [];
      for (let i = 0; i < 250; i += 1) {
        transactions.push({
          date: '2019-01-01',
          uri: 'https://img.icons8.com/ios-glyphs/90/000000/museum.png',
          name: `${i}ACH Electronic CreditGUSTO PAY 123456`,
          category: [
            'Debit',
            'Transfer',
          ],
          amount: 1000,
        });
      }
      return transactions;
    }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    console.log('top of render method of flatlist');
    console.log(this.state.transactions.length, this.state.list.length);
    // const { transactions } = this.props;
    console.log(this.state.list.length);
    console.log('cotote');
    return (
      <FlatList
        // style={{ flex: 1 }}
        extraData={this.state}
        data={this.state.list}
        // ListHeaderComponent={MyHeaderComponent}
        // contentContainerStyle={{ flexGrow: 1 }}
        // renderItem={({ item }) => <Text>{item.key}</Text>}
        renderItem={this.renderListItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.getNextCoupleTransactions}
        onEndReachedThreshold={0.999}
      />
    );
  }

  renderJSXAmount = (transactionAmount) => {
    if (transactionAmount <= 0) {
      return (
        <Text style={styles.redTransactionText}>
$
          {(transactionAmount * -1).toFixed(2)}
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

  formatDate = (transactionDate) => {
    const month = [];
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

  renderJSXDividers = (transactionDate) => {
    if (transactionDate !== global.lastDate) {
      global.lastDate = transactionDate;
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
          <Text style={styles.listDividerText}>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
    return null;
  }

  renderListItem = (transactionWrapper) => {
    const transaction = transactionWrapper.item;
    // console.log(transaction);
    // console.log('fun');
    // console.log(transaction);
    return (
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
    );
  }
}

export default TransactionList;
