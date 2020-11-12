import React from 'react';
import {Platform, View, Text, TouchableOpacity} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from './component/input/input';
import useAddCustomer from './hook';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {PHONE_MAX_LENGTH} from '../../../constants/app';
import {Spinner, Container} from 'native-base';
import PopUp from './component/error_pop_up/error_pop_up';
import styles from './style';
import SuccessPopUp from '../../success_pop_up/success_pop_up';

export default function AddCustomer() {
  const {
    state,
    navigation,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
    goBackEvent,
  } = useAddCustomer();
  const {
    isFullNameFocused,
    isFullNameValid,
    isMobileFocused,
    isMobileValid,
  } = state;
  const initialValues = {
    fullname: '',
    mobile: '',
  };
  const validation = yup.object().shape({
    fullname: yup
      .string()
      .required('Nhập họ và tên')
      .min(2, 'Nhập đủ họ và tên'),
    mobile: yup
      .string()
      .required('Nhập số điện thoại')
      .max(PHONE_MAX_LENGTH, 'Sai số điện thoại'),
  });

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const isFormValid = () =>
    form.values.fullname != '' && form.values.mobile != '' && form.isValid;
  return (
    <Container style={styles.container0}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[styles.text0]}>{'   '}HỦY</Text>
          </TouchableOpacity>
        }
        centerComponent={
          <Text style={[styles.text1]}>Thêm nhanh khách hàng</Text>
        }
        containerStyle={[styles.header0]}
      />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView0}>
        <Input
          placeholder={'Nhập tên của khách hàng'}
          title={'Họ tên khách hàng:'}
          autoCapitalize="words"
          titleStyle={styles.input0}
          borderBottomColor={isFullNameFocused ? '#0077be' : '#d0d0d0'}
          onBlur={form.handleBlur('fullname')}
          onChangeText={(value) => {
            if (value === ' ') {
              value = value.substr(1);
            }
            form.setFieldValue('fullname', value);
          }}
          value={form.values.fullname}
          onFocus={() => updateInputValidEvent('fullname', true)}
          onEndEditing={() => updateInputValidEvent('fullname', false)}
          errorText={
            isFullNameValid || !form.errors.fullname
              ? null
              : form.errors.fullname
          }
        />
        <View style={styles.view2} />
        <Input
          placeholder={'Nhập số điện thoại của khách hàng'}
          title={'Số điện thoại:'}
          maxLength={12}
          titleStyle={styles.input0}
          borderBottomColor={isMobileFocused ? '#0077be' : '#d0d0d0'}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          onBlur={form.handleBlur('mobile')}
          onChangeText={(value) => form.setFieldValue('mobile', value.trim())}
          value={form.values.mobile}
          onFocus={() => updateInputValidEvent('mobile', true)}
          onEndEditing={() => updateInputValidEvent('mobile', false)}
          errorText={
            isMobileValid || !form.errors.mobile ? null : form.errors.mobile
          }
        />
        {state?.errorTextInput && (
          <Text style={styles.text2}>{state?.errorTextInput}</Text>
        )}
      </KeyboardAwareScrollView>
      <View style={styles.view0}>
        <Button
          title="THÊM"
          disabled={!isFormValid()}
          onPress={form.handleSubmit}
          buttonStyle={styles.button0}
          titleStyle={styles.button1}
        />
      </View>
      {state.isSubmitting && (
        <View style={styles.view1}>
          <Spinner color="#fff" />
        </View>
      )}
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      {state.isSuccess && (
        <SuccessPopUp
          msg={'Tạo thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            goBackEvent();
          }}
        />
      )}
    </Container>
  );
}
