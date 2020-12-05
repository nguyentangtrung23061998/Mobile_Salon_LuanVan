import {Container} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import uploadProfileAvatar from '../../assets/icon/upload_profile_avatar/upload_profile_avatar.png';
import {DatePicker} from '../date_picker/date_picker';
import {MTPImage0} from '../mtp_image';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {MANAGER_ROLE} from '../../constants/app';
import CameraPopUp from '../storeInfo/component/cameraPopUp/camera_pop_up';
import useEditProfile from './hook';
import styles from './style';
import Loading from '../loading/loading';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import {ErrorText} from '../error_text';
import Lodash from 'lodash';
import {getErrorFromKey} from '../../utility/handle_server_errors';
export default React.memo(() => {
  const {
    state,
    role,
    form,
    onGoBackEvent,
    onPressCameraEvent,
    onSetPickerDateEvent,
    onSetCanShowDatePickerEvent,
    onSetYearOfBirthEvent,
    onSetCanShowCameraEvent,
    onSetFieldValueEvent,
    onEndEditFieldEvent,
    onSetIsInputFieldFocusedEvent,
    onResetPickerDateEvent,
    onInitPickerDateEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onResetDataEvent,
  } = useEditProfile();
  const {
    isFullNameFocused,
    isHomeTownFocused,
    isCurrentPlaceFocused,
    isIdentityCardFocused,
    isMobileFocused,
    isEmailFocused,
    data,
    canShowDatePicker,
    isFullNameValid,
    isMobileValid,
    isEmailValid,
  } = state;
  const {values, errors, handleBlur, handleSubmit} = form;
  const {
    avatar,
    fullname,
    yearOfBirth,
    homeTown,
    currentPlace,
    identityCard,
    mobile,
    email,
  } = values;

  useEffect(() => onInitPickerDateEvent(data?.yearOfBirth), []);

  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={[styles.touchableOpacity0]}
        onPress={() => {
          onGoBackEvent();
          onResetDataEvent();
        }}>
        <Image source={back} style={[styles.image1]} />
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => (
      <View style={[styles.view5]}>
        <Text style={[styles.text0]}>Chỉnh sửa thông tin cá nhân</Text>
      </View>
    ),
    [],
  );

  const _renderTop = useCallback(
    () => (
      <View style={[styles.view2]}>
        <View style={[styles.view0]}>
          <MTPImage0 style={[styles.image0]} source={avatar} />
          <TouchableOpacity
            onPress={() => onSetCanShowCameraEvent(true)}
            style={[styles.view1]}>
            <View>
              <Image source={uploadProfileAvatar} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [avatar],
  );

  const _renderBody = () => {
    return (
      <View style={[styles.view4]}>
        <Input
          autoCapitalize="words"
          autoCorrect={false}
          inputContainerStyle={[
            isFullNameFocused ? styles.input1 : styles.input2,
          ]}
          onBlur={handleBlur('fullname')}
          onChangeText={(value) => onSetFieldValueEvent('fullname', value)}
          onFocus={() => onSetIsInputFieldFocusedEvent('fullname', true)}
          onEndEditing={() => onEndEditFieldEvent('fullname', false)}
          value={fullname ?? ''}
          label={
            role === MANAGER_ROLE ? 'Họ tên quản lý:' : 'Họ tên nhân viên:'
          }
          errorMessage={
            isFullNameValid || !errors.fullname || isFullNameFocused
              ? null
              : errors.fullname
          }
          labelStyle={[styles.input0]}
        />
        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'fullname')}
          />
        )}
        <TouchableOpacity onPress={() => onSetCanShowDatePickerEvent(true)}>
          <Input
            pointerEvents="none"
            inputContainerStyle={[
              canShowDatePicker ? styles.input1 : styles.input2,
            ]}
            editable={false}
            value={yearOfBirth ?? ''}
            label="Ngày sinh:"
            labelStyle={[styles.input0]}
          />
        </TouchableOpacity>
        <Input
          onChangeText={(value) => onSetFieldValueEvent('homeTown', value)}
          inputContainerStyle={[
            isHomeTownFocused ? styles.input1 : styles.input2,
          ]}
          onBlur={handleBlur('homeTown')}
          onFocus={() => onSetIsInputFieldFocusedEvent('homeTown', true)}
          onEndEditing={() => onEndEditFieldEvent('homeTown', false)}
          value={homeTown ?? ''}
          label="Quê quán:"
          labelStyle={[styles.input0]}
        />
        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'homeTown')}
          />
        )}
        <Input
          inputContainerStyle={[
            isCurrentPlaceFocused ? styles.input1 : styles.input2,
          ]}
          onChangeText={(value) => onSetFieldValueEvent('currentPlace', value)}
          onBlur={handleBlur('currentPlace')}
          onFocus={() => onSetIsInputFieldFocusedEvent('currentPlace', true)}
          onEndEditing={() => onEndEditFieldEvent('currentPlace', false)}
          value={currentPlace ?? ''}
          label="Chỗ ở hiện tại:"
          labelStyle={[styles.input0]}
        />
        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'currentPlace')}
          />
        )}
        <Input
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          inputContainerStyle={[
            isIdentityCardFocused ? styles.input1 : styles.input2,
          ]}
          onBlur={handleBlur('identityCard')}
          onFocus={() => onSetIsInputFieldFocusedEvent('identityCard', true)}
          onEndEditing={() => onEndEditFieldEvent('identifier', false)}
          onChangeText={(value) => onSetFieldValueEvent('identityCard', value)}
          value={identityCard ? identityCard.toString() : ''}
          label="Căn cước/CMND:"
          labelStyle={[styles.input0]}
        />
        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'identityCard')}
          />
        )}
        <Input
          inputContainerStyle={[isEmailFocused ? styles.input1 : styles.input2]}
          onBlur={handleBlur('email')}
          onFocus={() => onSetIsInputFieldFocusedEvent('email', true)}
          onEndEditing={() => onEndEditFieldEvent('email', false)}
          onChangeText={(value) => onSetFieldValueEvent('email', value)}
          value={email ?? ''}
          label="Email:"
          labelStyle={[styles.input0]}
          errorMessage={
            isEmailValid || !errors.email || isEmailFocused
              ? null
              : errors.email
          }
        />

        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'email')}
          />
        )}
        <Input
          inputContainerStyle={[
            isMobileFocused ? styles.input1 : styles.input2,
          ]}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          onBlur={handleBlur('mobile')}
          onFocus={() => onSetIsInputFieldFocusedEvent('mobile', true)}
          onEndEditing={() => onEndEditFieldEvent('mobile', false)}
          onChangeText={(value) => onSetFieldValueEvent('mobile', value)}
          value={mobile ?? ''}
          label="Điện thoại:"
          labelStyle={[styles.input0]}
          errorMessage={
            isMobileValid || !errors.mobile || isMobileFocused
              ? null
              : errors.mobile
          }
        />

        {Lodash.isObject(state?.errorMessage) && (
          <ErrorText
            errorMessage={getErrorFromKey(state?.errorMessage, 'mobile')}
          />
        )}
        <Button
          onPress={handleSubmit}
          disabled={fullname === '' || mobile === ''}
          title="LƯU CHỈNH SỬA"
          titleStyle={[styles.button0]}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#4db1e9', '#005eff'],
            start: {x: 0, y: 0},
            end: {x: 0, y: 1},
          }}
          buttonStyle={[styles.button1]}
        />
      </View>
    );
  };

  const _renderPopUp = () => {
    return (
      <>
        <CameraPopUp
          isVisible={state?.canShowCamera}
          onPress={onPressCameraEvent}
        />
        <DatePicker
          isVisible={state.canShowDatePicker}
          date={state?.pickerDate}
          onPressContainer={() => {
            onResetPickerDateEvent();
            onSetCanShowDatePickerEvent(false);
          }}
          onDateChange={(val) => onSetPickerDateEvent(val)}
          onConfirm={(date) => {
            onSetYearOfBirthEvent(date);
            onSetCanShowDatePickerEvent(false);
          }}
        />
      </>
    );
  };

  // main
  return (
    <Container>
      <View style={[styles.view3]}>
        <Header
          leftComponent={_leftComponent}
          centerComponent={_centerComponent}
          centerContainerStyle={[styles.header1]}
          containerStyle={[styles.header0]}
        />
        <MyScrollView0>
          {_renderTop()}
          {_renderBody()}
        </MyScrollView0>
      </View>
      {_renderPopUp()}
      {state?.isLoading && <Loading />}
      {state?.successMessage && (
        <SuccessPopUp
          msg={state?.successMessage}
          buttonText="Xác nhận"
          onPress={() => {
            onSetSuccessMessageEvent(undefined);
            onGoBackEvent();
          }}
        />
      )}

      {state?.errorMessage && Lodash.isString(state?.errorMessage) && (
        <ErrorPopUp
          msg={state?.errorMessage}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent(undefined)}
        />
      )}
    </Container>
  );
});
