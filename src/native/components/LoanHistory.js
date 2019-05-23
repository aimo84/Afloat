/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import {
  Content, List, ListItem, Left, Body, Right, Thumbnail, View, Text, Container,
} from 'native-base';
import dateFormat from 'dateformat';
import { getLoanHistory, getTransactions } from '../../actions/bank';
import FooterBar from './FooterBar';
import styles from './style.js';

const stylesSlider = ScaledSheet.create({
  track: {
    height: '8@vs',
    borderRadius: '2@s',
  },
  thumb: {
    width: '31@s',
    height: '31@s',
    borderRadius: 48 / 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: '0.3@s',
  },
});

global.lastDate = 'date';

class LoanHistory extends Component {
  static propTypes = {
    member: PropTypes.shape({
      amount: PropTypes.string,
    }),
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: 124,
    };
  }

  componentDidMount = () => {
    const { member } = this.props;
    this.props.getTransactions(member.token, () => {});
  }

  handleSubmit = () => {
    const { member } = this.props;
    this.props.transferAchToUser(member.token, this.state.amount);
    Actions.replace('home');
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
      console.log('test');
      console.log(global.lastDate);
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
          <Text style={styles.listDividerText}>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    const { member, loanHistory } = this.props;

    let historyList = (<View />);


    if (loanHistory) {
      historyList = loanHistory.map((transfer) => {
        const loanDate = new Date(transfer.date);


        if (transfer.type === 'LOAN_DISBURSEMENT') {
          return (
            <View key={JSON.stringify(transfer)}>
              { this.renderJSXDividers(dateFormat(loanDate, 'dd-mm-yyyy')) }
              <ListItem style={styles.ListItemStyling} avatar>
                <Left style={styles.ListItemStyling}>
                  <Thumbnail small source={{ uri: 'https://img.icons8.com/ios/24/000000/down.png' }} />
                </Left>
                <Body style={styles.ListItemStyling}>
                  <Text style={styles.TransactionText}>Loan Recieved</Text>
                </Body>
                <Right>
                  <Text style={styles.RightNoteText} note>
$
                    {transfer.amount}
.00
                  </Text>
                </Right>
              </ListItem>
            </View>
          );
        }
        return (
          <View key={JSON.stringify(transfer)}>
            { this.renderJSXDividers(dateFormat(loanDate, 'dd-mm-yyyy')) }
            <ListItem style={styles.ListItemStyling} avatar>
              <Left style={styles.ListItemStyling}>
                <Thumbnail small source={{ uri: 'https://img.icons8.com/ios/24/000000/up.png' }} />
              </Left>
              <Body style={styles.ListItemStyling}>
                <Text style={styles.TransactionText}>Loan Repayed</Text>
              </Body>
              <Right>
                <Text style={styles.RightNoteText} note>
$
                  {transfer.amount}
.00
                </Text>
              </Right>
            </ListItem>
          </View>
        );
      });
    } else {
      historyList = (
        <ListItem style={styles.ListItemStyling} avatar>
          <Left style={styles.ListItemStyling}>
            <Thumbnail small source={{ uri: 'https://i.imgur.com/tiAaGh0.png' }} />
          </Left>
          <Body style={styles.ListItemStyling}>
            <Text style={styles.TransactionText}>hi</Text>
          </Body>
          <Right>
            <Text style={styles.RightNoteText} note>hi</Text>
          </Right>
        </ListItem>
      );
    }

    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.loanHeader}>
            History
          </Text>
          <List>
            {historyList}
          </List>
        </Content>
        <FooterBar />
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getLoanHistory,
  getTransactions,
};

const mapStateToProps = state => (
  {
    loanHistory: state.bank.loanHistory,
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoanHistory);
