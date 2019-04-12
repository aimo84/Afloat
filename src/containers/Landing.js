import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
// import { Text } from 'native-base';
import { connect } from 'react-redux';

import { getRecipes, getMeals, setError } from '../actions/recipes';

class Landing extends Component {
  static propTypes = {
    loading: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    firstName: PropTypes.func.isRequired,
    uid: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
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
      if ('uid' in member) {
        Actions.replace('entry');
        console.log('logged in');
      }
    }, 10);
  };

  checkState = () => {
    console.log(this.props);
  }

  render = () => {
    const {
      Layout, loading, firstName,
    } = this.props;
    // const { uid } = this.props.member;
    console.log(this.props);


    return (
      <Layout
        loading={loading}
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
