import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Button,
} from 'native-base';
// import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import { Dimensions, StyleSheet } from 'react-native';
import { getRecipes, getMeals, setError } from '../actions/recipes';
import Cards from '../native/components/Cards';
import all from './styles.js';

// const styles = StyleSheet.create({
//   mainContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dayText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

class Entry extends Component {
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
      slider1ActiveSlide: 0,
    };
  }

  goToBank = () => {
    Actions.linkBank();
  };

  checkState = () => {
    console.log(this.props);
  }

  onMessage = (data) => {
    console.log(data);
  }

  _renderItemWithParallax({ item, index }) {
    console.log(this);
    return (
      <Container style={all.cardContainer}>
        <Cards item={item} index={index} />
      </Container>
    );
  }

  wp(percentage) {
    console.log(this);
    const { width: viewportWidth } = Dimensions.get('window');
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }


  render = () => {
    // const { uid } = this.props.member;
    console.log(this.props);


    return (

      <Container style={{ marginTop: 22 }}>
        <Content>
          <Text>Please Link your bank account:</Text>
          <Button onPress={() => this.goToBank()}>
            <Text>
            Link Bank Account
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  loading: state.loading,
  firstName: state.firstName,

});

const mapDispatchToProps = {
  fetchRecipes: getRecipes,
  fetchMeals: getMeals,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
