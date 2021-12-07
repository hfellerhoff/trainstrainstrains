/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {RecoilRoot} from 'recoil';

const RecoilApp = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

AppRegistry.registerComponent(appName, () => RecoilApp);
