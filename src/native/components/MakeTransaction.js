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
import { ScaledSheet } from 'react-native-size-matters';
import { transferAchToUser } from '../../actions/bank';

const scaledStyles = ScaledSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  amount: {
    fontSize: '65@ms',
    color: '#489e48',
    fontWeight: 'bold',
    marginBottom: '18@s',
  },
  form: {
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: '70@vs',
    paddingHorizontal: '12@s',
    backgroundColor: '#FFFFFF',
  },
  payMeText: {
    fontSize: '22@ms',
    color: '#489e48',
  },
  button: {
    height: '68@vs',
  },
  slider: {
    width: '85%',
  },
  inputBox: {
    alignSelf: 'stretch',
    height: '45@ms',
    padding: '6@ms',
    flexDirection: 'row',
  },
  textInput: {
    paddingHorizontal: '10@s',
    flex: 1,
    borderRadius: '25@ms',
    backgroundColor: 'white',
    borderWidth: 0.25,
    borderColor: '#545454',
  },
  chatBox: {
    maxWidth: '270@s',
    margin: '5@s',
    borderRadius: '8@ms',
    padding: '10@ms',
  },
  chatText: {
    fontSize: '15@ms0.3',
  },
  smallNoticeText: {
    fontSize: '18@s',
    color: '#8b8e8b',
  },
  bigNoticeText: {
    fontSize: '23@s',
    fontWeight: 'bold',
  },
  noticeView: {
    alignItems: 'center',
    alignContent: 'center',
  },
  submitButtonText: {
    fontSize: '18@ms',
  },
});

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
      <Container style={scaledStyles.container}>
        {/* <View style={scaledStyles.wrapper}> */}
        <Form style={scaledStyles.form}>
          <Text style={scaledStyles.payMeText}>
                 Pay me
          </Text>
          <Text style={scaledStyles.amount}>
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
            style={scaledStyles.slider}
            trackStyle={stylesSlider.track}
            thumbStyle={stylesSlider.thumb}
            onValueChange={amount => this.setState({ amount })}
          />
        </Form>
        <View style={scaledStyles.noticeView}>
          <Text style={scaledStyles.smallNoticeText}>
              Deducted from your paycheck:
          </Text>
          <Text style={scaledStyles.bigNoticeText}>
              Apr 30
          </Text>
          <View style={{ height: 18 }} />
          <Text style={scaledStyles.smallNoticeText}>
              Deposited in your bank account:
          </Text>
          <Text style={scaledStyles.bigNoticeText}>
              Tommorow
          </Text>
        </View>
        {/* </Content> */}
        <View style={scaledStyles.bottom}>
          <Button full success onPress={this.handleSubmit} style={scaledStyles.button}>
            <Text style={scaledStyles.submitButtonText}>Submit</Text>
          </Button>
        </View>
        {/* </View> */}
      </Container>

    );
  }
}

const mapDispatchToProps = {
  transferAchToUser,
};

export default connect(null, mapDispatchToProps)(MakeTransaction);
