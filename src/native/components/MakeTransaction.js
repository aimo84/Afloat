/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, Text, Form, Button, Container,
} from 'native-base';
import { Animated } from 'react-native';
import Animation from 'lottie-react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import Moment from 'moment-business-days';

import { transferAchToUser } from '../../actions/bank';
import styles from './style.js';

const stylesSlider = ScaledSheet.create({
  track: {
    height: '8@vs',
    borderRadius: '2@s',
  },
  thumb: {
    width: '31@s',
    height: '31@s',
    borderRadius: 48 / 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: '0.3@s',
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
      amount: 75,
      showConfirm: false,
      progress: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { member } = this.props;
    this.setState({ showConfirm: true });
    this.props.transferAchToUser(member.token, this.state.amount, () => {
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start(() => {
        Actions.pop();
        this.props.updateUser();
      });
    });
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    const { showConfirm } = this.state;

    let depositeDate = '';
    const nextBusinessDay = Moment(Moment(), 'DD-MM-YYYY').nextBusinessDay();
    const tomorrow = Moment().add(1, 'days').format('MM/DD/YYYY');
    console.log('Moment');

    console.log(nextBusinessDay);
    console.log(Moment().add(1, 'days'));
    if (Moment().add(1, 'days').isSame(nextBusinessDay, 'day')) {
      console.log(nextBusinessDay);
      console.log(Moment(Moment(), 'DD-MM-YYYY').add(1, 'days').format('MM/DD/YYYY'));
      depositeDate = 'Tomorrow';
    } else {
      depositeDate = nextBusinessDay.format('MM/DD/YYYY');
    }


    if (showConfirm) {
      return (
        <Container style={styles.container}>
          {/* <View style={styles.wrapper}> */}
          <Form style={styles.form}>
            <Text style={styles.payMeText}>
                   Pay me
            </Text>
            <Text style={styles.amount}>
                   $
              {this.state.amount}
            </Text>
          </Form>
          <View style={styles.noticeView}>
            <View style={{ height: verticalScale(90) }} />
            <Animation
              ref={(animation) => {
                this.animation = animation;
              }}
              style={{
                width: 380,
                height: 380,
              }}
              loop={false}
              source={require('../../images/confirm.json')}
              progress={this.state.progress}
              resizeMode="cover"
            />
          </View>
        </Container>

      );
    }
    return (
      <Container style={styles.container}>
        {/* <View style={styles.wrapper}> */}
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
            minimumValue={50}
            maximumValue={200}
            step={5}
            minimumTrackTintColor="#efefef"
            maximumTrackTintColor="#efefef"
            style={styles.slider}
            trackStyle={stylesSlider.track}
            thumbStyle={stylesSlider.thumb}
            onValueChange={amount => this.setState({ amount })}
          />
        </Form>
        <View style={styles.noticeView}>
          <View style={{ height: verticalScale(90) }} />
          <Text style={styles.smallNoticeText}>
              Deposited in your bank account:
          </Text>
          <Text style={styles.bigNoticeText}>
            {depositeDate}
          </Text>
          <Text style={styles.smallNoticeText}>
                Deducted from your paycheck:
          </Text>
          <Text style={styles.bigNoticeText}>
                Apr 30
          </Text>
          <View style={{ height: verticalScale(40) }} />
        </View>
        <View style={styles.bottom}>
          <Button full success onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
