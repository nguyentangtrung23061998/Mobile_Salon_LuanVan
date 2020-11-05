import React from 'react';
import {
  getStylesByServiceLoading,
  getStylesByServiceSuccess,
  getStylesByServiceFaild,
  updateStyleList,
  deleteStyle,
} from './with_style_list';
import {getStylesByService} from '../../api/index.js';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.style);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const {role} = appState;

  const navigation = useNavigation();
  const getStylesByServiceEvent = async (id) => {
    dispatch(getStylesByServiceLoading({id}));
    try {
      
      const getStylesByServiceResponse = await getStylesByService(id);
     
      if (getStylesByServiceResponse.status === 'success') {
        dispatch(
          getStylesByServiceSuccess({data: getStylesByServiceResponse.data}),
        );
      }
    } catch (err) {
      dispatch(getStylesByServiceFaild());
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

  return {
    state,
    role,
    getStylesByServiceEvent,
    navigate,
    goBack,
    updateStyleListEvent,
    deleteStyleListEvent,
  };
};

export default useTodo;
