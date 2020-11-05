import {useState} from 'react';
import {
  updateInputValid,
  putUpdateStaffStart,
  putUpdateStaffFaild,
  putUpdateStaffSuccess,
  updateErrorText,
  changePasswordEmployeeLoading,
  changePasswordEmployeeSuccess,
  changePasswordEmployeeFaild,
  onCloseSuccessPopUp,
  onCloseSuccess,
  setCanShowCamera,
} from './with_edit_staff';
import {sendUpdateListStaff} from '../liststaff/with_list_staff';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordEmployee, updateStaff} from '../../../api/index';
import {useNavigation} from '@react-navigation/native';
import useListStaff from '../liststaff/use_list_staff';
const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.editStaff);
  const navigation = useNavigation();
  const {getAllEmployeeEvent} = useListStaff();
  const {data} = state;
  const [showPopup, setshowPopup] = useState(false);
  const onShowPopup = () => {
    setshowPopup(true);
  };
  const onClosePopup = () => {
    setshowPopup(false);
  };
  const goBackEvent = () => {
    navigation.goBack();
  };
  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };
  const onCloseErrorPopUp = () => {
    dispatch(updateErrorText());
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };
  const onCloseSuccessEvent = () => {
    dispatch(onCloseSuccess());
  };

  const onSubmitSuccess = async (values) => {
    let formData = new FormData();
    const {
      fullname,
      position,
      email,
      isCashier,
      homeTown,
      yearOfBirth,
      currentPlace,
      identityCard,
      mobile,
      avatar,
    } = values;
    formData.append('fullname', fullname);
    formData.append('position', position);
    formData.append('email', email);
    formData.append('isCashier', isCashier);
    formData.append('homeTown', homeTown);
    formData.append('yearOfBirth', yearOfBirth);
    formData.append('currentPlace', currentPlace);
    formData.append('identityCard', identityCard);
    formData.append('mobile', mobile);
    if (avatar !== '') {
      formData.append('file', {
        name: 'image1.jpg',
        uri: avatar,
        type: 'image/jpeg',
      });
    }
    dispatch(putUpdateStaffStart());
    try {
      const response = await updateStaff(data?.id, formData);
      if (response.status === 'success') {
        dispatch(putUpdateStaffSuccess());
        dispatch(sendUpdateListStaff());
        updateListStaff();
      } else {
        dispatch(putUpdateStaffFaild({errMsg: response.message}));
      }
    } catch (error) {
      dispatch(putUpdateStaffFaild({errMsg: error.errMsg}));
    }
  };
  const onChangePasswordEmployeeEvent = async (password) => {
    dispatch(changePasswordEmployeeLoading());
    try {
      const response = await changePasswordEmployee(state.data.id, password);
      if (response.status === 'success') {
        dispatch(changePasswordEmployeeSuccess());
      } else {
        dispatch(changePasswordEmployeeFaild({errMsg: response.message}));
      }
    } catch (error) {
      dispatch(changePasswordEmployeeFaild({errMsg: error.errMsg}));
    }
  };
  const updateListStaff = () => {
    getAllEmployeeEvent();
  };
  const onSetCanShowCameraEvent = (value) => {
    dispatch(setCanShowCamera({value}));
  };
  return {
    state,
    goBackEvent,
    showPopup,
    dispatch,
    navigation,
    onShowPopup,
    onClosePopup,
    updateInputValidEvent,
    onCloseErrorPopUp,
    onSubmitSuccess,
    onChangePasswordEmployeeEvent,
    onCloseSuccessPopUpEvent,
    updateListStaff,
    onCloseSuccessEvent,
    onSetCanShowCameraEvent,
  };
};

export default useTodo;
