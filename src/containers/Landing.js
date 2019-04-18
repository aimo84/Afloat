import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
// import { Text } from 'native-base';
import { connect } from 'react-redux';

import { getRecipes, getMeals, setError } from '../actions/recipes';

class Landing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
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


  componentDidMount = () => {
    const {
      member,
    } = this.props;
    console.log(member);
    setTimeout(() => {
      if ('token' in member && member.token !== '') {
        if (member.bankSet) {
          Actions.replace('home');
        } else {
          Actions.replace('entry');
        }
      }
    }, 10);
  };

  checkState = () => {
    console.log('hi');
  }

  render = () => {
    const {
      // eslint-disable-next-line
      Layout, firstName,
    } = this.props;
    // const { uid } = this.props.member;


    return (
      <Layout
        recipes={firstName}
        checkState={this.checkState}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
