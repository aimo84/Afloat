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
import { transferAchToUser } from '../../actions/bank';
import FooterBar from './FooterBar';

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 70,
  },
  amount: {
    fontSize: 70,
    color: '#A7D09F',
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
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
    fontSize: 25,
  },
  bigNoticeText: {
    fontSize: 38,
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
    console.log(this.state.amount);
    this.props.transferAchToUser(member.token, 200);
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    // const { amount } = this.state;
    return (
      <Container>
        <Content padder>
          <Form style={styles.form}>
            {/* <Item stackedLabel>
              <Input
                autoCapitalize="none"
                placeholder="Get paid"
                value={amount}
                keyboardType="number-pad"
                onChangeText={v => this.handleChange('amount', v)}
              />
            </Item> */}
            <Slider
              value={this.state.amount}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#c2c3c4"
              maximumTrackTintColor="#c2c3c4"
              style={styles.slider}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
              onValueChange={amount => this.setState({ amount })}
            />
            {/* <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>
                  {'Submit'}
                </Text>
              </Button>
            </View> */}
          </Form>
          <Text style={styles.amount}>
                 $
            {this.state.amount}
          </Text>
          <Text style={styles.smallNoticeText}>
              Deducted from your paycheck:
          </Text>
          <Text style={styles.bigNoticeText}>
              Apr 30
          </Text>
          <Text style={styles.slider.smallNoticeText}>
              Deposited in your bank account:
          </Text>
          <Text style={styles.bigNoticeText}>
              Tommorow:
          </Text>
        </Content>
        <View style={styles.bottom}>
          <Button full success onPress={this.handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </View>
        <FooterBar />
      </Container>

    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(MakeTransaction);
