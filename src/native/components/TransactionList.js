/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Text, View, Left, Right, Thumbnail, Body, ListItem,
} from 'native-base';
import styles from './style.js';

class TransactionList extends Component {
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

  render = () => {
    const { transactions } = this.props;
    return (
      <FlatList
        data={transactions}
        renderItem={this.renderListItem}
        keyExtractor={(item, index) => index.toString()}
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
