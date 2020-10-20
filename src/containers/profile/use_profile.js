import React from 'react';
import {} from './with_profile';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.profile);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const {role} = appState;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigateEvent = (route) => {
    navigation.navigate(route);
  };

  return {state, role, dispatch, navigation, onNavigateEvent};
};

export default useTodo;
