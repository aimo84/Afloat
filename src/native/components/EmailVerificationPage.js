/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, Text, Container, Content, Button,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import styles from './style.js';
import { getUserData } from '../../actions/member';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { error: false };
  }

  handleButtonClicked = () => {
    const { member } = this.props;
    this.props.getUserData(member.token, (res) => {
      if (res.verified) {
        Actions.replace('home');
      } else {
        this.setState({
          error: true,
        });
      }
    });
  }

render = () => {
  const { member } = this.props;
  let emailMessage = null;
  if (!this.state.error) {
    emailMessage = (
      <Text style={styles.emailVerificationText}>
    An email has been sent to
        {' '}
        {member.email}
        {' '}
    Please click the link in the email we sent to verify your email!
      </Text>
    );
  } else {
    emailMessage = (
      <Text style={[styles.emailVerificationText, styles.emailErrorText]}>
    Your email does not appear to be
          verified.
    Please visit your email:
        {' '}
        {member.email}
        {' '}
    and try clicking the link again.
      </Text>
    );
  }

  return (
    <Container style={{ backgroundColor: 'white' }}>
      <Content>
        <View>
          <View style={
            styles.centerContainer
          //   {
          //   flexDirection: 'column',
          //   flex: 1,
          //   justifyContent: 'center',
          // }
        }
          >
            {emailMessage}
          </View>
        </View>
      </Content>
      <Button
        block
        onPress={this.handleButtonClicked}
        style={{
          // display: 'flex',
          alignSelf: 'center',
          backgroundColor: '#21D0A5',
          width: wp(60),
          marginBottom: verticalScale(30),
          borderRadius: 35,
          // justifyContent: 'center',
        }}
      >
        <Text>
                Next
        </Text>
      </Button>
    </Container>

  );
}
}
/* <Button onPress={this.handleButtonClicked}
block style={{ backgroundColor: '#21D0A5' }}><Text>Next</Text></Button> */


const mapDispatchToProps = {
  getUserData,
};


export default connect(null, mapDispatchToProps)(Settings);
