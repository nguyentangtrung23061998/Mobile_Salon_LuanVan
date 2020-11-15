import {Container} from 'native-base';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import back from '../../assets/icon/back/back.png';
import edit from '../../assets/icon/edit_style/edit_style.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import MyImage from '../image/image';
import Loading from '../loading/loading';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {getStringFromIndexRange} from '../../utility/string';
import PopUp from './component/popup/pop_up';
import useTodo from './hook';
import styles from './style';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';

export default function AppointmentDetail() {
  const {
    state,
    onGoBackEvent,
    confirmAppointmentSuccessEvent,
    onSetMsgSuccessEvent,
    onSetMsgErrEvent,
    onCancelAppointmentEvent,
    setOnShowPopUpCancel,
    onShowPopUpCancel,
    onShowPopUpArrived,
    setOnShowPopUpArrived,
    onGoToUpdateAppointmentEvent,
  } = useTodo();

  const {msgSuccess, msgErr} = state;
  const _leftComponent = () => (
    <TouchableOpacity onPress={onGoBackEvent}>
      <View style={styles.view3}>
        <Image0 source={back} />
      </View>
    </TouchableOpacity>
  );
  const _rightComponent = () => (
    <TouchableOpacity0 onPress={onGoToUpdateAppointmentEvent}>
      <Image1 source={edit} />
    </TouchableOpacity0>
  );

  const _handleCustomerName = (customerName) => {
    if (customerName.length >= 24) {
      return getStringFromIndexRange(customerName, 0, 23) + '...';
    }
    return customerName;
  };

  const _handleCreatorName = (creatorName) => {
    if (creatorName.length >= 24) {
      return getStringFromIndexRange(creatorName, 0, 23) + '...';
    }
    return creatorName;
  };
  const _centerComponent = () => <Text0>Mã lịch hẹn #{state.data.code}</Text0>;
  return (
    <Container>
      <Header0
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        rightComponent={
          state.data.state !== 'Đã xác nhận' ? <></> : _rightComponent()
        }
      />
      <View0>
        <MyScrollView0
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 25}}>
          <View1>
            <MyImage source={state.data.image} style={[styles.myImage0]} />
            <View2>
              <Text1>{_handleCustomerName(state.data.customerName)}</Text1>
              <Text2>{state.data.phone}</Text2>
            </View2>
          </View1>

          <View3>
            <Text3>Thông tin lịch hẹn</Text3>
            <View4>
              <Text4>Trạng thái</Text4>
              <Text5>{state.data.state}</Text5>
            </View4>
            <View4>
              <Text4>Ngày hẹn</Text4>
              <Text6>{getStringFromIndexRange(state.data.date, 0, 10)}</Text6>
            </View4>
            <View4>
              <Text4>Thời gian</Text4>
              <Text6>{state.data.time}</Text6>
            </View4>
            <View4>
              <Text4>Số lượng khách</Text4>
              <Text6>{state.data.numberCustomer}</Text6>
            </View4>
            <View4>
              <Text4>Người tạo</Text4>
              <Text6>{_handleCreatorName(state.data.creator)}</Text6>
            </View4>
            <View4>
              <Text4>Ghi chú</Text4>
              <Text6>
                {state.data.note.length > 25
                  ? getStringFromIndexRange(state.data.note, 0, 25) + '...'
                  : state.data.note}
              </Text6>
            </View4>
          </View3>
          <View style={{flex: 1}}></View>
          {state.data.state === 'Đã xác nhận' && (
            <View5>
              <Button0
                title={'HỦY BỎ'}
                onPress={() => {
                  setOnShowPopUpCancel(true);
                }}
              />
              <Button1
                title={'ĐÃ ĐẾN'}
                onPress={() => {
                  setOnShowPopUpArrived(true);
                }}
              />
            </View5>
          )}
          {state.data.state === 'Đã đến' && (
            <View6>
              <Button2
                title={'HỦY BỎ'}
                onPress={() => {
                  setOnShowPopUpCancel(true);
                }}
              />
            </View6>
          )}
        </MyScrollView0>
      </View0>
      {state.isLoading && <Loading />}
      {msgSuccess && (
        <SuccessPopUp
          msg={msgSuccess}
          buttonText={'Xác nhận'}
          onPress={() => onSetMsgSuccessEvent(undefined)}
        />
      )}
      {msgErr && (
        <ErrorPopUp
          msg={msgErr}
          buttonText={'Quay lại'}
          onPress={() => onSetMsgErrEvent(undefined)}
        />
      )}
      {onShowPopUpCancel && (
        <PopUp
          hasTopButton
          hasBottomButton
          title={'Huỷ bỏ?'}
          textTitleStyle={styles.text1}
          topButtonTitle="Huỷ"
          bottomButtonTitle="Quay lại"
          styleTopButton={styles.view0}
          styleBottomButton={styles.view1}
          styleBottomTitle={styles.text0}
          onPressBottomButton={() => {
            setOnShowPopUpCancel(false);
          }}
          onPressTopButton={() => {
            setOnShowPopUpCancel(false);
            onCancelAppointmentEvent();
          }}
        />
      )}

      {onShowPopUpArrived && (
        <PopUp
          hasTopButton
          hasBottomButton
          title={'Xác nhận?'}
          textTitleStyle={styles.text1}
          topButtonTitle="Đã đến?"
          bottomButtonTitle="Quay lại"
          styleTopButton={styles.view2}
          styleBottomButton={styles.view1}
          styleBottomTitle={styles.text0}
          onPressBottomButton={() => {
            setOnShowPopUpArrived(false);
          }}
          onPressTopButton={() => {
            setOnShowPopUpArrived(false);
            confirmAppointmentSuccessEvent();
          }}
        />
      )}
    </Container>
  );
}

const View0 = styled(View).attrs({})`
  flex: 1;
  background-color: #fff;
`;
const View1 = styled(View).attrs({})`
  flex-direction: row;
  align-items: center;
`;
const View2 = styled(View).attrs({})``;
const View3 = styled(View).attrs({})`
  flex: 1;
  padding-top: 30px;
`;
const View4 = styled(View).attrs({})`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const View5 = styled(View).attrs({})`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 35px;
`;
const View6 = styled(View).attrs({})`
  justify-content: space-between;
  align-items: center;
  margin-vertical: 35px;
`;

const Header0 = styled(Header).attrs({
  containerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
})`
  flex: 1;
  background-color: #fff;
`;

const Image0 = styled(Image).attrs({})``;
const Image1 = styled(Image).attrs({})``;

const FastImage0 = styled(FastImage).attrs({
  resizeMode: FastImage.resizeMode.stretch,
})`
  width: 90px;
  height: 90px;
  border-radius: ${90 / 2}px;
`;

const Text0 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 17px;
  line-height: 21px;
  color: #000;
`;
const Text1 = styled(Text).attrs({})`
  font-family: Quicksand-Regular;
  font-size: 20px;
  line-height: 25px;
  color: #000;
`;
const Text2 = styled(Text).attrs({})`
  font-family: Quicksand-Medium;
  font-size: 16px;
  line-height: 20px;
  color: #7e7e7e;
`;
const Text3 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 18px;
  line-height: 23px;
  color: #000;
`;
const Text4 = styled(Text).attrs({})`
  font-family: Quicksand-Regular;
  font-size: 15px;
  line-height: 19px;
  color: #000;
`;
const Text5 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 15px;
  line-height: 19px;
  color: #1790e9;
`;
const Text6 = styled(Text4).attrs({})`
  color: #7e7e7e;
`;

const TouchableOpacity0 = styled(TouchableOpacity).attrs({})`
  padding: 10px 25px 10px 10px;
`;

const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
})``;

const Button0 = styled(Button).attrs({
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#1792e6',
  },
  buttonStyle: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#1792e6',
    borderWidth: 1.5,
  },
  containerStyle: {
    marginTop: 100,
    width: '48%',
  },
})``;

const Button1 = styled(Button).attrs({
  ViewComponent: LinearGradient,
  linearGradientProps: {
    colors: ['#4db1e9', '#005eff'],
    start: {x: 0, y: 1},
    end: {x: 0, y: 0},
  },
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
  },
  buttonStyle: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#1792e6',
    borderWidth: 1.5,
  },
  containerStyle: {
    width: '48%',
    marginTop: 100,
  },
})``;

const Button2 = styled(Button).attrs({
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#1792e6',
  },
  buttonStyle: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#1792e6',
    borderWidth: 1.5,
  },
  containerStyle: {
    marginTop: 100,
    width: '48%',
  },
})``;
