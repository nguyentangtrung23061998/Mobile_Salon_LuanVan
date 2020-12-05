import {useFormik} from 'formik';
import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Header, Input as RNEInput} from 'react-native-elements';
import * as yup from 'yup';
import back from '../../assets/icon/back/back.png';
import camera from '../../assets/icon/camera/camera.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Input, {InputMask} from '../input/input';
import Loading from '../loading/loading';
import {MTPImage0} from '../mtp_image';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import TimePicker from '../time_picker/time_picker';
import {
  MAX_DIGITS_NUMBER_OF_STAFF,
  PHONE_MAX_LENGTH,
  STORE_ADDRESS_MAX_LENGTH,
  STORE_NAME_MAX_LENGTH,
} from '../../constants/app';
import {inputHhmm} from '../../utility/input';
import {noSpaceAtEntry, numberOnly} from '../../utility/string';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import styles from './style';
import useStoreInfo from './use_store_info';

export default React.memo(() => {
  // myhook
  const {
    state,
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
    onPressSelectorPopUpEvent,
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
    () => <Text style={styles.text0}>Quay lại</Text>,
    [],
  );

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
    name: yup.string().required('Nhập tên miền địa chỉ'),
    domainAddress: yup
      .string()
      .required('Nhập tên miền địa chỉ')
      .matches(/^[a-z][a-z0-9]*$/i, 'Tên miền không hợp lệ'),
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
            maxLength={STORE_NAME_MAX_LENGTH}
            title='Tên cửa hàng'
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

          <RNEInput
            label={
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.input3}>Tên miền địa chỉ</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
            }
            editable={false}
            containerStyle={styles.rNEInput0}
            inputContainerStyle={styles.rNEInput1}
            inputStyle={styles.rNEInput2}
            rightIcon={<Text style={styles.input6}>.salozo.com</Text>}
            value={state?.data?.domainAddress ?? ''}
          />
          <Input
            maxLength={MAX_DIGITS_NUMBER_OF_STAFF}
            inputContainerStyle={[styles.input4]}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            placeholderTextColor={'#000'}
            title='Số lượng nhân viên'
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('numberEmployee')}
            onFocus={() => updateInputValidEvent('numberEmployee', true)}
            onEndEditing={() => updateInputValidEvent('numberEmployee', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('numberEmployee', numberOnly(value));
              setFieldValue('numberEmployee', numberOnly(value));
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
            maxLength={PHONE_MAX_LENGTH}
            placeholderTextColor={'#000'}
            title= 'Số điện thoại'
            titleStyle={[styles.input3]}
            containerStyle={[styles.input2]}
            onBlur={handleBlur('mobile')}
            onFocus={() => updateInputValidEvent('mobile', true)}
            onEndEditing={() => updateInputValidEvent('mobile', false)}
            onChangeText={(value) => {
              onSetInputValueEvent('mobile', numberOnly(value));

              setFieldValue('mobile', numberOnly(value));
            }}
            value={state?.data?.mobile ?? ''}
            borderBottomColor={isMobileFocused ? '#0077be' : '#d0d0d0'}
          />
          <Input
            autoCapitalize="none"
            inputContainerStyle={[styles.input4]}
            maxLength={STORE_ADDRESS_MAX_LENGTH}
            placeholderTextColor={'#000'}
            title='Địa chỉ'
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
                  editable={false}
                  type={'datetime'}
                  options={{format: 'HH:mm'}}
                  inputContainerStyle={[styles.input4]}
                  title='Giờ mở cửa'
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
                  editable={false}
                  type={'datetime'}
                  options={{format: 'HH:mm'}}
                  inputContainerStyle={[styles.input4]}
                  title='Giờ đóng cửa'
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
        <View style={{flex: 1}}></View>
        <PrimaryButton
          disabled={
            state?.data?.name === '' || state?.data?.domainAddress === ''
          }
          containerStyle={[styles.myButton0]}
          title="CẬP NHẬT"
          onPress={handleSubmit}
        />
      </MyScrollView0>

      <CameraPopUp
        isVisible={state?.canShowCamera}
        onPress={onPressSelectorPopUpEvent}
      />

      <TimePicker
        isVisible={canShowOpenTimePicker}
        titleText='Giờ mở cửa'
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
        titleText='Giờ đóng cửa'
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
          buttonText='Quay lại'
          onPress={() => onSetErrorMessageEvent(undefined)}
        />
      )}
      {state?.successMessage && (
        <SuccessPopUp
          msg={state?.successMessage}
          buttonText='Xác nhận'
          onPress={() => {
            onSetSuccessMessageEvent(undefined);
            // onGoBackEvent();
          }}
        />
      )}
    </Container>
  );
});
