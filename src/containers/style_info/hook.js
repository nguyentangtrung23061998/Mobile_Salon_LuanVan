import React from 'react';
import {
  deleteStyleLoading,
  deleteStyleSuccess,
  deleteStyleFaild,
  sendStyleInfoData,
} from './with_style_info';
import {deleteStyle} from '../../api/index';
import {useNavigation} from '@react-navigation/native';
import useStyleList from '../styleList/use_style_list';
import useServiceStyle from '../serviceList/use_service_list';
import {useDispatch, useSelector} from 'react-redux';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.styleInfo);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const {deleteStyleListEvent} = useStyleList();
  const {deleteServiceStyleEvent} = useServiceStyle();

  const deleteStyleEvent = async (data, serviceId) => {
    dispatch(deleteStyleLoading());
    const {id} = data;
    try {
      const deleteStyleResponse = await deleteStyle(id);
      if (deleteStyleResponse.status === 'success') {
        deleteStyleListEvent(id);
        deleteServiceStyleEvent(serviceId);
        navigation.goBack();
      }
    } catch (err) {
      dispatch(deleteStyleFaild({errMsg: err.errMsg}));
    }
  };

  const sendStyleInfoDataEvent = (styleInfoData, serviceId) => {
    dispatch(sendStyleInfoData({styleInfoData, serviceId}));
  };

  return {deleteStyleEvent, state, sendStyleInfoDataEvent};
};

export default useTodo;
