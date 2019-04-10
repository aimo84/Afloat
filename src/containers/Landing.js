import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Actions } from 'react-native-router-flux';
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
  }

  static defaultProps = {
    match: null,
  }


  // componentDidMount = () => this.fetchRecipes();

  checkState = () => {
    const { firstName } = this.props;
    console.log('hi');
    console.log(firstName);
  }

  render = () => {
    const { Layout, loading, firstName } = this.props;
    console.log(firstName);

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
