import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  Content, Container,
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
    console.log(this.props);
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
    // console.log('props');
    // console.log(index);

    if (index !== 2) {
      return (
        <View style={all.cardContainer}>
          <Text>{item.title}</Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book.
          It has survived not only five centuries, but also the leap into
          electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with
          desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      );
    }
    return (
      <Container style={{ marginTop: '30%', alignItems: 'center' }}>
        <Content>
          <Text className="lastCardTitle">
              Get Your Pay Day Loan Today!
          </Text>
          <Button primary title="Login" onPress={() => this.onLogInClick()} />
          <Button primary title="Sign Up" onPress={() => this.onSignUpClick()} />
        </Content>
      </Container>
    );
  }
}

export default Cards;
