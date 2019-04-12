import React, { Component } from 'react';
import {
  View, Button, Text,
} from 'native-base';

import PlaidAuthenticator from 'react-native-plaid-link';


class LinkBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  onMessage = (data) => {
    if (typeof data.action !== 'undefined') {
      this.setState({ status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
      console.log(this.state.status);
    }

    // if (data.action === 'plaid_link-undefined::connected'){
    //
    // }
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
            selectAccount={false}
          />
        );
    }
  }
}

export default LinkBank;
