import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
import salozoText from '../../assets/icon/salozoText/salozo_text.png';
import HeaderNav from '../headernav/header_nav';
import Input from '../inputprimary/input';
import { styles } from './style';
import PopUp from '../popup/pop_up';
import useLogin from './use_login';
import { Container } from 'native-base';

export default React.memo(() => {
  const {
    form,
    state,
    goBack,
    updateInputValidEvent,
    isFormValid,
    onCloseErrorPopUpEvent,
    _navigation,
  } = useLogin();
  const passwordRef = useRef();

  const { handleBlur, setFieldValue, handleSubmit, errors, values } = form;
  const {
    isMobileValid,
    isPasswordValid,
    isMobileFocused,
    isPasswordFocused,
    isSubmitting,
    errorMsg,
  } = state;

  const _renderForm = () => {
    return (
      <View>
        <Text style={styles.text0}>Số điện thoại</Text>
        <Input
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef?.current?.focus()}
          textinputstyle={[styles.Input0]}
          required
          placeholder={'Nhập số điện thoại'}
          onBlur={handleBlur('mobile')}
          onFocus={() => updateInputValidEvent('mobile', true)}
          onEndEditing={() => updateInputValidEvent('mobile', false)}
          onChangeText={(value) => setFieldValue('mobile', value)}
          value={values.mobile}
          errorMsg={isMobileValid || !errors.mobile ? null : errors.mobile}
          borderColor={
            isMobileFocused
              ? '#0077be'
              : !isMobileValid && errors.mobile
                ? '#ff0033'
                : '#d0d0d0'
          }
        />
        <Text style={styles.text0}>{'Mật khẩu'}</Text>
        <Input
          maxLength={32}
          autoCapitalize="none"
          autoCorrect={false}
          inputRef={passwordRef}
          textinputstyle={[styles.Input0]}
          required
          placeholder={'Nhập mật khẩu'}
          secureTextEntry
          onBlur={handleBlur('password')}
          onFocus={() => updateInputValidEvent('password', true)}
          onEndEditing={() => updateInputValidEvent('password', false)}
          onChangeText={(value) => {
            setFieldValue('password', value.replace(/\s/g, ''));
          }}
          value={values.password}
          errorMsg={
            isPasswordValid || !errors.password ? null : errors.password
          }
          borderColor={
            isPasswordFocused
              ? '#0077be'
              : !isPasswordValid && errors.password
                ? '#ff0033'
                : '#d0d0d0'
          }
        />
      </View>
    );
  };
  return (
    <Container>
      <SafeAreaView style={styles.view0}>
        <HeaderNav
          hasLeftIcon
          containerStyle={styles.headerNav0}
          onPressLeft={goBack}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.view1}>
            <Image
              source={salozoText}
              style={styles.image0}
              resizeMode="contain"
            />
            {_renderForm()}
            <View style={styles.view2}>
              <Button
                disabled={!isFormValid()}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [
                    isFormValid() ? '#4db1e9' : '#8d8d8d',
                    isFormValid() ? '#005eff' : '#8d8d8d',
                  ],
                  start: { x: 0, y: 1 },
                  end: { x: 0, y: 0 },
                }}
                title={'ĐĂNG NHẬP'}
                onPress={handleSubmit}
                containerStyle={{ borderRadius: 20 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                _navigation.navigate('ForgotPassword');
              }}>
              <Text style={styles.text1}>{'Quên mật khẩu?'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <Spinner visible={isSubmitting} />
        <PopUp
          title={errorMsg ?? ''}
          isVisible={errorMsg ?? false}
          bottomButtonTitle={'Trở lại'}
          hasBottomButton={true}
          onPressBottomButton={onCloseErrorPopUpEvent}
        />
      </SafeAreaView>
    </Container>
  );
});
