import {
  postEditCustomerStart,
  postEditCustomerFaild,
  postEditCustomerSuccess,
  onCloseErrorPopUp,
  updateInputValid,
  onCloseSuccessPopUp,
  setCanShowCamera,
  setCanShowDatePicker,
  setPickerDate,
  setData0,
} from './with_edit_customer';
import {sendUpdateListCustomer} from '../listcustomer/with_list_customer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updateCustomer} from '../../../api/index';
import useListCustomer from '../listcustomer/use_list_customer';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker0 from 'react-native-image-picker';
import {Platform} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {isUrl} from '../../../utility/string';
import {setDataCustomerInfo} from '../customerinfo/with_customer_info';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.editCustomer);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const {getAllCustomerEvent} = useListCustomer();
  const goBackEvent = () => navigation.goBack();
  const {data} = state;
  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };

  const onSubmitSuccess = async (values) => {
    let formData = new FormData();
    formData.append('fullname', values.fullname);
    formData.append('mobile', values.mobile);
    formData.append('yearOfBirth', values.yearOfBirth);
    formData.append('email', values.email);
    formData.append('currentPlace', values.currentPlace);
    formData.append('facebook', values.facebook);
    if (netInfo.isConnected) {
      if (state?.data?.avatar && !isUrl(state?.data?.avatar)) {
        formData.append('file', {
          name: 'image1.jpg',
          uri: state?.data?.avatar,
          type: 'image/jpeg',
        });
      }
    }
    dispatch(postEditCustomerStart());
    try {
      const Response = await updateCustomer(data?.id, formData);
      if (Response.status === 'success') {
        dispatch(postEditCustomerSuccess());
        dispatch(sendUpdateListCustomer());
        updateListCustomer();
        dispatch(setDataCustomerInfo(Response.data));
      } else {
        dispatch(postEditCustomerFaild({errMsg: Response.message}));
      }
    } catch (error) {
      dispatch(postEditCustomerFaild({errMsg: error.errMsg}));
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
  const onSetCanShowCameraEvent = (value) => {
    dispatch(setCanShowCamera({value}));
  };
  const onSetCanShowDatePickerEvent = (value) => {
    dispatch(setCanShowDatePicker({value}));
  };
  const onSetPickerDateEvent = (value) => {
    dispatch(setPickerDate({value}));
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

  return {
    state,
    navigation,
    goBackEvent,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
    updateListCustomer,
    onSetCanShowCameraEvent,
    onSetCanShowDatePickerEvent,
    onSetPickerDateEvent,
    onPressSelectorPopUpEvent,
  };
};

export default useTodo;
