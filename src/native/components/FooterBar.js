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
    Actions.mainHome();
  }

  onMakeTransactionPressed = () => {
    Actions.makeTransaction();
  }

  onSettingsPressed = () => {
    Actions.mainSettings();
  }

  onLoanHistoryPressed = () => {
    Actions.mainLoanPage();
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
        <Icon name="ios-settings" style={styles.footerIcons} />
      </Button>
    </View>
  )
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(FooterBar);
