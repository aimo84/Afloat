/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

export default function (ComposedComponent) {
  class Auth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount = () => {
      const emailVerified = this.props.member;
      console.log('email verify check');
      console.log(this.props.member);
      if (!emailVerified) {
        Actions.replace('entry');
      }
    };

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    member: state.member || {},
  });

  return connect(mapStateToProps, null)(Auth);
}
