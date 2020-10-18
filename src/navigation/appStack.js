import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../containers/Home/index';

const Stack = createStackNavigator();

export default AppStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
