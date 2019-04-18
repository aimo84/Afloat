import React, { Component } from 'react';
import {
  Container, Content, Text, H1, H2, H3, Header,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spacer from './Spacer';


import { getTransactions } from '../../actions/bank';


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
        <Text>Bank balance $195.34</Text>
      </Header>
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
      </Content>
    </Container>
  )
}


export default connect(null, null)(Dashboard);
