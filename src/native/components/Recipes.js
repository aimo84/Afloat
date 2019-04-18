import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Switch } from 'native-base';

import {
  FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import {
  Card, CardItem, Button,
} from 'native-base';


class RecipeListing extends Component {
  static defaultProps = {
    match: null,
  }

render = () => (
    <Container>
      <Header />
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/email.png' }} />
            </Left>
            <Body>
              <Text>Email</Text>
              <Text note>deven.orie@gmail.com</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'http://arenda-kmy.ru/images/iconmonstr-phone-icon.png' }} />
            </Left>
            <Body>
              <Text>Phone</Text>
              <Text note>347-208-1111</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/x_card_2.png' }} />
            </Left>
            <Body>
              <Text>Bank Account</Text>
              <Text note>XXXX-XXXX-0387</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/pen.png' }} />
            </Left>
            <Body>
              <Text>Referrals</Text>
              <Text note>5 referrals left</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/calendar.png' }} />
            </Left>
            <Body>
              <Text>History</Text>
              <Text note>18 transactions</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://secure.gravatar.com/avatar/fbd889ef4771f055451c6fc5e7d79651?s=49&d=identicon&r=pg' }} />
            </Left>
            <Body>
              <Text>Notifications</Text>
              <Text note>On</Text>
            </Body>
            <Right>
              <Switch value={true} />
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/search.png' }} />
            </Left>
            <Body>
              <Text>Help</Text>
              <Text note>App Information</Text>
            </Body>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>

  );
}

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

RecipeListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default RecipeListing;
