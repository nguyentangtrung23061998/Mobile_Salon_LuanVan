import {
    postCreateCustomerStart,
    postCreateCustomerFaild,
    postCreateCustomerSuccess,
    updateInputValid,
    onCloseErrorPopUp,
    onCloseSuccessPopUp,
    setCanShowCamera,
    setCanShowDatePicker,
    setPickerDate,
    setErrorMessage,
    setData0,
    resetState
} from './with_create_customer';
import { sendUpdateListCustomer } from '../listcustomer/with_list_customer';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useListCustomer from '../listcustomer/use_list_customer';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker0 from 'react-native-image-picker';
import { Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { isUrl } from '../../../utility/string';
import { createCustomer } from '../../../api/index';
const useTodo = () => {
    const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.createCustomer);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const {getAllCustomerEvent} = useListCustomer();
  const onGoBackEvent = () => navigation.goBack();

  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };

  const onSubmitSuccess = async (values) => {
    dispatch(postCreateCustomerStart());

    let formData = new FormData();
    formData.append('fullname', values.fullname);
    formData.append('email', values.email);
    formData.append('yearOfBirth', values.yearOfBirth);
    formData.append('currentPlace', values.currentPlace);
    formData.append('facebook', values.facebook);
    formData.append('mobile', values.mobile);
    if (netInfo.isConnected) {
      if (state?.avatar && !isUrl(state?.avatar)) {
        formData.append('file', {
          name: 'image1.jpg',
          uri: state?.avatar,
          type: 'image/jpeg',
        });
      }
    }
    try {
      const response = await createCustomer(formData);
      if (response.status === 'success') {
        dispatch(postCreateCustomerSuccess());
        dispatch(sendUpdateListCustomer());
        updateListCustomer();
      } else {
        const {message} = response;
        dispatch(postCreateCustomerFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(postCreateCustomerFaild({message}));
    }
  };
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };
  const updateListCustomer = () => {
    getAllCustomerEvent();
  };
  const onSetCanShowDatePickerEvent = (value) => {
    dispatch(setCanShowDatePicker({value}));
  };
  const onSetPickerDateEvent = (value) => {
    dispatch(setPickerDate({value}));
  };
  const onSetErrorMessageEvent = (value) => {
    dispatch(setErrorMessage({value}));
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

  const onResetStateEvent = ()=> dispatch(resetState())
  return {
    state,
    navigation,
    onGoBackEvent,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
    updateListCustomer,
    onSetCanShowDatePickerEvent,
    onSetPickerDateEvent,
    onSetErrorMessageEvent,
    onSetCanShowCameraEvent,
    onPressSelectorPopUpEvent,
    onResetStateEvent
  };
}

export default useTodo;