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
import { Actions } from 'react-native-router-flux';

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


class UserMenu extends Component {
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

render = () => {
  const { member } = this.props;
  console.log('settings page render(), member object:');
  console.log(member);

  return (
    <Container>
      <Header>
        <Text style={styles.editName}>Deven Orie</Text>
        <FontAwesome name="pencil" style={styles.editIcon} />
      </Header>
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsweets/50/email.png' }} />
            </Left>
            <Body>
              <Text>Profile</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => Actions.mainSettings()} avatar>
            <Left>
              <Thumbnail source={{ uri: 'http://arenda-kmy.ru/images/iconmonstr-phone-icon.png' }} />
            </Left>
            <Body>
              <Text>Settings</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
      <FooterBar />
    </Container>

  );
}
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(UserMenu);
