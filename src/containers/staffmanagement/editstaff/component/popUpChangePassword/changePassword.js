import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {Button, Overlay} from 'react-native-elements';
import Input from '../../../../input/input';
import useChangePassword from './hook';
import {noSpaceAtAll} from '../../../../../utility/string';
import {setInputFocused} from './state';
import {MyScrollView0} from '../../../../my_scroll_view/my_scroll_view';

export default function PopUpChangePassword({onPressBottomButton, onConfirm}) {
  const {state, dispatch, form} = useChangePassword();

  return (
    <Overlay isVisible={true} overlayStyle={[styles.modal0]}>
      <MyScrollView0 contentContainerStyle={[styles.myScrollView00]}>
        <View style={[styles.view0]}>
          <Text style={styles.text0}>{'Đổi mật khẩu nhân viên'}</Text>
          <View style={styles.view1}>
            <Text style={styles.text1}>{'Mật khẩu'}</Text>
            <Input
              secureTextEntry
              containerStyle={styles.textInput0}
              placeholder={'Nhập mật khẩu cho tài khoản'}
              onChangeText={(value) => {
                form.setFieldValue('newPassword', noSpaceAtAll(value));
              }}
              value={form.values.newPassword}
              onFocus={() => {
                dispatch(
                  setInputFocused({name: 'newPassword', isFocused: true}),
                );
              }}
              onEndEditing={() => {
                dispatch(
                  setInputFocused({name: 'newPassword', isFocused: false}),
                );
              }}
              errorText={
                state.isNewPasswordValid || !form.errors.newPassword
                  ? null
                  : form.errors.newPassword
              }
              onBlur={form.handleBlur('newPassword')}
            />
          </View>
          <View style={styles.view1}>
            <Text style={styles.text1}>{'Nhập lại mật khẩu'}</Text>
            <Input
              secureTextEntry
              containerStyle={styles.textInput0}
              placeholder={'Nhập lại mật khẩu cho tài khoản'}
              onChangeText={(value) => {
                form.setFieldValue('newPasswordConfirmed', noSpaceAtAll(value));
              }}
              value={form.values.newPasswordConfirmed}
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
              errorText={
                state.isNewPasswordConfirmedValid ||
                !form.errors.newPasswordConfirmed
                  ? null
                  : form.errors.newPasswordConfirmed
              }
              onBlur={form.handleBlur('newPasswordConfirmed')}
            />
          </View>
          <View style={styles.view1}>
            <Button
              disabled={
                !form.isValid ||
                form.values.newPassword === '' ||
                form.values.newPasswordConfirmed === ''
              }
              onPress={() => {
                form.handleSubmit();
                onConfirm(form.values.newPassword);
              }}
              title={'Xác nhận'}
              buttonStyle={styles.button0}
              titleStyle={[styles.text2]}
            />
          </View>
          <View style={styles.view1}>
            <Button
              onPress={onPressBottomButton}
              title={'Huỷ'}
              bgColor={'#004386'}
              buttonStyle={styles.button1}
              titleStyle={[styles.text3]}
            />
          </View>
        </View>
      </MyScrollView0>
    </Overlay>
  );
}
