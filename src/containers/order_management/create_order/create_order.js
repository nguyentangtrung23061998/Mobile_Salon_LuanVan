import {useFormik} from 'formik';
import {Container} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import {TextArea} from '../../input/input';
import Loading from '../../loading/loading';
import {MTPFlatList0} from '../../mtp_flat_list/mtp_flat_list';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {sumArray} from '../../../utility/array';
import {
  getSafeStringValue,
  getStringLength,
  isTwoStringEqual,
  noSpaceAtEntry,
} from '../../../utility/string';
import Input from './component/input/input';
import useCreateOrder from './hook';
import {INIT_CUSTOMER_NAME} from './state';
import styles from './style';
import useSelectStyle from '../../select_style/hook';
export default function CreateOrder() {
  // myhook
  const {
    state,
    onNavigateEvent,
    onSubmitSuccess,
    onGoBackEvent,
    onSetMsgErrEvent,
    onHandleNameMobileValueEvent,
    onCloseSuccessPopUpEvent,
    onResetState,
  } = useCreateOrder();

  const {onResetStateSelectStateEvent0} = useSelectStyle();

  const isButtonDisabled = () => {
    return (
      isTwoStringEqual(state.customerName, INIT_CUSTOMER_NAME) ||
      state.serviceData.length === 0
    );
  };
  const initialValues = {note: ''};
  const validation = yup.object().shape({});
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const _handleTotal = () => {
    let total = 0;
    state.serviceData.map((el0) => {
      el0.styles.map((el1) => {
        total = el1.price + total;
      });
    });
    return total;
  };
  // mysub
  const _renderItem = (data) => {
    const {item, index} = data;
    const lastIndex = state.serviceData.length - 1;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onNavigateEvent('SelectStyle')}>
        <View
          style={[
            styles.view4,
            index === 0 ? styles.view5 : null,
            index === lastIndex ? styles.view6 : null,
          ]}>
          <Text style={styles.text6}>{getSafeStringValue(item.name)}</Text>
          <Text style={styles.text7}>
            {sumArray(item.styles.map((el) => el.price)) + ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // mymain
  return (
    <Container style={styles.container0}>
      <View style={styles.view0}>
        <Header
          containerStyle={styles.header0}
          leftComponent={
            <TouchableOpacity onPress={onGoBackEvent}>
              <Text style={styles.text0}>Tạo mới đơn hàng</Text>
            </TouchableOpacity>
          }
          centerComponent={<Text style={styles.text1}>Tạo mới đơn hàng</Text>}
        />
        <MTPFlatList0
          ListHeaderComponent={
            <>
              <Input
                label='Chọn khách hàng'
                value={onHandleNameMobileValueEvent()}
                onPress={() => {
                  onNavigateEvent('CustomerListFromOrder');
                }}
              />
              <View style={styles.view1} />
              {state.serviceData.length > 0 && (  
                <Text style={styles.text8}>Dịch vụ</Text>
              )}
              {state.serviceData.length === 0 && (
                <Input
                  label='Dịch vụ'
                  value={state.customerService}
                  onPress={() => onNavigateEvent('SelectStyle')}
                />
              )}
            </>
          }
          contentContainerStyle={styles.mTPFlatList00}
          data={state.serviceData}
          renderItem={_renderItem}
          ListFooterComponentStyle={styles.mTPFlatList01}
          ListFooterComponent={
            <>
              <View style={styles.view2} />
              <TextArea
                onChangeText={(value) =>
                  form.setFieldValue('note', noSpaceAtEntry(value))
                }
                characterCount={getStringLength(form.values.note) + '/200'}
                title='Ghi chú'
                placeholder='Nhập ghi chú cho đơn hàng'
                value={form.note}
              />
              <View style={styles.view3}>
                <Text style={styles.text2}>THÀNH TIỀN</Text>
                <Text style={styles.text3}>
                  {_handleTotal()}
                  {'  Đ'}
                </Text>
              </View>
            </>
          }
        />

        <Button
          title='LƯU ĐƠN HÀNG'
          titleStyle={isButtonDisabled() ? styles.text4 : styles.text5}
          disabled={isButtonDisabled()}
          onPress={form.handleSubmit}
          containerStyle={isButtonDisabled() ? styles.button0 : styles.button1}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [
              isButtonDisabled() ? '#9b9b9b' : '#ffffff',
              isButtonDisabled() ? '#9b9b9b' : '#ffffff',
            ],
            start: {x: 0, y: 1},
            end: {x: 0, y: 0},
          }}
        />
      </View>
      {state.isLoading && <Loading />}
      {state.errorText && (
        <ErrorPopUp
          msg={state.errorText}
          buttonText='Mật khẩu phải hơn 8 kí tự'
          onPress={() => onSetMsgErrEvent(undefined)}
        />
      )}
      {state.isSuccess && (
        <SuccessPopUp
          msg={'Thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            onGoBackEvent();
            onResetState();
            onResetStateSelectStateEvent0();
          }}
        />
      )}
    </Container>
  );
}
