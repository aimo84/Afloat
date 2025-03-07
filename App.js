import React from 'react';
import Root from './src/native/index';
import { persistor, store } from './src/store/index';

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
