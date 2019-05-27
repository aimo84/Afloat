/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  View, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Switch,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import FooterBar from './FooterBar';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editName: {
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 6,
  },
  editIcon: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#777c84',
  },
});

class Settings extends Component {
  // TODO check if match propType is required, if not req. remove it
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    match: null,
  }

  // <Text style={styles.editName}>Deven Orie</Text>
  // <FontAwesome name="pencil" style={styles.editIcon} />
render = () => {
  const { member } = this.props;
  console.log('settings page render(), member object:');

  return (
    <Container style={{ backgroundColor: 'white' }}>

      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/email.png' }} />
            </Left>
            <Body>
              <Text>Email</Text>
              <Text note>{member.email}</Text>
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
              <Switch value />
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
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(Settings);
