import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useState} from 'react';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker0 from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordEmployee, updateStaff} from '../../../api/index';
import {isUrl} from '../../../utility/string';
import useListStaff from '../liststaff/use_list_staff';
import {sendUpdateListStaff} from '../liststaff/with_list_staff';
import {
  changePasswordEmployeeFaild,
  changePasswordEmployeeLoading,
  changePasswordEmployeeSuccess,
  onCloseSuccess,
  onCloseSuccessPopUp,
  putUpdateStaffFaild,
  putUpdateStaffStart,
  putUpdateStaffSuccess,
  setCanShowCamera,
  setCanShowDatePicker,
  setData0,
  setDateOfDatePicker,
  setPickerDate,
  setYearOfBirth,
  updateErrorText,
  updateInputValid,
} from './with_edit_staff';
import {setDataStaffInfo} from '../staffinfo/with_staff_info';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.editStaff);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
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
      currentPlace,
      identityCard,
      mobile,
    } = values;
    formData.append('fullname', fullname);
    formData.append('position', position);
    formData.append('email', email);
    formData.append('isCashier', isCashier);
    formData.append('homeTown', homeTown);
    formData.append('yearOfBirth', state.data.yearOfBirth);
    formData.append('currentPlace', currentPlace);
    formData.append('identityCard', identityCard);
    formData.append('mobile', mobile);
    if (netInfo.isConnected) {
      if (state?.data?.avatar && !isUrl(state?.data?.avatar)) {
        formData.append('file', {
          name: 'image1.jpg',
          uri: state?.data?.avatar,
          type: 'image/jpeg',
        });
      }
    }
    dispatch(putUpdateStaffStart());
    try {
      const response = await updateStaff(data?.id, formData);
      if (response.status === 'success') {
        dispatch(putUpdateStaffSuccess());
        dispatch(sendUpdateListStaff());
        dispatch(setDataStaffInfo(response.data));
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
  const onPressSelectorPopUpEvent = (selectOption) => {
    switch (selectOption) {
      case 'library':
        dispatch(setCanShowCamera({value: false}));
        setTimeout(async () => {
          try {
            const image = await ImagePicker.openPicker({
              mediaType: 'photo',
            });
            dispatch(setData0({value: image.path}));
          } catch (error) {}
        }, 300);
        break;
      case 'camera':
        dispatch(setCanShowCamera({value: false}));
        setTimeout(async () => {
          ImagePicker0.launchCamera(
            {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            },
            async (response) => {
              if (response.didCancel) {
              } else {
                try {
                  let image = await response.uri;
                  if (Platform.OS === 'ios') {
                    image = '~' + image.substring(image.indexOf('/Documents'));
                  }
                  dispatch(setData0({value: image}));
                } catch (err) {}
              }
            },
          );
        }, 300);
        break;
      case 'cancel':
        dispatch(setCanShowCamera({value: false}));
    }
  };

  const onSetCanShowDatePickerEvent = (value) =>
    dispatch(setCanShowDatePicker(value));

  const onPressCancelDatePickerEvent = () => {
    dispatch(setCanShowDatePicker(false));
    const date = state.data.yearOfBirth;
    if (date === '') {
      dispatch(setDateOfDatePicker('1995/08/16'));
    }
    if (date !== '') {
      const date0 = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
      dispatch(setDateOfDatePicker(date0));
    }
  };

  const onSetPickerDateEvent = (value) => {
    dispatch(setPickerDate({value}));
  };

  const onPressConfirmDatePickerEvent = (date) => {
    dispatch(setCanShowDatePicker(false));
    const date0 = moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
    dispatch(setYearOfBirth(date0));
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
    onPressSelectorPopUpEvent,
    onSetCanShowDatePickerEvent,
    onPressCancelDatePickerEvent,
    onSetPickerDateEvent,
    onPressConfirmDatePickerEvent,
  };
};

export default useTodo;
