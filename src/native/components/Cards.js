import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import {
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import all from './style.js';


class Cards extends React.Component {
  // componentWillMount() {
  //   if (1 > 0) {
  //     Actions.replace('home');
  //   }
  // }
  componentWillMount() {
    console.log('yay');
    // console.log(this.props);
    const { member } = this.props;
    if (member && member.token && member.token.length > 0) {
      // TODO: Verify token is correct
      Actions.replace('home');
    }
  }

  goToBank = () => {
    Actions.linkBank();
  };

  onSignUpClick = () => {
    Actions.signUp();
  }

  onLogInClick = () => {
    Actions.login();
  }

  render() {
    // console.log(all);
    // eslint-disable-next-line
    const { item, index } = this.props;
    // console.log('props')
    console.log('index:');
    // console.log(index);
    switch (index) {
      case 0: {
        return (
          <View style={all.cardContainer}>
            <Text style={{ textAlign: 'center', paddingTop: '10%' }}>
            Connect your bank account
            </Text>
            <Image
              style={{ width: '100%', height: '40%', marginTop: '30%' }}
              source={{ uri: 'https://cdn.dribbble.com/users/1114591/screenshots/6393431/capture_d__cran_2019-02-11___16.55.18_4x.png' }}
            />
          </View>
        );
        break;
      }
      case 1: {
        return (
          <View style={all.cardContainer}>
            <Text style={{ textAlign: 'center', paddingTop: '10%' }}>
            Manage and access your income, when you need it.
            </Text>
            <Image
              style={{ width: '100%', height: '40%', marginTop: '30%' }}
              source={{ uri: 'https://cdn.dribbble.com/users/2170284/screenshots/6332421/payment.jpg' }}
            />
          </View>
        );
        break;
      }
      default: {
        return (
          <View style={all.cardContainer}>
            <Text style={{ textAlign: 'center', paddingTop: '10%' }}>
                  Create your account today!
            </Text>
            <View style={{ paddingTop: '30%', paddingLeft: '18%' }}>
              <Button style={{ width: '80%', justifyContent: 'center' }} onPress={() => this.onSignUpClick()}>
                <Text style={{ color: 'white' }}>
                Sign Up
                </Text>
              </Button>
            </View>
            <View style={{ paddingTop: '15%', width: '100%', paddingLeft: '18%' }}>
              <Button style={{ width: '80%', justifyContent: 'center' }} onPress={() => this.onLogInClick()}>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                Log In
                </Text>
              </Button>
            </View>
          </View>
        );
        break;
      }
    }
  }
}

export default Cards;
