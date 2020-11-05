import {useState} from 'react';
import {
  postRegisterEmployeeStart,
  postRegisterEmployeeFaild,
  postRegisterEmployeeSuccess,
  updateInputValid,
  onCloseErrorPopUp,
  onCloseSuccessPopUp,
  setErrorMessage,
  setCanShowCamera,
} from './with_create_staff';
import {sendUpdateListStaff} from '../liststaff/with_list_staff';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {postRegisterEmployee} from '../../../api/index';
import useListStaff from '../liststaff/use_list_staff';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.createStaff);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGoBackEvent = () => navigation.goBack();
  const {getAllEmployeeEvent} = useListStaff();
  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };

  const onSubmitSuccess = async (values) => {
    let formData = new FormData();
    formData.append('fullname', values.fullname);
    formData.append('position', values.position);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('password', values.password);
    if (values.avatar) {
      formData.append('file', {
        name: 'image1.jpg',
        uri: values.avatar,
        type: 'image/jpeg',
      });
    }
    formData.append('isCashier', values.isCashier);
    dispatch(postRegisterEmployeeStart());
    try {
      const response = await postRegisterEmployee(formData);
      if (response.status === 'success') {
        dispatch(postRegisterEmployeeSuccess());
        dispatch(sendUpdateListStaff());
        updateListStaff();
      } else {
        const {message} = response;
        dispatch(postRegisterEmployeeFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(postRegisterEmployeeFaild({message}));
    }
  };
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };

  const [showPopup, setshowPopup] = useState(false);
  const onShowPopup = () => {
    setshowPopup(true);
  };
  const onClosePopup = () => {
    setshowPopup(false);
  };
  const updateListStaff = () => {
    getAllEmployeeEvent();
  };
  const onSetErrorMessageEvent = (value) => {
    dispatch(setErrorMessage({value}));
  };
  const onSetCanShowCameraEvent = (value) => {
    dispatch(setCanShowCamera({value}));
  };
  return {
    state,
    navigation,
    onGoBackEvent,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    showPopup,
    onShowPopup,
    onClosePopup,
    onCloseSuccessPopUpEvent,
    updateListStaff,
    onSetErrorMessageEvent,
    onSetCanShowCameraEvent,
  };
};

export default useTodo;
