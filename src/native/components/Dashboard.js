import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Content, Text, H1, H2, H3, Header, List, ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from './Spacer';


import { getTransactions } from '../../actions/bank';

const styles = StyleSheet.create({
  balanceText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});


class Dashboard extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      transactions: {},
    };
  }

  componentDidMount() {
    const { member } = this.props;
    getTransactions(member.token,
      (res) => {
        this.setState({ transactions: res });
        const { transactions } = this.state;
        console.log(transactions);
      });
  }


  render = () => (

    <Container>
      <Header>
        <Text style={styles.balanceText}>Bank balance $195.34</Text>
      </Header>
      <Content style={{ flex: 1 }}>
        <Spacer size={10} />
        <Text style={styles.dayText}>Today</Text>
        <List>
          <ListItem>
            <Text>Starbucks</Text>
            <Text>--$10.52</Text>
          </ListItem>
          <ListItem>
            <Text>Shell Gas Station</Text>
            <Text>--$39.93</Text>
          </ListItem>
          <ListItem>
            <Text>PCC Convenience Shops</Text>
            <Text>--$5.42</Text>
          </ListItem>
          <Spacer size={10} />
          <Text style={styles.dayText}>Yesterday</Text>
          <List>
            <ListItem>
              <Text>Starbucks</Text>
              <Text>--$10.52</Text>
            </ListItem>
          </List>
        </List>
      </Content>
    </Container>
  )
}


export default connect(null, null)(Dashboard);
