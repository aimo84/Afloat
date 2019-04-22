import React from 'react';
import {
  Container, Content, Text, H1, Button,
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
    return (
      <Container>
        <Content padder>
          <Spacer size={30} />
          <H1>
              Welcome to our app
          </H1>
          <Spacer size={10} />
          <Text>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo,
              tortor mauris condimentum nibh, ut fermentum massa justo sit amet
              risus. Etiam porta sem
              malesuada magna mollis euismod. Donec sed odio dui.
            {' '}
          </Text>
          <Button onPress={() => this.onSignUpClick()}>
            <Text>
                Sign Up
            </Text>
          </Button>
          <Button onPress={() => this.onLogInClick()}>
            <Text>
                Log In
            </Text>
          </Button>
          <Button>
            <Text>
                Check State
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


export default Landing;
