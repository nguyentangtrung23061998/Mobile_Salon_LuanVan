import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Header, Input} from 'react-native-elements';
import back from '../../assets/icon/back/back.png';
import hidePassword from '../../assets/icon/hide_password/hide_password.png';
import showPassword from '../../assets/icon/show_password/show_password.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Loading from '../loading/loading';
import {MTPImage0} from '../mtp_image';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {PASSWORD_MAX_LENGTH} from '../../constants/app';
import {noSpaceAtAll} from '../../utility/string';
import useChangePassword from './hook';
import {setInputFocused} from './state';
import styles from './style';

export default React.memo(() => {
  // myhook
  const {
    state,
    form,
    dispatch,
    onChangePasswordSuccess,
    onPressLeftItemEvent,
    onSetErrorMessageEvent,
    onSetArePasswordsEncryptedEvent,
  } = useChangePassword();

  const isFormValid = () =>
    form.values.oldPassword !== '' &&
    form.values.newPassword !== '' &&
    form.values.newPasswordConfirmed !== '' &&
    form.isValid;

  // mysub
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={[styles.touchableOpacity0]}
        onPress={onPressLeftItemEvent}>
        <MTPImage0 source={back} style={styles.image0} />
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text0]}>Đổi mật khẩu</Text>,
    [],
  );
  const _hasError = (hasValid, hasError) => hasValid || !hasError;

  // mymain
  return (
    <Container>
      <View style={[styles.view0]}>
        <Header
          leftComponent={_leftComponent}
          centerComponent={_centerComponent}
          containerStyle={styles.header0}
        />
        <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
          <Input
            maxLength={PASSWORD_MAX_LENGTH}
            onChangeText={(value) =>
              form.setFieldValue('oldPassword', noSpaceAtAll(value))
            }
            value={form.values.oldPassword}
            onFocus={() =>
              dispatch(setInputFocused({name: 'oldPassword', isFocused: true}))
            }
            onEndEditing={() => {
              dispatch(
                setInputFocused({name: 'oldPassword', isFocused: false}),
              );
            }}
            errorMessage={
              _hasError(state.isOldPasswordValid, form.errors.oldPassword)
                ? null
                : form.errors.oldPassword
            }
            onBlur={form.handleBlur('oldPassword')}
            placeholder='Nhập mật khẩu cũ của tài khoản'
            label='Mật khẩu cũ'
            labelStyle={[styles.input0]}
            inputContainerStyle={[
              styles.input1,
              state.isOldPasswordFocused ? styles.input4 : styles.input5,
            ]}
            secureTextEntry={state.isOldPasswordEncrypted}
            containerStyle={[styles.input6]}
            inputStyle={[styles.input3]}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    onSetArePasswordsEncryptedEvent('oldPassword')
                  }>
                  <View style={[styles.view1]}>
                    <MTPImage0
                      source={
                        state.isOldPasswordEncrypted
                          ? showPassword
                          : hidePassword
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Input
            maxLength={PASSWORD_MAX_LENGTH}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    onSetArePasswordsEncryptedEvent('newPassword')
                  }>
                  <View style={[styles.view1]}>
                    <MTPImage0
                      source={
                        state.isNewPasswordEncrypted
                          ? showPassword
                          : hidePassword
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            secureTextEntry={state.isNewPasswordEncrypted}
            onChangeText={(value) => {
              form.setFieldValue('newPassword', noSpaceAtAll(value));
            }}
            value={form.values.newPassword}
            onFocus={() => {
              dispatch(setInputFocused({name: 'newPassword', isFocused: true}));
            }}
            onEndEditing={() => {
              dispatch(
                setInputFocused({name: 'newPassword', isFocused: false}),
              );
            }}
            errorMessage={
              state.isNewPasswordValid || !form.errors.newPassword
                ? null
                : form.errors.newPassword
            }
            onBlur={form.handleBlur('newPassword')}
            inputContainerStyle={[
              styles.input1,
              state.isNewPasswordFocused ? styles.input4 : styles.input5,
            ]}
            placeholder='Nhập mật khẩu mới cho tài khoản'
            label='Mật khẩu mới'
            labelStyle={[styles.input0]}
            containerStyle={[styles.input2]}
            inputStyle={[styles.input3]}
          />
          <Input
            maxLength={PASSWORD_MAX_LENGTH}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    onSetArePasswordsEncryptedEvent('newPasswordConfirmed')
                  }>
                  <View style={[styles.view1]}>
                    <MTPImage0
                      source={
                        state.isConfirmedPasswordEncrypted
                          ? showPassword
                          : hidePassword
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            secureTextEntry={state.isConfirmedPasswordEncrypted}
            onChangeText={(value) => {
              form.setFieldValue('newPasswordConfirmed', noSpaceAtAll(value));
            }}
            value={form.values.newPasswordConfirmed}
            placeholder='Nhập lại mật khẩu mới cho tài khoản'
            label='Xác nhận mật khẩu mới'
            onFocus={() => {
              dispatch(
                setInputFocused({
                  name: 'newPasswordConfirmed',
                  isFocused: true,
                }),
              );
            }}
            onEndEditing={() => {
              dispatch(
                setInputFocused({
                  name: 'newPasswordConfirmed',
                  isFocused: false,
                }),
              );
            }}
            errorMessage={
              state.isNewPasswordConfirmedValid ||
              !form.errors.newPasswordConfirmed
                ? null
                : form.errors.newPasswordConfirmed
            }
            onBlur={form.handleBlur('newPasswordConfirmed')}
            labelStyle={[styles.input0]}
            inputContainerStyle={[
              styles.input1,
              state.isNewPasswordConfirmedFocused
                ? styles.input4
                : styles.input5,
            ]}
            containerStyle={[styles.input2]}
            inputStyle={[styles.input3]}
          />
          <PrimaryButton
            disabled={!isFormValid()}
            title={'CẬP NHẬT'}
            containerStyle={[styles.button1]}
            onPress={() => {
              form.handleSubmit();
            }}
          />
        </MyScrollView0>
      </View>
      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText='Xác nhận'
          onPress={() => {
            onChangePasswordSuccess();
          }}
        />
      )}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText='Quay lại'
          onPress={() => onSetErrorMessageEvent('')}
        />
      )}
    </Container>
  );
});
