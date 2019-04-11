import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Auth extends React.Component {
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
