import { useFormik } from 'formik';
import { Container } from 'native-base';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from 'yup';
import back from '../../assets/icon/back/back.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Loading from '../loading/loading';
import { MTPImage0 } from '../mtp_image/index';
import { MyScrollView0 } from '../my_scroll_view/my_scroll_view';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import { PHONE_MAX_LENGTH, FULLNAME_MAX_LENGTH } from '../../constants/app';
import { convertToSingleSpace, noSpaceAtEntry } from '../../utility/string';
import useAddCustomer1 from '../customer_list_from_order/hook';
import useTodo from './hook';
import styles from './style';
import MyInput from '../input/input';
import { PrimaryButton } from '../primary_button/primary_button';
export default React.memo(() => {
    const {
        state,
        onResetStateEvent,
        onGoBackEvent,
        onSetInputValuesEvent,
        onCreateCustomerEvent,
        onSetErrorMessageEvent,
        onSetSuccessMessageEvent,
      } = useTodo();
    
      const {onGetAllCustomersCustomerListEvent0} = useAddCustomer1();
      const initialValues = {
        fullname: '',
        mobile: '',
      };
    
      const validation = yup.object().shape({
        fullname: yup.string().required('Nhập họ và tên').min(2, 'Nhập đủ họ và tên'),
        mobile: yup.string().required('Nhập số điện thoại'),
      });
    
      const form = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: onCreateCustomerEvent,
      });
      const {values, errors, setFieldValue, handleSubmit} = form;
      const {fullname, mobile} = values;
    
      // function
      const _isButtonDisabled = () => fullname === '' || mobile === '';
      // subs
      const _leftComponent = useCallback(
        () => (
          <TouchableOpacity
            style={styles.touchableOpacity0}
            onPress={() => {
              onGoBackEvent();
              onResetStateEvent();
            }}>
            <MTPImage0 source={back} style={styles.mTPImage0} />
          </TouchableOpacity>
        ),
        [],
      );
    
      const _centerComponent = useCallback(
        () => <Text style={styles.text0}>Thêm nhanh khách hàng</Text>,
        [],
      );
    
      // main
      return (
        <Container>
          <Header
            leftComponent={_leftComponent}
            centerComponent={_centerComponent}
            containerStyle={styles.header0}
          />
          <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
            <MyInput
              maxLength={FULLNAME_MAX_LENGTH}
              title='Họ tên khách hàng'
              titleStyle={styles.input0}
              placeholder='Nhập tên của khách hàng'
              placeholderTextColor="#8d8d8d"
              inputStyle={styles.input1}
              borderBottomColor={state.isFullNameFocused ? '#0077be' : '#d0d0d0'}
              containerStyle={styles.input3}
              value={fullname}
              onChangeText={(value) =>
                setFieldValue(
                  'fullname',
                  convertToSingleSpace(noSpaceAtEntry(value)),
                )
              }
              onFocus={() => onSetInputValuesEvent('fullname', true)}
              onEndEditing={() => {
                setFieldValue('fullname', fullname.trimEnd());
                onSetInputValuesEvent('fullname', false);
              }}
              autoCapitalize="words"
              autoCorrect={false}
              errorText={
                state.isFullNameFocused || state.isFullNameValid || !errors.fullname
                  ? null
                  : errors.fullname
              }
            />
            <Input
              errorMessage={
                state.isMobileFocused || state.isMobileValid || !errors.mobile
                  ? null
                  : errors.mobile
              }
              maxLength={PHONE_MAX_LENGTH}
              onFocus={() => onSetInputValuesEvent('mobile', true)}
              onEndEditing={() => onSetInputValuesEvent('mobile', false)}
              label='Số điện thoại'
              labelStyle={styles.input0}
              placeholder='Nhập số điện thoại của khách hàng'
              placeholderTextColor="#8d8d8d"
              inputStyle={styles.input1}
              inputContainerStyle={
                state.isMobileFocused ? styles.input4 : styles.input2
              }
              containerStyle={styles.input3}
              value={mobile}
              onChangeText={(value) => setFieldValue('mobile', value)}
              keyboardType="number-pad"
            />
          </MyScrollView0>
          <PrimaryButton
            disabled={_isButtonDisabled()}
            onPress={handleSubmit}
            title='THÊM'
            containerStyle={styles.button0}
          />
          {state.errorMessage !== '' && (
            <ErrorPopUp
              msg={state.errorMessage}
              buttonText='Quay lại'
              onPress={() => onSetErrorMessageEvent('')}
            />
          )}
          {state.successMessage !== '' && (
            <SuccessPopUp
              msg={state.successMessage}
              buttonText='Xác nhận'
              onPress={() => {
                onSetSuccessMessageEvent('');
                onResetStateEvent();
                onGoBackEvent();
                onGetAllCustomersCustomerListEvent0();
              }}
            />
          )}
          {state.isLoading && <Loading />}
        </Container>
      );
})