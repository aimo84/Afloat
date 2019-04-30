/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Text, Form, Item, Input, Button, Container, Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { transferAchToUser } from '../../actions/bank';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
  },
  form: {
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 90,
    paddingHorizontal: 20,
    marginBottom: 90,
    backgroundColor: '#FFFFFF',
  },
  amount: {
    fontSize: 83,
    color: '#489e48',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  payMeText: {
    fontSize: 24,
    color: '#489e48',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    height: 75,
  },
  slider: {
    width: '90%',
  },
  sliderTrack: {
    backgroundColor: '#c2c3c4',
  },
  sliderThumb: {
    width: 35,
    height: 20,
  },
  smallNoticeText: {
    fontSize: 17,
    color: '#8b8e8b',
  },
  bigNoticeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noticeView: {
    alignItems: 'center',
    alignContent: 'center',
  },
});

const stylesSlider = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 2,
  },
  thumb: {
    width: 31,
    height: 31,
    borderRadius: 48 / 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.3,
  },
});

// Joe: Inspiration taken from login.js file
class MakeTransaction extends Component {
  static propTypes = {
    member: PropTypes.shape({
      amount: PropTypes.string,
    }),
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: 30,
    };
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { member } = this.props;
    this.props.transferAchToUser(member.token, this.state.amount);
    Actions.replace('home');
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    return (
      <Container style={styles.container}>
        {/* <Content> */}
        <Form style={styles.form}>
          <Text style={styles.payMeText}>
                 Pay me
          </Text>
          <Text style={styles.amount}>
                 $
            {this.state.amount}
          </Text>
          <Slider
            value={this.state.amount}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#efefef"
            maximumTrackTintColor="#efefef"
            style={styles.slider}
            trackStyle={stylesSlider.track}
            thumbStyle={stylesSlider.thumb}
            onValueChange={amount => this.setState({ amount })}
          />
        </Form>
        <View style={styles.noticeView}>
          <Text style={styles.smallNoticeText}>
              Deducted from your paycheck:
          </Text>
          <Text style={styles.bigNoticeText}>
              Apr 30
          </Text>
          <View style={{ height: 18 }} />
          <Text style={styles.smallNoticeText}>
              Deposited in your bank account:
          </Text>
          <Text style={styles.bigNoticeText}>
              Tommorow
          </Text>
        </View>
        {/* </Content> */}
        <View style={styles.bottom}>
          <Button full success onPress={this.handleSubmit} style={styles.button}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Container>

    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(MakeTransaction);
