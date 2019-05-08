/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, Text, Form, Button, Container,Image,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import { transferAchToUser } from '../../actions/bank';
import FooterBar from './FooterBar';
import { Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import styles from './style.js';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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

// Joe: Inspiration taken from login.js file
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

  // handleChange = (name, val) => {
  //   this.setState({
  //     [name]: val,
  //   });
  // }

  handleSubmit = () => {
    const { member } = this.props;
    this.props.transferAchToUser(member.token, this.state.amount);
    Actions.replace('home');
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    return (
      <Container style={styles.container}>
      <View style={styles.slideLoanHistory}>
        <View>
          <Text style={styles.name}>
            Amount Owed:
          </Text>
          <View style={styles.spacer}>
          </View>
          <Text style={styles.balance}>
             ${this.state.amount}
          </Text>
          <Text style={styles.balanceTitle}>
            Subscription Renews 05/01
          </Text>
        </View>
      </View>
        <Content>
          <List>
            <ListItem style={styles.listDividerBackgroundColor} itemDivider>
              <Text style={styles.listDividerText} > Pending </Text>
            </ListItem>
            <ListItem style={styles.ListItemStyling} avatar>
              <Left style={styles.ListItemStyling} >
                <Thumbnail small source={{ uri: 'https://www.iconsdb.com/icons/preview/red/down-xxl.png' }} />
              </Left>
              <Body style={styles.ListItemStyling} >
                <Text style={styles.TransactionText} >Loan</Text>
              </Body>
              <Right>
                <Text style={styles.RightNoteText} note>$44</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.listDividerBackgroundColor} itemDivider>
              <Text style={styles.listDividerText} > Processed 5/20/19 </Text>
            </ListItem>
            <ListItem style={styles.ListItemStyling} avatar>
              <Left style={styles.ListItemStyling} >
                <Thumbnail small source={{ uri: 'https://www.iconsdb.com/icons/preview/green/up-xxl.png' }} />
              </Left>
              <Body style={styles.ListItemStyling} >
                <Text style={styles.TransactionText} >Deposit</Text>
              </Body>
              <Right>
                <Text style={styles.RightNoteText} note>$180</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.listDividerBackgroundColor} itemDivider>
              <Text style={styles.listDividerText} > Processed 4/4/19 </Text>
            </ListItem>
            <ListItem style={styles.ListItemStyling} avatar>
              <Left style={styles.ListItemStyling} >
                <Thumbnail small source={{ uri: 'https://www.iconsdb.com/icons/preview/red/down-xxl.png' }} />
              </Left>
              <Body style={styles.ListItemStyling} >
                <Text style={styles.TransactionText} >Loan</Text>
              </Body>
              <Right>
                <Text style={styles.RightNoteText} note>$315</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
        <FooterBar />
      </Container>

    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(LoanHistory);
