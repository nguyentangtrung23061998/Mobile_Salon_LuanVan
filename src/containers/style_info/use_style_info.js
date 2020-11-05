import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteStyle} from '../../api/index';
import useServiceStyle from '../serviceList/use_service_list';
import useStyleList from '../styleList/use_style_list';
import {
  deleteStyleFaild,
  deleteStyleLoading,
  deleteStyleSuccess,
  sendStyleInfoData,
} from './with_style_info';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.styleInfo);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const {role} = appState;

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [onShowPopUp, setonShowPopUp] = useState(false);
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
        dispatch(deleteStyleSuccess());
        navigation.goBack();
      } else {
        dispatch(deleteStyleFaild({errMsg: deleteStyleResponse.message}));
      }
    } catch (err) {
      dispatch(deleteStyleFaild({errMsg: err.errMsg}));
    }
  };

  const sendStyleInfoDataEvent = (styleInfoData, serviceId) => {
    dispatch(sendStyleInfoData({styleInfoData, serviceId}));
  };

  return {
    state,
    role,
    deleteStyleEvent,
    sendStyleInfoDataEvent,
    onShowPopUp,
    setonShowPopUp,
  };
};

export default useTodo;
