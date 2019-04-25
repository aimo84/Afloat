/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
import {
  View, Text, Form, Item, Input, Button, Container, Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transferAchToUser } from '../../actions/bank';
import FooterBar from './FooterBar';

// Joe: Inspiration taken from login.js file
class MakeTransaction extends Component {
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
      amount: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { member } = this.props;
    console.log(this.state.amount);
    this.props.transferAchToUser(member.token, 200);
  }

  render = () => {
    const { amount } = this.state;
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Input
                autoCapitalize="none"
                placeholder="Amount to Transfer"
                value={amount}
                keyboardType="number-pad"
                onChangeText={v => this.handleChange('amount', v)}
              />
            </Item>
            <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>
                  {'Submit'}
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
        <FooterBar />
      </Container>

    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(MakeTransaction);
