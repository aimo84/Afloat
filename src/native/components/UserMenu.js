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
import { AppRegistry, Image } from 'react-native';

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

      <Content>
      <View style={{height: 150, alignItems:'center', justifyContent:'center'}}>
          <Image
            style={{width: 120, height: 120, alignItems:'center', justifyContent:'center', borderRadius:60}}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
          <Text > Deven Orie </Text>
      </View>
        <List>
          <ListItem avatar>
            <Left>
              <Icon name="md-person" style={styles.footerIcons} />
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
              <Icon name="md-settings" style={styles.footerIcons} />
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
