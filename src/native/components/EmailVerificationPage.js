/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, Text, Container, Content, Button,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from './style.js';
import { getUserData } from '../../actions/member';

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
          <View style={styles.centerContainer}>
            {emailMessage}
            <Button onPress={this.handleButtonClicked} block><Text>Next</Text></Button>
          </View>
        </View>
      </Content>
    </Container>

  );
}
}

const mapDispatchToProps = {
  getUserData,
};


export default connect(null, mapDispatchToProps)(Settings);
