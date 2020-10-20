import {useFormik} from 'formik';
import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import back from '../../assets/icon/back/back.png';
import camera from '../../assets/icon/camera/camera.png';
import ErrorPopUp from '../../component/error_pop_up/error_pop_up';
import Input, {InputMask} from '../../component/input/input';
import Loading from '../../component/loading/loading';
import {MTPImage0} from '../../component/mtp_image';
import {MyScrollView0} from '../../component/my_scroll_view/my_scroll_view';
import SuccessPopUp from '../../component/success_pop_up/success_pop_up';
import TimePicker from '../../component/time_picker/time_picker';
import {inputHhmm} from '../../utility/input';
import {noSpaceAtAll, noSpaceAtEntry} from '../../utility/string';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import styles from './style';
import useStoreInfo from './use_store_info';
export default React.memo(() => {
  // hook
  const {
    state,
    t,
    onGoBackEvent,
    updateInputValidEvent,
    onUpdateStoreEvent,
    onSetInputValueEvent,
    onSetCanShowOpenTimePickerEvent,
    onSetCanShowCloaseTimePickerEvent,
    onSetOpenTimeEvent,
    onSetPickerOpenTimeEvent,
    onSetPickerCloseTimeEvent,
    onSetCloseTimeEvent,
    onSetSuccessMessageEvent,
    onSetCanShowCameraEvent,
    onSetErrorMessageEvent,
    onResetDataEvent,
  } = useStoreInfo();
  const {
    isStoreNameValid,
    isDomainNameValid,
    isStoreNameFocused,
    isDomainNameFocused,
    isCloseTimeFocused,
    isOpenTimeFocused,
    isAddressFocused,
    isMobileFocused,
    isNumberOfStaffFocused,
    canShowOpenTimePicker,
    pickerOpenTime,
    pickerCloseTime,
    canShowCloseTimePicker,
  } = state;

  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={styles.touchableOpacity0}
        onPress={() => {
          onResetDataEvent();
          onGoBackEvent();
        }}>
        <MTPImage0 source={back} style={styles.mTPImage0} />
      </TouchableOpacity>
    ),
    [],
  );
  const _rightComponent = useCallback(
    () => (
      <TouchableOpacity onPress={() => onSetCanShowCameraEvent(true)}>
        <MTPImage0 source={camera} style={styles.mTPImage1} />
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={styles.text0}>{t('text1')}</Text>,
    [],
  );

  const _openAndroidImageLib = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      let imgUri;
      if (response.didCancel) {
      } else {
        try {
          imgUri = await response.uri;
          setFieldValue('image', imgUri);
          onSetInputValueEvent('image', imgUri);
        } catch (err) {}
      }
    });
  };
  const _openIosImageLib = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      let imgUri;
      try {
        imgUri = await response.uri;
        imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
        setFieldValue('image', imgUri);
        onSetInputValueEvent('image', imgUri);
      } catch (err) {}
    });
  };
  const _openImageLibrary = () => {
    onSetCanShowCameraEvent(false);

    if (Platform.OS === 'android') {
      _openAndroidImageLib();
    } else {
      setTimeout(() => {
        _openIosImageLib();
      }, 300);
    }
  };

  const _openAndroidCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };

    ImagePicker.launchCamera(options, async (response) => {
      let imgUri;
      if (response.didCancel) {
      } else {
        try {
          imgUri = await response.uri;
          setFieldValue('image', imgUri);
          onSetInputValueEvent('image', imgUri);
        } catch (err) {}
      }
    });
  };
  const _openIosCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchCamera(options, async (response) => {
      let imgUri;
      try {
        imgUri = await response.uri;
        imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
        setFieldValue('image', imgUri);
        onSetInputValueEvent('image', imgUri);
      } catch (err) {}
    });
  };

  const _openCamera = () => {
    onSetCanShowCameraEvent(false);
    if (Platform.OS === 'android') {
      _openAndroidCamera();
    } else {
      setTimeout(() => {
        _openIosCamera();
      }, 300);
    }
  };

  const _onPressCamera = (type) => {
    switch (type) {
      case 'cancel':
        onSetCanShowCameraEvent(false);
        break;
      case 'library':
        _openImageLibrary();
        break;
      case 'camera':
        _openCamera();
        break;
    }
  };

  const _initialValues = {
    name: state?.data?.name ?? '',
    address: '',
    mobile: '',
    openTime: '',
    closeTime: '',
    domainAddress: state?.data?.domainAddress ?? '',
    numberEmployee: '',
    image: '',
  };
  const _validation = yup.object().shape({
    name: yup.string().required(t('text12')),
    domainAddress: yup.string().required(t('text13')),
  });
  const _onSubmitSuccess = async (values) => {
    onUpdateStoreEvent();
  };
  const form = useFormik({
    initialValues: _initialValues,
    validationSchema: _validation,
    onSubmit: _onSubmitSuccess,
  });

  const {handleBlur, handleSubmit, setFieldValue, errors} = form;

  // main
  return (
    <Container>
      <Header
        leftComponent={_leftComponent}
        rightComponent={_rightComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />

      <MyScrollView0 contentContainerStyle={styles.myScrollView0}>
        <MTPImage0 source={state?.data?.image} style={[styles.image0]} />
        <View style={[styles.view0]}>
          <Input
            inputContainerStyle={[styles.input4]}
            placeholderTextColor={'#000'}
            maxLength={50}
            title={t('text14')}
            required
            titleStyle={[styles.input0]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('name')}
            onFocus={() => updateInputValidEvent('name', true)}
            onEndEditing={() => updateInputValidEvent('name', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('name', noSpaceAtEntry(value));
              setFieldValue('name', noSpaceAtEntry(value));
            }}
            value={state?.data?.name ?? ''}
            errorText={isStoreNameValid || !errors.name ? null : errors.name}
            borderBottomColor={
              isStoreNameFocused
                ? '#0077be'
                : !isStoreNameValid && errors.name
                ? '#ff0033'
                : '#d0d0d0'
            }
          />
          <Input
            editable={false}
            inputContainerStyle={[styles.input4]}
            placeholderTextColor={'#000'}
            maxLength={70}
            title={t('text15')}
            required
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('domainAddress')}
            onFocus={() => updateInputValidEvent('domainAddress', true)}
            onEndEditing={() => updateInputValidEvent('domainAddress', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('domainAddress', noSpaceAtEntry(value));
              setFieldValue('domainAddress', noSpaceAtAll(value));
            }}
            value={state?.data?.domainAddress ?? ''}
            errorText={
              isDomainNameValid || !errors.domainAddress
                ? null
                : errors.domainAddress
            }
            borderBottomColor={
              isDomainNameFocused
                ? '#0077be'
                : !isDomainNameValid && errors.domainAddress
                ? '#ff0033'
                : '#d0d0d0'
            }
          />
          <Input
            inputContainerStyle={[styles.input4]}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            placeholderTextColor={'#000'}
            title={t('text16')}
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('numberEmployee')}
            onFocus={() => updateInputValidEvent('numberEmployee', true)}
            onEndEditing={() => updateInputValidEvent('numberEmployee', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('numberEmployee', noSpaceAtEntry(value));
              setFieldValue('numberEmployee', value);
            }}
            value={
              state?.data?.numberEmployee
                ? state?.data?.numberEmployee.toString()
                : ''
            }
            borderBottomColor={isNumberOfStaffFocused ? '#0077be' : '#d0d0d0'}
          />
          <Input
            inputContainerStyle={[styles.input4]}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            maxLength={12}
            placeholderTextColor={'#000'}
            title={t('text17')}
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('mobile')}
            onFocus={() => updateInputValidEvent('mobile', true)}
            onEndEditing={() => updateInputValidEvent('mobile', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('mobile', value);

              setFieldValue('mobile', value);
            }}
            value={state?.data?.mobile ?? ''}
            borderBottomColor={isMobileFocused ? '#0077be' : '#d0d0d0'}
          />
          <Input
            autoCapitalize="none"
            inputContainerStyle={[styles.input4]}
            maxLength={70}
            placeholderTextColor={'#000'}
            title={t('text23')}
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('address')}
            onFocus={() => updateInputValidEvent('address', true)}
            onEndEditing={() => updateInputValidEvent('address', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('address', noSpaceAtEntry(value));
              setFieldValue('address', noSpaceAtEntry(value));
            }}
            value={state?.data?.address ?? ''}
            borderBottomColor={isAddressFocused ? '#0077be' : '#d0d0d0'}
          />
          <View style={[styles.view1]}>
            <View style={[styles.view2]}>
              <TouchableOpacity
                onPress={() => onSetCanShowOpenTimePickerEvent(true)}>
                <InputMask
                  required
                  placeholderTextColor={'#000'}
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                  type={'datetime'}
                  options={{format: 'HH:mm'}}
                  inputContainerStyle={[styles.input4]}
                  title={t('text18')}
                  titleStyle={[styles.input3]}
                  onBlur={handleBlur('openTime')}
                  onFocus={() => updateInputValidEvent('openTime', true)}
                  onEndEditing={() => updateInputValidEvent('openTime', false)}
                  onChangeText={(value) => {
                    setFieldValue('openTime', inputHhmm(value));
                  }}
                  value={state?.data?.openTime ?? ''}
                  borderBottomColor={isOpenTimeFocused ? '#0077be' : '#d0d0d0'}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.view2]}>
              <TouchableOpacity
                onPress={() => onSetCanShowCloaseTimePickerEvent(true)}>
                <InputMask
                  pointerEvents
                  required
                  placeholderTextColor={'#000'}
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                  type={'datetime'}
                  options={{format: 'HH:mm'}}
                  inputContainerStyle={[styles.input4]}
                  title={t('text19')}
                  titleStyle={[styles.input3]}
                  onBlur={handleBlur('closeTime')}
                  onFocus={() => updateInputValidEvent('closeTime', true)}
                  onEndEditing={() => updateInputValidEvent('closeTime', false)}
                  onChangeText={(value) => {
                    setFieldValue('closeTime', inputHhmm(value));
                  }}
                  value={state?.data?.closeTime ?? ''}
                  borderBottomColor={isCloseTimeFocused ? '#0077be' : '#d0d0d0'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MyScrollView0>

      <Button
        disabled={state?.data?.name === '' || state?.data?.domainAddress === ''}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#4db1e9', '#005eff'],
          start: {x: 0, y: 1},
          end: {x: 0, y: 0},
        }}
        containerStyle={[styles.myButton0]}
        title={t('text20')}
        onPress={handleSubmit}
      />
      <CameraPopUp isVisible={state?.canShowCamera} onPress={_onPressCamera} />

      <TimePicker
        isVisible={canShowOpenTimePicker}
        titleText={t('text18')}
        time={pickerOpenTime}
        onTimeChange={onSetPickerOpenTimeEvent}
        onPressConfirm={() => {
          onSetOpenTimeEvent(pickerOpenTime);
          onSetCanShowOpenTimePickerEvent(undefined);
        }}
        onPressContainer={() => {
          onSetPickerOpenTimeEvent(state?.data?.openTime);
          onSetCanShowOpenTimePickerEvent(undefined);
        }}
      />
      <TimePicker
        isVisible={canShowCloseTimePicker}
        titleText={t('text19')}
        time={pickerCloseTime}
        onTimeChange={onSetPickerCloseTimeEvent}
        onPressConfirm={() => {
          onSetCloseTimeEvent(pickerCloseTime);
          onSetCanShowCloaseTimePickerEvent(undefined);
        }}
        onPressContainer={() => onSetCanShowCloaseTimePickerEvent(undefined)}
      />
      {state?.isLoading && <Loading />}

      {state?.errorMessage && (
        <ErrorPopUp
          msg={state?.errorMessage}
          buttonText={t('text21')}
          onPress={() => onSetErrorMessageEvent(undefined)}
        />
      )}
      {state?.successMessage && (
        <SuccessPopUp
          msg={state?.successMessage}
          buttonText={t('text22')}
          onPress={() => {
            onSetSuccessMessageEvent(undefined);
            onGoBackEvent();
          }}
        />
      )}
    </Container>
  );
});
