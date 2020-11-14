import {Container} from 'native-base';
import React, {useCallback, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import back from '../../../assets/icon/back/back.png';
import editColor3x from '../../../assets/icon/edit/edit_color3x.png';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import Loading from '../../loading/loading';
import {MTPImage0} from '../../mtp_image/index';
import {PrimaryButton} from '../../primary_button/primary_button';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {PROCESSING_STATUS} from '../../../constants/api';
import {sumArray} from '../../../utility/array';
import {
  getSafeStringValue,
  getStringFromIndexRange,
} from '../../../utility/string';
import PopUp from './component/popup/pop_up';
import PopUpDelete from './component/popupdelete/pop_up_delete';
import useinfoOrder from './hook';
import styles from './style';
import {MyScrollView0} from '../../my_scroll_view/my_scroll_view';

export default function InfoOrder() {
  // myhook
  const {
    state,
    onGoBackEvent,
    onCancelOrderEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onFinishOrderEvent,
    onNavigateToEditOrderEvent,
    onSetCanShowCancelPopUpEvent,
    setOnShowPopUpPay,
    onShowPopUpPay,
  } = useinfoOrder();

  const {
    orderNumber,
    total,
    timeCreated,
    dateCreated,
    status,
    avatar,
    customerName,
    mobile,
    services,
  } = state.data;

  const [canShowDeletePopUp, setCanShowDeletePopUp] = useState(false);

  const _handleTotal = () => {
    let total = 0;
    state.data.services.map((el0) => {
      el0.styles.map((el1) => {
        total = el1.price + total;
      });
    });
    return total.toLocaleString();
  };

  // subs
  const renderItem = (data) => {
    return (
      <View>
        <View7>
          <Text3>{getSafeStringValue(data?.item?.name, '')}</Text3>
          <Text4>
            {sumArray(data.item.styles.map((el) => el.price)).toLocaleString() +
              ' Đ'}
          </Text4>
        </View7>
      </View>
    );
  };

  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={onGoBackEvent}
        style={styles.touchableOpacity0}>
        <MTPImage0 source={back} style={styles.mTPImage0} />
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => (
      <Text style={styles.text0}>
        {getSafeStringValue(orderNumber) === ''
          ? ''
          : `#${getSafeStringValue(orderNumber)}`}
      </Text>
    ),
    [orderNumber],
  );

  const _rightComponent = useCallback(
    () => (
      <TouchableOpacity onPress={() => setCanShowDeletePopUp(true)}>
        <Text numberOfLines={1} style={styles.text1}>
        HỦY ĐƠN
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  const _handleCustomerName = (customerName) => {
    if (customerName.length >= 20) {
      return getStringFromIndexRange(customerName, 0, 19) + '...';
    }
    return customerName;
  };
  // mymain
  return (
    <Container>
      <Header
        leftComponent={_leftComponent}
        containerStyle={styles.header0}
        centerComponent={_centerComponent}
        rightComponent={
          status === PROCESSING_STATUS ? _rightComponent() : <></>
        }
      />
      <View style={styles.view0}>
        <View>
          <View style={styles.view1}>
            <Text style={styles.text2}>
            TẠO LÚC
              {': '}
            </Text>
            <Text style={styles.Text3}>
              {getSafeStringValue(timeCreated, '')}
            </Text>
          </View>
          <View style={styles.view3}>
            <Text style={styles.text2}>
            NGÀY
              {': '}
            </Text>
            <Text style={styles.Text3}>
              {getSafeStringValue(dateCreated, '')}
            </Text>
          </View>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text4}>{getSafeStringValue(status, '')}</Text>
        </View>
      </View>
      <View0>
        <View1>
          <View3>
            <MTPImage0 source={avatar} style={styles.mtpImage00} />
          </View3>
          <View5>
            <Text0>{_handleCustomerName(customerName)}</Text0>
            <Text1>{getSafeStringValue(mobile, '')}</Text1>
          </View5>
        </View1>
        <MyScrollView0 contentContainerStyle={{flexGrow: 1}}>
          <View6>
            <Text2>DỊCH VỤ'</Text2>
            <FlatList
              data={services}
              renderItem={renderItem}
              keyExtractor={_keyExtractor}
            />
            <View8 />
            {state.data.note !== '' && (
              <>
                <Text style={styles.text8}>Ghi chú: </Text>
                <Text style={styles.text7}>{state.data.note}</Text>
              </>
            )}
            <View9>
              <Text5>THÀNH TIỀN</Text5>
              <Text6>{_handleTotal()}</Text6>
            </View9>
            <View10>
              {status === PROCESSING_STATUS && (
                <Button1
                  title='CHỈNH SỬA ĐƠN HÀNG'
                  type="outline"
                  icon={
                    <Image
                      style={styles.image0}
                      source={editColor3x}
                      resizeMode={'contain'}
                    />
                  }
                  onPress={onNavigateToEditOrderEvent}
                />
              )}
            </View10>
          </View6>
          <View style={{flex: 1}}></View>
          {status === PROCESSING_STATUS && (
            <PrimaryButton
              containerStyle={{marginVertical: 35, marginHorizontal: 25}}
              title='THANH TOÁN'
              onPress={() => {
                setOnShowPopUpPay(true);
              }}
            />
          )}
        </MyScrollView0>
      </View0>

      {onShowPopUpPay && (
        <PopUp
          hasTopButton
          hasBottomButton
          title={'Xác nhận thanh toán?'}
          textTitleStyle={styles.text6}
          topButtonTitle="Thanh toán"
          bottomButtonTitle="Hủy"
          styleTopButton={styles.view4}
          styleBottomButton={styles.view5}
          styleBottomTitle={styles.text5}
          onPressBottomButton={() => {
            setOnShowPopUpPay(false);
          }}
          onPressTopButton={() => {
            setOnShowPopUpPay(false);
            onFinishOrderEvent();
          }}
        />
      )}

      {canShowDeletePopUp && (
        <PopUpDelete
          hasTopButton
          hasBottomButton
          title={'Bạn chắc chắn muốn hủy đơn hàng này' + ' ?'}
          topButtonTitle='Xác nhận'
          bottomButtonTitle='Quay lại'
          textTitleStyle={styles.popUpDelete0}
          styleTopButton={styles.popUpDelete1}
          styleBottomButton={styles.popUpDelete2}
          styleBottomTitle={styles.popUpDelete3}
          onPressBottomButton={() => setCanShowDeletePopUp(false)}
          onPressTopButton={() => {
            setCanShowDeletePopUp(false);
            onCancelOrderEvent();
          }}
        />
      )}
      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText='Xác nhận'
          onPress={() => {
            onSetSuccessMessageEvent('');
            onGoBackEvent();
          }}
        />
      )}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText='Quay lại'
          onPress={() => {
            onSetErrorMessageEvent('');
          }}
        />
      )}
    </Container>
  );
}

const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({
  flex: 1,
})``;

const View0 = styled(View).attrs({
  flex: 1,
})``;
const View2 = styled(View).attrs({
  position: 'absolute',
  paddingHorizontal: 25,
  bottom: 0,
  width: '100%',
})``;
const View1 = styled(View).attrs({
  height: 100,
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#e8e8e8',
})``;
const View3 = styled(View).attrs({
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
})``;

const View5 = styled(View).attrs({
  flexDirection: 'column',
  paddingLeft: 10,
  justifyContent: 'center',
})``;
const View6 = styled(View).attrs({
  flex: 1,
  paddingHorizontal: 25,
  paddingTop: 20,
  marginBottom: 150,
})``;
const View7 = styled(View).attrs({
  flexDirection: 'row',
  marginBottom: 20,
})``;
const View8 = styled(View).attrs({
  borderWidth: 0.5,
  borderStyle: 'dashed',
  width: '100%',
})``;
const View9 = styled(View).attrs({
  flexDirection: 'row',
  top: 25,
})``;
const View10 = styled(View).attrs({
  alignItems: 'center',
  top: 50,
})``;
const Text0 = styled(Text).attrs({})`
  font-family: 'Quicksand-Regular';
  font-size: 20px;
  line-height: 25px;
`;
const Text1 = styled(Text).attrs({})`
  font-family: 'Quicksand-Medium';
  font-size: 16px;
  line-height: 20px;
  color: #9b9b9b;
  margin-top: 10px;
`;
const Text2 = styled(Text).attrs({})`
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  line-height: 18px;
  color: #9b9b9b;
  margin-bottom: 20px;
`;
const Text3 = styled(Text).attrs({})`
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  line-height: 18px;
`;
const Text4 = styled(Text).attrs({})`
  font-family: 'Quicksand-Medium';
  font-size: 14px;
  line-height: 18px;
  color: #e55252;
  position: absolute;
  right: 0px;
`;
const Text5 = styled(Text).attrs({})`
  color: #000;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
  line-height: 20px;
  text-align: left;
`;
const Text6 = styled(Text).attrs({})`
  color: #00c4ae;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  right: 0px;
`;
const Button0 = styled(Button).attrs({
  buttonStyle: {
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
})``;
const Button1 = styled(Button).attrs({
  buttonStyle: {
    height: 36,
    borderRadius: 18,
    borderColor: '#1790e9',
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
  },
})``;
