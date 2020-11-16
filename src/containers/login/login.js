import PopUp from '../popup/pop_up.js';
import {Container} from 'native-base';
import React, {useRef} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import salozoText from '../../assets/icon/salozoText/salozo_text.png';
import {HeaderNavigation} from '../header_navigation/header_navigation';
import Input from '../inputprimary/input';
import Loading from '../loading/loading';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import {PASSWORD_MAX_LENGTH, PHONE_MAX_LENGTH} from '../../constants/app';
import {numberOnly} from '../../utility/string';
import {styles} from './style';
import useLogin from './use_login';

export default React.memo(() => {
  const {
    form,
    state,
    goBack,
    updateInputValidEvent,
    isFormValid,
    onCloseErrorPopUpEvent,
  } = useLogin();
  const passwordRef = useRef();

  const {handleBlur, setFieldValue, handleSubmit, errors, values} = form;
  const {
    isMobileValid,
    isPasswordValid,
    isMobileFocused,
    isPasswordFocused,
    isSubmitting,
    errorMsg,
  } = state;

  // mysub
  const _renderPopUps = () => <>{isSubmitting && <Loading />}</>;

  const _renderForm = () => {
    return (
      <View>
        <Text style={styles.text0}>Số điện thoại</Text>
        <Input
          maxLength={PHONE_MAX_LENGTH}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef?.current?.focus()}
          textinputstyle={[styles.Input0]}
          required
          placeholder={'Nhập số điện thoại'}
          onBlur={handleBlur('mobile')}
          onFocus={() => updateInputValidEvent('mobile', true)}
          onEndEditing={() => updateInputValidEvent('mobile', false)}
          onChangeText={(value) => setFieldValue('mobile', numberOnly(value))}
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
          maxLength={PASSWORD_MAX_LENGTH}
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
      <HeaderNavigation />
      <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
        <Image source={salozoText} style={styles.image0} resizeMode="contain" />
        {_renderForm()}
        <View style={styles.view2}>
          <PrimaryButton
            disabled={!isFormValid()}
            title={'ĐĂNG NHẬP'}
            onPress={handleSubmit}
          />
        </View>
        {/* TODO
         <TouchableOpacity
            onPress={() => {
              _navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.text1}>{'Quên mật khẩu?'}</Text>
          </TouchableOpacity> */}
      </MyScrollView0>
      <PopUp
        title={errorMsg ?? ''}
        isVisible={errorMsg ?? false}
        bottomButtonTitle={'Trở lại'}
        hasBottomButton={true}
        onPressBottomButton={onCloseErrorPopUpEvent}
      />

      {_renderPopUps()}
    </Container>
  );
});
