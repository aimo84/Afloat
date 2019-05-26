import React, { Component } from 'react';
import { Alert } from 'react-native';

import {
  View, Button, Text,
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PlaidAuthenticator from 'react-native-plaid-link';
import { getUserData } from '../actions/member';


// eslint-disable-next-line
import { addUserToBank } from '../actions/bank'

class LinkBank extends Component {
  static propTypes = {
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
    addUserToBank: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
    Actions.replace('emailVerification');
  }

  onMessage = (data) => {
    const { member } = this.props;
    if (typeof data.action !== 'undefined') {
      this.setState({ status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
    }

    if (data.action === 'plaid_link-undefined::connected') {
      const publicToken = data.metadata.public_token;
      const accountId = data.metadata.account_id;
      console.log('account id');
      // console.log(accountId);
      // eslint-ignore-next-line
      this.props.addUserToBank(member.token, publicToken, accountId,
        () => {
          console.log('getting user data');
          // console.log(member.token);
          Actions.replace('home');
        });
    }
  }

  render = () => {
    const { status } = this.state;

    switch (status) {
      case 'EXIT':
        return (
          <View style={{
            display: 'flex', direction: 'column', width: 500, height: 500, justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Text> Login with Bank </Text>
            <Button title="Link Bank Account" onPress={() => this.setState({ status: '' })}>
              <Text>
              Login with Plaid
              </Text>
            </Button>
          </View>
        );
      default:
        return (
          <PlaidAuthenticator
            onMessage={(data) => { this.onMessage(data); }}
            publicKey="beae29cb016901b1a1d8ac65538e8a"
            env="sandbox"
            product="auth,transactions"
            clientName="QuantWeb"
            selectAccount
          />
        );
    }
  }
}

export default connect(null, { addUserToBank })(LinkBank);
