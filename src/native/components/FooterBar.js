import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Icon, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  footerButtons: {
    backgroundColor: 'white',
  },
  footerIcons: {
    color: '#757575',
  },
});

class FooterBar extends Component {
  static propTypes = {
    member: PropTypes.shape({
      amount: PropTypes.string,
    }),
  }

  static defaultProps = {
    member: {},
  }

  onDashboardPressed = () => {
<<<<<<< HEAD
    //Actions.mainHome();
    Actions.replace('mainHome');

=======
    Actions.replace('mainHome');
>>>>>>> d759d6d5adcf6de8292dabe1e251691bd6587e8a
  }

  onMakeTransactionPressed = () => {
    Actions.replace('makeTransaction');
  }

  onSettingsPressed = () => {
<<<<<<< HEAD
    Actions.replace('mainUserMenu');
  }

  onLoanHistoryPressed = () => {
    //Actions.mainLoanPage();
    Actions.replace('mainLoanPage');

=======
    Actions.replace('mainSettings');
>>>>>>> d759d6d5adcf6de8292dabe1e251691bd6587e8a
  }

  render = () => (
    <View style={styles.footer}>
      <Button style={styles.footerButtons} onPress={this.onDashboardPressed}>
        <Icon name="md-menu" style={styles.footerIcons} />
      </Button>
      <Button style={styles.footerButtons} onPress={this.onLoanHistoryPressed}>
        <Icon name="md-stats" style={styles.footerIcons} />
      </Button>
      <Button style={styles.footerButtons} onPress={this.onSettingsPressed}>
        <Icon name="md-home" style={styles.footerIcons} />
      </Button>
    </View>
  )
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(FooterBar);
