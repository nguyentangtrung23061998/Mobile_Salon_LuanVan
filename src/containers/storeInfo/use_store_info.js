import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateStore} from '../../api/index';
import {setStoreInfo, getStoreInfo} from '../../utility/local_storage';
import {isUrl} from '../../utility/string';
import {setData as setDataHome} from '../home/state';
import {
  setCanShowCloseTimePicker,
  setCanShowOpenTimePicker,
  setCanShowTimePicker,
  setCloseTime,
  setErrorMessage,
  setInputValue,
  setMsgErr,
  setOpenTime,
  setPickerCloseTime,
  setPickerOpenTime,
  setSuccessMessage,
  setTime,
  updateInputValid,
  updateStoreFaild,
  updateStoreLoading,
  updateStoreSuccess,
  setCanShowCamera,
  resetData,
  setData0,
} from './with_store_info';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker0 from 'react-native-image-picker';
import {Platform} from 'react-native';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.storeInfo);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const navigation = useNavigation();

  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name, isValid}));
  };

  const onUpdateStoreEvent = async (values) => {
    dispatch(updateStoreLoading());
    let formData = new FormData();
    const {
      address,
      mobile,
      openTime,
      closeTime,
      domainAddress,
      image,
      numberEmployee,
      name,
    } = state?.data;
    if (name && name !== '') {
      formData.append('name', name);
    }
    formData.append('domainAddress', domainAddress);
    if (numberEmployee && numberEmployee !== '') {
      formData.append('numberEmployee', numberEmployee);
    }
    if (mobile && mobile !== '') {
      formData.append('mobile', mobile);
    }
    if (address && address !== '') {
      formData.append('address', address);
    }
    if (openTime && openTime !== '') {
      formData.append('openTime', openTime);
    }
    if (closeTime && closeTime !== '') {
      formData.append('closeTime', closeTime);
    }
    if (netInfo.isConnected) {
      if (image && !isUrl(image)) {
        formData.append('file', {
          name: 'image1.jpg',
          uri: image,
          type: 'image/jpeg',
        });
      }
    }

    try {
      const response = await updateStore(formData);
      if (response?.status === 'success') {
        const {data, message} = response;
        await setStoreInfo(data);
        dispatch(setDataHome({value: data}));
        dispatch(updateStoreSuccess({data, message}));
      } else {
        const {message} = response;
        dispatch(updateStoreFaild({message}));
      }
    } catch (err) {
      const message = err.errMsg;
      dispatch(updateStoreFaild({message}));
    }
  };

  const onSetMsgErrEvent = (value) => {
    dispatch(setMsgErr({value}));
  };

  const onSetCanShowTimePickerEvent = (titleText, value) => {
    dispatch(setCanShowTimePicker({titleText, value}));
  };

  const onSetTimeEvent = (name, value) => {
    dispatch(setTime({name, value}));
  };

  const onGoBackEvent = () => {
    navigation.goBack();
  };

  const onSetInputValueEvent = (key, value) => {
    dispatch(setInputValue({key, value}));
  };

  const onSetCanShowOpenTimePickerEvent = (value) => {
    dispatch(setCanShowOpenTimePicker({value}));
  };

  const onSetCanShowCloaseTimePickerEvent = (value) => {
    dispatch(setCanShowCloseTimePicker({value}));
  };

  const onSetOpenTimeEvent = (value) => {
    dispatch(setOpenTime({value}));
  };

  const onSetPickerOpenTimeEvent = (value) => {
    dispatch(setPickerOpenTime({value}));
  };

  const onSetPickerCloseTimeEvent = (value) => {
    dispatch(setPickerCloseTime({value}));
  };

  const onSetCloseTimeEvent = (value) => {
    dispatch(setCloseTime({value}));
  };

  const onSetSuccessMessageEvent = (value) => {
    dispatch(setSuccessMessage({value}));
    navigation.navigate('Home')
  };

  const onSetErrorMessageEvent = (value) => {
    dispatch(setErrorMessage({value}));
  };

  const onSetCanShowCameraEvent = (value) => {
    dispatch(setCanShowCamera({value}));
  };

  const onResetDataEvent = async () => {
    try {
      const data = await getStoreInfo();
      dispatch(resetData({value: data}));
    } catch (error) {}
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
    updateInputValidEvent,
    onUpdateStoreEvent,
    dispatch,
    onSetMsgErrEvent,
    onSetCanShowTimePickerEvent,
    onSetTimeEvent,
    onGoBackEvent,
    onSetInputValueEvent,
    onSetCanShowOpenTimePickerEvent,
    onSetOpenTimeEvent,
    onSetPickerOpenTimeEvent,
    onSetCanShowCloaseTimePickerEvent,
    onSetPickerCloseTimeEvent,
    onSetCloseTimeEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onSetCanShowCameraEvent,
    onResetDataEvent,
    onPressSelectorPopUpEvent,
  };
};

export default useTodo;
