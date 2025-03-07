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
import { Actions } from 'react-native-router-flux';
import { AppRegistry, Image } from 'react-native';
import FooterBar from './FooterBar';
import { logout, getUserData } from '../../actions/member';
import styles from './style.js';

const screenWidth = Dimensions.get('window').width;


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

  logout() {
    this.props.logout(() => {
      Actions.replace('entry');
    });
  }

render = () => {
  const { member } = this.props;
  console.log('settings page render(), member object:');
  console.log(member);
  return (
    <Container style={{ backgroundColor: 'white' }}>
      <Content>
        <View style={styles.UserIconStylingView}>
          <Text style={styles.UserNameStyling}>
            {' '}
            {member.firstname}
            {' '}
            {member.lastname}
          </Text>
        </View>
        <List>
          <ListItem avatar>
            <Left>
              <Icon name="md-person" style={styles.footerIcons} />
            </Left>
            <Body>
              <Text style={styles.UserMenuItems}>Profile</Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left />
            <Body style={{ paddingLeft: '5%' }}>
              <Text style={styles.UserMenuItems}>
Email:
                {'  '}
                <Text style={{ fontWeight: 'normal' }}>
                  {member.email}
                </Text>
              </Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left />
            <Body style={{ paddingLeft: '5%' }}>
              <Text style={styles.UserMenuItems}>
Bank:
                {'  '}
                <Text style={{ fontWeight: 'normal' }}>
                  Plaid Checking - XXXXXXX0000
                </Text>
              </Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => this.logout()} avatar>
            <Left>
              <Icon name="md-log-out" style={styles.footerIcons} />
            </Left>
            <Body>
              <Text style={styles.UserMenuItems}>Log Out</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
      <FooterBar />
    </Container>

  );
}
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(UserMenu);
