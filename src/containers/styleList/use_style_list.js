import React from 'react';
import {
  getStylesByServiceLoading,
  getStylesByServiceSuccess,
  getStylesByServiceFaild,
  updateStyleList,
  deleteStyle,
  setErrorMessage,
  setRole2
} from './with_style_list';
import {getStylesByService} from '../../api/index.js';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {sendStyleInfoData} from '../style_info/state';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import reactotron from 'reactotron-react-native';
const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.style);

  const navigation = useNavigation();

  const _setProfile = async () => {
    try {
      const profile = await getProfile();
      let roleTemp = profile.role;
      dispatch(setRole2({value: roleTemp}));

    } catch (error) { }
  }

  const getStylesByServiceEvent = async (id) => {
    dispatch(getStylesByServiceLoading({id}));
    try {
      const response = await getStylesByService(id);
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getStylesByServiceSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getStylesByServiceFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getStylesByServiceFaild({message}));
    }
  };

  const navigate = (name, data) => {
    navigation.navigate(name, {_serviceId: data});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const updateStyleListEvent = (data) => {
    dispatch(updateStyleList({data}));
  };

  const deleteStyleListEvent = (styleId) => {
    dispatch(deleteStyle({styleId}));
  };

  const onGoToStyleInfoEvent = (styleInfoData, serviceId) => {
    dispatch(sendStyleInfoData({styleInfoData, serviceId}));
    navigation.navigate('StyleInfo');
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  return {
    state,
    getStylesByServiceEvent,
    navigate,
    goBack,
    updateStyleListEvent,
    deleteStyleListEvent,
    onGoToStyleInfoEvent,
    onSetErrorMessageEvent,
    _setProfile
  };
};

export default useTodo;
