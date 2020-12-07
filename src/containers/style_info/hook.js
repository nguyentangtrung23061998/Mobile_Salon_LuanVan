import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStyle } from '../../api/index';
import useServiceStyle from '../serviceList/use_service_list';
import useStyleList from '../styleList/use_style_list';
import { setDataUpdateStyle0 } from '../update_style/state';
import {
  deleteStyleLoading,
  deleteStyleSuccess,
  deleteStyleFaild,
  setCanShowDeleteStylePopUp,
  setErrorMessage,
  setSuccessMessage,
  setRole
} from './state';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import { useTranslation } from 'react-i18next';
import reactotron from 'reactotron-react-native';


const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.styleInfo);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const { role } = appState;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onGobackEvent = () => navigation.goBack();

  const { deleteStyleListEvent } = useStyleList();
  const { deleteServiceStyleEvent } = useServiceStyle();

  const _setProfile = async () => {
    try {
      const profile = await getProfile();
      reactotron.log('role: ' + profile.role)
      dispatch(setRole({ value: profile.role }));
    } catch (error) { }
  }

  const onSetCanShowDeleteStylePopUpEvent = (bool) =>
    dispatch(setCanShowDeleteStylePopUp(bool));

  const onDeleteStyleEvent = async (styleInfoData, serviceId) => {
    dispatch(setCanShowDeleteStylePopUp(false));
    dispatch(deleteStyleLoading());
    try {
      const response = await deleteStyle(styleInfoData.id);
      if (response.status === 'success') {
        deleteStyleListEvent(styleInfoData.id);
        deleteServiceStyleEvent(serviceId);
        const { message } = response;
        dispatch(deleteStyleSuccess({ message }));
      } else {
        const { message } = response;
        dispatch(deleteStyleFaild({ message }));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(deleteStyleFaild({ message }));
    }
  };

  const onGoToUpdateStyleEvent = () => {
    let maxImageFiles = 4;
    let data = { ...state.styleInfoData };
    data.serviceId = state.serviceId;
    data.styleId = data.id;
    data.image.map((el) => {
      if (el) {
        maxImageFiles = maxImageFiles - 1;
      }
    });
    data.maxImageFiles = maxImageFiles;
    delete data.id;

    dispatch(setDataUpdateStyle0({ data }));
    navigation.navigate('UpdateStyle');
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({ value }));

  const onConfirmDeleteSuccessEvent = () => {
    dispatch(setSuccessMessage({ value: null }));
    navigation.goBack();
  }

  return {
    state,
    role,
    onSetCanShowDeleteStylePopUpEvent,
    onDeleteStyleEvent,
    onGobackEvent,
    onGoToUpdateStyleEvent,
    onSetErrorMessageEvent,
    onConfirmDeleteSuccessEvent,
    _setProfile
  };
};

export default useTodo;
