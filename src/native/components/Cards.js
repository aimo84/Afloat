import React from 'react';
import {
  View, Text, Image, Dimensions,
} from 'react-native';
import {
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import all from './style.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function wph(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const widthw = wp(70);
const heighth = wph(70);

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
    Actions.signUp({ testing: false });
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
          <View style={{
            display: 'flex',
            alignItems: 'center',
            width: wp(80),
            height: heighth,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          >
            <Text style={{
              textAlign: 'center', padding: '10%', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 24,
            }}
            >
            Always make it to payday, worry-free
            </Text>
            <Image
              style={{ width: '100%', height: '40%', marginTop: '10%' }}
              source={{ uri: 'https://cdn.dribbble.com/users/1114591/screenshots/6393431/capture_d__cran_2019-02-11___16.55.18_4x.png' }}
            />
            <Text style={{
              textAlign: 'left', padding: '10%', fontFamily: 'Lato_regular', fontSize: 16,
            }}
            >
            Never run short on cash again. Get up to $250 exactly when needed. No credit check. No interest.
            </Text>
          </View>
        );
        break;
      }
      case 1: {
        return (
          <View style={{
            display: 'flex',
            alignItems: 'center',
            width: wp(80),
            height: heighth,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          >
            <Text style={{
              textAlign: 'center', padding: '10%', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 24,
            }}
            >
          Recieve Money Next Day
            </Text>
            <Image
              style={{ width: '100%', height: '40%', marginTop: '10%' }}
              source={{ uri: 'https://cdn.dribbble.com/users/2170284/screenshots/6332421/payment.jpg' }}
            />
            <Text style={{
              textAlign: 'left', padding: '10%', fontFamily: 'Lato_regular', fontSize: 16,
            }}
            >
            Afloat funds are available to you on the next business day. Recieve cash when you need it.
            </Text>
          </View>
        );
        break;
      }
      default: {
        return (
          <View style={all.cardContainer}>
            <Text style={{
              textAlign: 'center', padding: '10%', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 24,
            }}
            >
        Get Started
            </Text>
            <View style={{ paddingTop: '30%' }}>
              <Button
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  backgroundColor: '#21D0A5',
                  width: wp(60),
                  borderRadius: 35,
                  justifyContent: 'center',
                }}
                onPress={() => this.onSignUpClick()}
              >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                Sign Up
                </Text>
              </Button>
            </View>
            <View style={{ paddingTop: '15%', width: '100%' }}>
              <Button
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  backgroundColor: '#21D0A5',
                  width: wp(60),
                  borderRadius: 35,
                  justifyContent: 'center',
                }}
                onPress={() => this.onLogInClick()}
              >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
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
