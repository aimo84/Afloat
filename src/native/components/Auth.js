import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMemberData } from '../../actions/member';

export default function (ComposedComponent) {
  class Auth extends React.Component {
    static propTypes = {
      fetchData: PropTypes.func.isRequired,
      member: PropTypes.shape({
        error: PropTypes.string,
      }).isRequired,
    }

    componentDidMount = () => {
      const { fetchData } = this.props;
      fetchData();
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

  const mapDispatchToProps = {
    fetchData: getMemberData,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Auth);
}
