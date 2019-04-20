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
          back
          key="Landing"
          title="Landing"
          renderLeftButton={<View />}
          {...DefaultProps.navbarProps}
          component={Auth(LandingContainer)}
          Layout={LandingComponent}
        />
        <Scene
          back
          key="signUp"
          title="SIGN UP"
          {...DefaultProps.navbarProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />
        <Scene
          back
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
            key="entry"
            title="ENTRY"
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
        </Stack>
      </Stack>
      <Tabs
        key="mainTab"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >

        <Stack
          key="mainHome"
          title="Transactions"
          icon={() => <Icon name="switch" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={Auth(DashboardComponent)} />
        </Stack>

        <Stack
          key="mainSettings"
          title="Settings"
          icon={() => <Icon name="person" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="settings" component={SettingsContainer} Layout={Auth(SettingsComponent)} />
        </Stack>
      </Tabs>
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
