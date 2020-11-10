import plus from '../../../assets/icon/plus/plus.png';
import {Container, Spinner} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../../assets/icon/back/back.png';
import search from '../../../assets/icon/searchcolor/search.png';
import {MTPImage0} from '../../mtp_image/index';
import PopUp from '../component/error_pop_up/error_pop_up';
import List from '../component/list/example';
import styles from './style';
import useListCustomer from './use_list_customer';

export default React.memo(() => {
  const {
    state,
    onCreateCustomer,
    getAllCustomerEvent,
    onNavigateEvent,
    onSetDataEvent,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onResetStateEvent,
  } = useListCustomer();

  useEffect(() => {
    getAllCustomerEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _renderList = () => (
    <View style={styles.view5}>
      <List
        onSelectCustomer={(dt) => {
          onSetDataEvent(dt.item);
          onNavigateEvent('CustomerInfo');
        }}
        data={state?.data ?? []}
      />
    </View>
  );

  // subs
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={styles.touchableOpacity0}
        onPress={() => {
          onGoBackEvent();
          onResetStateEvent();
        }}>
        <MTPImage0 source={back} style={styles.mTPImage0} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text1]}>Danh sách khách hàng</Text>,
    [],
  );

  const _rightComponent = useCallback(
    () => (
      <TouchableOpacity>
        <MTPImage0 source={search} style={styles.mTPImage1} />
      </TouchableOpacity>
    ),
    [],
  );
  // main
  return (
    <Container>
      {state.isEnabled && (
        <Header
          leftComponent={_leftComponent}
          centerComponent={_centerComponent}
          // rightComponent={_rightComponent}
          containerStyle={[styles.header0]}
        />
      )}

      <View style={styles.view1}>
        <View style={styles.view2}>{_renderList()}</View>
      </View>
      <View style={styles.view4}>
        {state.isEnabled && (
          <Button
            title=" TẠO MỚI KHÁCH HÀNG"
            icon={<Image source={plus} />}
            buttonStyle={styles.myButton0}
            titleStyle={styles.text0}
            onPress={onCreateCustomer}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
          />
        )}
      </View>
      {state?.isLoading && (
        <View style={styles.view3}>
          <Spinner color="#fff" />
        </View>
      )}
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
    </Container>
  );
});
