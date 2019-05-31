import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button, View,
} from 'native-base';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { updateEmail } from '../../actions/member';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function wph(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

class EditEmailPage extends React.Component {
  constructor(props) {
    super(props);
    const { member } = this.props;
    this.state = {
      email: member.email,
      token: member.token,
      error: '',
      successMessage: '',
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
    onFormSubmit(this.state)
      .then(() => {
        this.setState({ successMessage: 'Email Updated', error: '' });
      })
      .catch((err) => {
        console.log('handleSubmitError', err);
        this.setState({ successMessage: '', error: err.errorMessage || 'Error Updating Email' }); throw err;
      });
  }

  render() {
    const { loading, error, successMessage } = this.state;
    const { email } = this.state;
    let message = null;
    if (error) {
      message = <Messages message={error} />;
    } else if (successMessage) {
      message = <Messages message={successMessage} type="success" />;
    }
    if (loading) return <Loading />;
    return (
      <Container>
        <Content
          padder
          style={{ backgroundColor: 'white' }}
        >
          <Header
            title="Update Email"
            style={{ fontFamily: 'Roboto' }}
          />
          {message}
          <Form>

            <Item stackedLabel>
              <Label>
                Email
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
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
                Save
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  onFormSubmit: updateEmail,
};

export default connect(null, mapDispatchToProps)(EditEmailPage);
