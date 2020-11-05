import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { connect, Provider, useSelector } from 'react-redux';
import './config/reactotron';
// import RootNavigator from './navigation/index';
import store from './stores/app';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './navigation/authStack';
const Stack = createStackNavigator();
import {StatusBar, Text, TextInput} from 'react-native';
import AppStack from './navigation/appStack';
import Auth from './containers/auth/auth'

let App = () => {
  const {isAuthLoading, isAuth} = useSelector((rootReducer) => rootReducer.app);
  if (isAuthLoading) {
    return <Auth />;
  }
  return (
    <NavigationContainer>
      {isAuth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
App = connect()(App);
export default AppWithStore = () => {
  useEffect(() => {
    RNBootSplash.hide({ duration: 2000 });
    // StatusBar.setBackgroundColor('transparent');
    // StatusBar.setBarStyle('dark-content');
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

