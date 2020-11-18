import React, { useEffect } from 'react';
import { } from './with_profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import {setData as setDataProfile} from './with_profile';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.profile);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const { role } = appState;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigateEvent = (route) => {
    navigation.navigate(route);
  };

  const onResetDataEvent = async () => {
    try {
      const value = await getProfile();
      dispatch(setDataProfile({value}));
    } catch (error) {}
  };

  return { state, role,onResetDataEvent, dispatch, navigation, onNavigateEvent };
};

export default useTodo;
