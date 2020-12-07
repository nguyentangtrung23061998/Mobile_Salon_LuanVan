import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import reactotron from 'reactotron-react-native';

import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from '../../api/index.js';

import {
  createServiceFaild,
  createServiceLoading,
  createServiceSuccess,
  deleteServiceFaild,
  deleteServiceLoading,
  deleteServiceStyle,
  deleteServiceSuccess,
  getAllServicesFaild,
  getAllServicesLoading,
  getAllServicesSuccess,
  getUpdateServiceData,
  updateServiceFaild,
  updateServiceLoading,
  updateServiceState,
  updateServiceSuccess,
  updateServiceUpdateTitle,
  setErrorMessage,
  setCanShowPopUpAdding,
  setIsEnabled,
  resetState,
  setCanAdd,
  onCloseSuccessPopUp,
  setRole
} from './with_service_list';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.service);
  const appState = useSelector((rootReducer) => rootReducer.app);
  // const {role} = appState;
  const role = "";
  const _setProfile = async () => {
    try {
      const profile2 = await getProfile();
      // roleObj = profile.role;
      reactotron.log('state.role: ' + profile2.role)
     dispatch(setRole({value:  profile2.role}));

    } catch (error) { }
  }

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onGoBackEvent = () => {
    navigation.goBack();
  };
  const onNavigateEvent = (name, data) => {
    navigation.navigate(name, {item: data?.item});
  };

  const onGetAllServicesEvent = async () => {
    dispatch(getAllServicesLoading());
    try {
      const response = await getAllServices();
      if (response.status === 'success') {
        dispatch(getAllServicesSuccess({data: response.data}));
        dispatch(setIsEnabled({value: true}));
      } else {
        dispatch(getAllServicesFaild({errorMessage: response.message}));
        dispatch(setIsEnabled({value: true}));
      }
    } catch (error) {
      dispatch(getAllServicesFaild({errorMessage: error.errMsg}));
      dispatch(setIsEnabled({value: true}));
    }
  };

  const onCreateServiceEvent = async (name, image) => {
    dispatch(createServiceLoading());
    try {
      const response = await createService(name, image);
      if (response.status === 'success') {
        dispatch(createServiceSuccess({data: response.data}));
      }
      if (response.status === 'fail') {
        onSetCanShowPopUpAddingEvent(true);
        dispatch(createServiceFaild({errorMessage: response.message}));
      } else {
        dispatch(createServiceFaild({errorMessage: response.message}));
      }
    } catch (err) {
      dispatch(createServiceFaild({errorMessage: err.errMsg}));
    }
  };

  const deleteServiceEvent = async (id) => {
    dispatch(deleteServiceLoading());
    try {
      const deleteServiceResponse = await deleteService(id);
      if (deleteServiceResponse.status === 'success') {
        dispatch(deleteServiceSuccess({id}));
      }
    } catch (err) {
      dispatch(deleteServiceFaild({errMsg: err.errMsg}));
    }
  };

  const updateServiceEvent = async (id, name, image) => {
    dispatch(updateServiceLoading());
    try {
      const updateServiceResponse = await updateService(id, name, image);
      if (updateServiceResponse.status === 'success') {
        dispatch(updateServiceSuccess(updateServiceResponse.data));
      }
    } catch (err) {
      dispatch(updateServiceFaild({errMsg: err.errMsg}));
    }
  };

  const getUpdateServiceDataEvent = (item) => {
    dispatch(getUpdateServiceData({item}));
  };

  const updateServiceUpdateTitleEvent = (title) => {
    dispatch(updateServiceUpdateTitle({title}));
  };
  const updateServiceData = (serviceId) => {
    dispatch(updateServiceState({serviceId}));
  };

  const deleteServiceStyleEvent = (serviceId) => {
    dispatch(deleteServiceStyle({serviceId}));
  };

  const onSetErrorMessageEvent = (value) => {
    dispatch(setErrorMessage({value}));
  };

  const onSetCanShowPopUpAddingEvent = (value) => {
    dispatch(setCanShowPopUpAdding({value}));
  };

  const onResetStateEvent = () => dispatch(resetState());

  const onSetCanAddEvent = (value) => dispatch(setCanAdd({value}));
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };

  return {
    state,
    role,
    dispatch,
    deleteServiceStyleEvent,
    onGoBackEvent,
    onGetAllServicesEvent,
    onCreateServiceEvent,
    deleteServiceEvent,
    onNavigateEvent,
    updateServiceEvent,
    getUpdateServiceDataEvent,
    updateServiceUpdateTitleEvent,
    updateServiceData,
    onSetErrorMessageEvent,
    onSetCanShowPopUpAddingEvent,
    onResetStateEvent,
    onSetCanAddEvent,
    onCloseSuccessPopUpEvent,
    _setProfile
  };
};

export default useTodo;
