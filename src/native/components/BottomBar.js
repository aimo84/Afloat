/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Text, Form, Item, Input, Icon, Button,
} from 'native-base';
// import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { transferAchToUser } from '../../actions/bank';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import Spacer from './Spacer';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
  footer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  footerButtons: {
    backgroundColor: 'white',
  },
  footerIcons: {
    color: 'black',
  },
});

class BottomBar extends Component {
  static propTypes = {
    member: PropTypes.shape({
      amount: PropTypes.string,
    }),
    // locale: PropTypes.string,
    // error: PropTypes.string,
    // success: PropTypes.string,
    // loading: PropTypes.bool.isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // error: null,
    // success: null,
    // locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      // password: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    // const { member } = this.props;
    console.log(this.state.amount);
    // this.props.transferAchToUser(member.token, 200);
    // const { onFormSubmit } = this.props;
    // onFormSubmit(this.state)
    //   .then(() => Actions.entry())
    //   .catch(e => console.log(`Error: ${e}`));
  }

  onSettingsPressed = () => {
    Actions.mainSettings();
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    return (
      <View style={styles.footer}>
        <Button style={styles.footerButtons}>
          <Icon name="switch" style={styles.footerIcons} />
        </Button>
        <Button style={styles.footerButtons}>
          <Icon name="add" style={styles.footerIcons} />
        </Button>
        <Button style={styles.footerButtons} onPress={this.onSettingsPressed}>
          <Icon name="person" style={styles.footerIcons} />
        </Button>
      </View>
    );
  }
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(BottomBar);
