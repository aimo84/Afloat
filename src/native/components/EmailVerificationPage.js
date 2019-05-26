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

    this.state = { error: '' };
  }

  handleButtonClicked = () => {
    console.log('next button clicked');
    const { member } = this.props;
    this.props.getUserData(member.token, (res) => {
      console.log('9x');
      console.log(res);
      if (res.verified) {
        console.log('9z user verified');
        Actions.replace('home');
      } else {
        console.log('9z user not verified');
        this.setState({
          error: `Sorry, your email does not a
        ppear to be verified. Please click the email verification link
        again`,
        });
      }
    });
  }

render = () => {
  const { member } = this.props;
  console.log('settings page render(), member object:'); // ha
  console.log(member);
  return (
    <Container style={{ backgroundColor: 'white' }}>
      <Content>
        <View>
          <View style={styles.centerContainer}>
            <Text style={styles.emailVerificationText}>
An email has been sent to
              {' '}
              {member.email}
              {' '}
Please click the link in the email we sent to verify your email!
            </Text>
            <Text style={styles.emailErrorText}>{this.state.error || ''}</Text>
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
