import React, {useState, useCallback} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import useStaffInfo from './use_staff_info';
import editColor3x from '../../../assets/icon/edit/edit_color3x.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Header} from 'react-native-elements';
import PopUp from './component/popup/pop_up';
import PopUpError from './component/error_pop_up/error_pop_up';
import ImageView from './component/image_view/image_view';
import {Spinner, Container} from 'native-base';
import {MTPImage0} from '../liststaff/component/mtp_image';
import back from '../../../assets/icon/back/back.png';
import SuccessPopUp from '../../success_pop_up/success_pop_up';

export default function StaffInfo() {
  const {
    state,
    onNavigateEvent,
    goBackEvent,
    deleteEmployeeEvent,
    onSetDataEvent,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
    navigation,
  } = useStaffInfo();
  const [onShowPopUp, setonShowPopUp] = useState(false);
  // subs
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={styles.touchableOpacity0}
        onPress={() => {
          goBackEvent();
        }}>
        <MTPImage0 source={back} style={styles.mTPImage0} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text12]}>Thông tin nhân viên</Text>,
    [],
  );

  const _rightComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          setonShowPopUp(true);
        }}>
        <Text style={[styles.text13]}>XÓA</Text>
      </TouchableOpacity>
    ),
    [],
  );
  const _renderForm = () => {
    return (
      <View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Chức vụ: '}</Text>
          <Text style={styles.text6}>{state?.data?.position}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Năm sinh: '}</Text>
          <Text style={styles.text6}>{state?.data?.yearOfBirth ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Quê quán: '}</Text>
          <Text style={styles.text6}>{state?.data?.homeTown ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Nơi ở hiện tại: '}</Text>
          <Text style={styles.text6}>{state?.data?.currentPlace ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Căn cước/ CNMD: '}</Text>
          <Text style={styles.text6}>{state?.data?.identityCard ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Điện thoại: '}</Text>
          <Text style={styles.text6}>{state?.data?.mobile ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Email: '}</Text>
          <Text style={styles.text6}>{state?.data?.email ?? ''}</Text>
        </View>
      </View>
    );
  };
  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        rightComponent={_rightComponent}
        containerStyle={[styles.header0]}
      />
      <KeyboardAwareScrollView>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              {state?.data?.avatar !== '' && (
                <ImageView
                  imageUri={state?.data?.avatar ?? ''}
                  styleImage={styles.view3}
                />
              )}
            </View>
            <View style={styles.view4}>
              <Text style={styles.text1}>{state?.data?.fullname ?? ''}</Text>
              <View style={styles.view5}>
                <Text style={styles.text2}>{state?.data?.position ?? ''}</Text>
                <Text style={styles.text3}>
                  {state?.data?.isCashier ?? '' ? ' - Thu ngân' : null}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.view6}>
            <Text style={styles.text4}>{'Thông tin cá nhân'}</Text>
            {_renderForm()}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.view11}>
        <Button
          title=" CẬP NHẬT THÔNG TIN"
          icon={<Image source={editColor3x} resizeMode={'contain'} />}
          buttonStyle={styles.mybutton0}
          titleStyle={styles.text9}
          type={'outline'}
          onPress={() => {
            onSetDataEvent(state?.data);
            onNavigateEvent('EditStaff');
          }}
        />
      </View>
      {state.isLoading && (
        <View style={styles.view10}>
          <Spinner color="#fff" />
        </View>
      )}
      <PopUp
        isVisible={onShowPopUp}
        hasTopButton
        hasBottomButton
        title={'Xóa nhân viên này?'}
        textTitleStyle={styles.text11}
        topButtonTitle="Xóa"
        bottomButtonTitle="Hủy"
        styleTopButton={styles.view8}
        styleBottomButton={styles.view9}
        styleBottomTitle={styles.text10}
        onPressBottomButton={() => {
          setonShowPopUp(false);
        }}
        onPressTopButton={() => {
          deleteEmployeeEvent(state?.data?.id ?? '');
          setonShowPopUp(false);
        }}
      />
      {state?.errorText && (
        <PopUpError
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      {state.isDeleteSuccess && (
        <SuccessPopUp
          msg={'Xoá thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('ListStaff');
          }}
        />
      )}
    </Container>
  );
}
