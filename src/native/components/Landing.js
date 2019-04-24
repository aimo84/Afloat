import React from 'react';
import {
  Container, Content, Text, H1, Button,Thumbnail,Header
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from './Spacer';

class Landing extends React.Component {
  onSignUpClick = () => {
    Actions.signUp();
  }

  onLogInClick = () => {
    Actions.login();
  }

  render() {
    const uri = "https://cdn1.iconfinder.com/data/icons/personal-business-finance-set-1/256/Personal__Business_Finance-06-512.png";
    return (
      <Container style={{marginTop: '30%', alignItems: 'center'}}>
      <Header />
        <Content>
          <Thumbnail square large source={{uri: uri}} />
        </Content>
        <H1>
            Welcome to our app
        </H1>
        <Content >
          <Text>
              Get Your Pay Day Loan Today!
          </Text>
          <Button style={{width: '150%', marginTop: '10%'}} onPress={() => this.onSignUpClick()}>
            <Text style={{alignItems: 'center'}}>
                Sign Up
            </Text>
          </Button>
          <Button style={{width: '150%', marginTop: '10%'}} onPress={() => this.onLogInClick()}>
            <Text>
                Log In
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default Landing;
