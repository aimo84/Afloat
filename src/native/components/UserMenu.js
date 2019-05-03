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
import { logout, getUserData } from '../../actions/member';

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

logout(){
  // this.props.logout(() => {
  //   Actions.replace('entry');
  // });
  Actions.replace('entry');
  //onsole.log(this.state.entryItems.balance);
}

render = () => {
  const { member } = this.props;
  console.log('settings page render(), member object:');
  console.log(member);
  return (
    <Container>

      <Content>
      <View style={{height: 150, alignItems:'center', justifyContent:'center', marginVertical: 25}}>
          <Image
            style={{width: 120, height: 120, alignItems:'center', justifyContent:'center', borderRadius:60, marginVertical: 10}}
            source={{uri: 'https://i.pinimg.com/originals/af/25/49/af25490494d3338afef00869c59fdd37.png'}}
          />
          <Text style={{fontWeight: 'bold',
          fontFamily: 'AvenirNext-Heavy',
          fontSize: 24}}> Deven Orie </Text>
      </View>
        <List>
          <ListItem avatar>
            <Left>
              <Icon name="md-person" style={styles.footerIcons} />
            </Left>
            <Body >
              <Text style={{fontWeight: 'bold',
              fontFamily: 'Avenir-Light',
              fontSize: 20}}  >Profile</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => Actions.mainSettings()} avatar>
            <Left>
              <Icon name="md-settings" style={styles.footerIcons} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold',
              fontFamily: 'Avenir-Light',
              fontSize: 20}}>Settings</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => this.logout()} avatar>
            <Left>
              <Icon name="md-log-out" style={styles.footerIcons} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold',
              fontFamily: 'Avenir-Light',
              fontSize: 20}}>Log Out</Text>
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
