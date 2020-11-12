import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import back from '../../../assets/icon/back/back.png';
import editColor3x from '../../../assets/icon/edit/edit_color3x.png';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import Loading from '../../loading/loading';
import {MTPImage0} from '../../mtp_image/index';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {PROCESSING_STATUS} from '../../../constants/api';
import {sumArray} from '../../../utility/array';
import {getSafeStringValue} from '../../../utility/string';
import PopUpDelete from './component/popupdelete/pop_up_delete';
import useinfoOrder from './hook';
import styles from './style';

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
    orderId,
  } = state.data;

  // subs
  const renderItem = (data) => {
    return (
      <View>
        <View7>
          <Text3>{getSafeStringValue(data?.item?.name, '')}</Text3>
          <Text4>
            {sumArray(data.item.styles.map((el) => el.price)).toLocaleString(
              'vi-VN',
            ) + ' Đ'}
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
      <TouchableOpacity onPress={() => onSetCanShowCancelPopUpEvent(true)}>
        <Text numberOfLines={1} style={styles.text1}>
          {t('t35')}
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  // main
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
            <Text style={styles.text2}>{t('t36')}</Text>
            <Text style={styles.Text3}>
              {getSafeStringValue(timeCreated, '')}
            </Text>
          </View>
          <View style={styles.view3}>
            <Text style={styles.text2}>{t('t37')}</Text>
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
            <Text0>{getSafeStringValue(customerName, '')}</Text0>
            <Text1>{getSafeStringValue(mobile, '')}</Text1>
          </View5>
        </View1>
        <KeyboardAwareScrollView0>
          <View6>
            <Text2>{t('t38')}</Text2>
            <FlatList
              data={services}
              renderItem={renderItem}
              keyExtractor={_keyExtractor}
            />
            <View8 />
            <View9>
              <Text5>{t('t11')}</Text5>
              <Text6>
                {total !== undefined && total
                  ? total.toLocaleString('vi-VN') + ' Đ'
                  : ''}
              </Text6>
            </View9>
            <View10>
              {status === PROCESSING_STATUS && (
                <Button1
                  title={t('t39')}
                  type="outline"
                  icon={<Image source={editColor3x} resizeMode={'contain'} />}
                  onPress={onNavigateToEditOrderEvent}
                />
              )}
            </View10>
          </View6>
        </KeyboardAwareScrollView0>
      </View0>
      <View2>
        {status === PROCESSING_STATUS && (
          <Button0
            title={t('t40')}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
            onPress={onFinishOrderEvent}
          />
        )}
      </View2>

      {state.canShowCancelPopUp && (
        <PopUpDelete0
          hasTopButton
          hasBottomButton
          title={t('t41') + ' ?'}
          topButtonTitle={t('t13')}
          bottomButtonTitle={t('t14')}
          onPressBottomButton={() => onSetCanShowCancelPopUpEvent(false)}
          onPressTopButton={onCancelOrderEvent}
        />
      )}
      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText={t('t13')}
          onPress={() => {
            onSetSuccessMessageEvent('');
            onGoBackEvent();
          }}
        />
      )}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText={t('t26')}
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
const PopUpDelete0 = styled(PopUpDelete).attrs({
  textTitleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.58,
  },
  styleTopButton: {
    backgroundColor: '#ff4849',
  },
  styleBottomButton: {
    backgroundColor: '#064386',
  },
  styleBottomTitle: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
    letterSpacing: -0.41,
  },
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
    width: '100%',
    borderColor: '#1790e9',
    borderWidth: 1,
  },
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
  },
})``;
