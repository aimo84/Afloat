import React, { Component } from 'react';
import {
  Container, Content, Text, H1, H2, H3, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from './Spacer';


import { getTransactions, transferAchToUser, enrollSubscription } from '../../actions/bank';
import { logout } from '../../actions/member';


class Transactions extends Component {
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


  render = () => {
    const { member } = this.props;

    return (
      <Container style={{ marginTop: 22 }}>
        <Content style={{ flex: 1 }}>
          <Spacer size={30} />
          <H1>
                  Heading 1
          </H1>
          <Spacer size={10} />
          <Text>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                  tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
            {' '}
          </Text>

          <Spacer size={30} />
          <H2>
                  Heading 2
          </H2>
          <Spacer size={10} />
          <Text>
                  Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                  magna mollis euismod. Donec sed odio dui.
            {' '}
          </Text>

          <Spacer size={30} />
          <H3>
                  Heading 3
          </H3>
          <Spacer size={10} />
          <Text>
                  Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                  mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                  magna mollis euismod. Donec sed odio dui.
            {' '}
          </Text>
          <Button onPress={() => {
            this.props.logout(() => {
              Actions.replace('Landing');
            });
          }}
          >
            <Text>
              Log Out
            </Text>
          </Button>
          <Button onPress={() => {
            this.props.transferAchToUser(member.token, 200);
          }}
          >
            <Text>
              Initiate Transfer to USER
            </Text>
          </Button>
          <Button onPress={() => {
            enrollSubscription(member.token);
          }}
          >
            <Text>
              Enroll Subscription
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(Transactions);
