import React from 'react';
import {
  Scene, Tabs, Stack, View,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import SettingsContainer from '../../containers/Settings';
import SettingsComponent from '../components/Settings';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import Auth from '../components/Auth';

import LandingContainer from '../../containers/Landing';
import LandingComponent from '../components/Landing';

import EntryContainer from '../../containers/Entry';

import LinkBank from '../../containers/LinkBank';

import DashboardComponent from '../components/Dashboard';
import MakeTransactionComponent from '../components/MakeTransaction';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Stack
        hideNavBar
        key="landing"
        title={AppConfig.appName.toUpperCase()}
        {...DefaultProps.navbarProps}
      >
        <Scene
          key="entry"
          title="LOGO"
          hideNavBar={false}
          {...DefaultProps.navbarProps}
          component={Auth(EntryContainer)}
        />
        <Scene
          key="linkBank"
          title="LINK BANK"
          hideNavBar
          {...DefaultProps.navbarProps}
          component={Auth(LinkBank)}
        />
        <Scene
          back
          hideNavBar={false}
          key="signUp"
          title="SIGN UP"
          {...DefaultProps.navbarProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />
        <Scene
          back
          hideNavBar={false}
          key="login"
          title="LOGIN"
          {...DefaultProps.navbarProps}
          component={LoginContainer}
          Layout={LoginComponent}
        />

        <Stack
          key="app"
          title={AppConfig.appName.toUpperCase()}
          {...DefaultProps.navbarProps}
          gestureEnabled={false}
          hideNavBar
        >
          <Scene
            key="Landing"
            title="Landing"
            {...DefaultProps.navbarProps}
            component={Auth(LandingContainer)}
            Layout={LandingComponent}
          />
        </Stack>
      </Stack>
      <Stack
        key="mainHome"
        title="Transactions"
        icon={() => <Icon name="switch" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="home" component={Auth(DashboardComponent)} />
      </Stack>

      <Stack
        key="makeTransaction"
        title="Get Paid Early"
        back
        icon={() => <Icon name="add-circle" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="settings" component={Auth(MakeTransactionComponent)} />
      </Stack>

      <Stack
        key="mainSettings"
        title="Settings"
        back
        icon={() => <Icon name="person" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="settings" component={SettingsContainer} Layout={Auth(SettingsComponent)} />
      </Stack>
    </Scene>

    <Scene
      back
      clone
      key="updateProfile"
      title="UPDATE"
      {...DefaultProps.navbarProps}
      component={SettingsContainer}
      Layout={RecipeViewComponent}
    />
  </Stack>
);

export default Index;
