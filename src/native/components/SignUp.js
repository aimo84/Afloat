import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function wph(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    console.log('before component call');
    onFormSubmit(this.state)
      .then(() => {
        console.log('after component call');
        Actions.replace('emailVerification');
      })
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    console.log('signup');
    console.log(this.props);
    if (loading) return <Loading />;

    return (
      <Container>
        <Content
          padder
          style={{ backgroundColor: 'white' }}
        >
          <Header
            title="Sign Up"
            content="Never pay an overdraft fee again!"
            style={{ fontFamily: 'Roboto' }}
          />

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label>
                First Name
              </Label>
              <Input onChangeText={v => this.handleChange('firstname', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Last Name
              </Label>
              <Input onChangeText={v => this.handleChange('lastname', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Email
              </Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Password
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Confirm Password
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />

            <Button
              block
              onPress={this.handleSubmit}
              style={{
                display: 'flex',
                alignSelf: 'center',
                backgroundColor: '#21D0A5',
                width: wp(60),
                borderRadius: 35,
                justifyContent: 'center',
              }}
            >
              <Text>
                Sign Up
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
