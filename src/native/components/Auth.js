import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Auth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

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
