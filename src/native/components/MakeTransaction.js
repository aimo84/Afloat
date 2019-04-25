/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
import {
  View, Text, Form, Item, Input, Button,
} from 'native-base';
// import { Dimensions } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transferAchToUser } from '../../actions/bank';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import Spacer from './Spacer';

class MakeTransaction extends Component {
  static propTypes = {
    member: PropTypes.shape({
      amount: PropTypes.string,
    }),
    // locale: PropTypes.string,
    // error: PropTypes.string,
    // success: PropTypes.string,
    // loading: PropTypes.bool.isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // error: null,
    // success: null,
    // locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      // password: '',
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
    // const { onFormSubmit } = this.props;
    // onFormSubmit(this.state)
    //   .then(() => Actions.entry())
    //   .catch(e => console.log(`Error: ${e}`));
  }

  render = () => {
    const { amount } = this.state;
    return (
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
    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(MakeTransaction);
