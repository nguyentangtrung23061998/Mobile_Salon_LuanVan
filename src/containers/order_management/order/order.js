import plus from '../../../assets/icon/plus/plus.png';
import {Container, Tab, Tabs} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Button, Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import arrowDown from '../../../assets/icon/arrow_down/arrow_down.png';
import back from '../../../assets/icon/back/back.png';
import {MTPImage0} from '../../mtp_image';
import ListOderCanceled from './component/list_oder_canceled/list_oder_canceled';
import ListOderPaid from './component/list_oder_paid/list_oder_paid';
import ListOderProcessing from './component/list_oder_processing/list_oder_processing';
import useOder from './hook';
import styles from './style';
import Loading from '../../loading/loading';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import {PrimaryButton} from '../../primary_button/primary_button';

export default React.memo(() => {
  // myhook
  const {
    state,
    onNavigateEvent,
    onGoBackEvent,
    onSetIsCalendarVisibleEvent,
    onConfirmCalendarDate,
    onVisibleMonthsChangeEvent,
    onResetDayMonthYearEvent,
    onSetStatusEvent,
    onGetProcessingOrdersEvent,
    onResetStateEvent,
    onPressProcessingItem,
    onPressCancelledItem,
    onPressPaidItemEvent,
    onSetErrorMessageEvent,
  } = useOder();

  // myuseeffect
  useEffect(() => {
    onGetProcessingOrdersEvent(state.date);
  }, []);

  useEffect(() => {
    if (!state.isCalendarVisible) {
      onResetDayMonthYearEvent();
    }
  }, [state.isCalendarVisible]);

  // mysub
  const _renderHeader = useCallback(() => <></>, []);

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
    [],
  );

  const _renderOderProcessing = useCallback(() => {
    return (
      <Container style={styles.container0}>
        <ListOderProcessing
          data={state.processingData}
          onPress={onPressProcessingItem}
        />
        {state.isLoadingProcessing && <Loading />}
      </Container>
    );
  }, [state.isLoadingProcessing, state.processingData]);

  const _renderListOderPaid = useCallback(() => {
    return (
      <Container style={styles.container0}>
        <ListOderPaid
          onPress={onPressPaidItemEvent}
          data={state.completedData}
        />
        {state.isLoadingCompleted && <Loading />}
      </Container>
    );
  }, [state.isLoadingCompleted, state.completedData]);

  const _renderListOderCanceled = useCallback(() => {
    return (
      <Container style={styles.container0}>
        <ListOderCanceled
          onPress={onPressCancelledItem}
          data={state.cancelledData}
        />
        {state.isLoadingCancelled && <Loading />}
      </Container>
    );
  }, [state.isLoadingCancelled, state.cancelledData]);
  const _centerComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          onSetIsCalendarVisibleEvent(!state.isCalendarVisible);
        }}>
        <View style={[styles.view4]}>
          <Text style={styles.text0}>
            {state.day} Thg {state.month}, {state.year}
          </Text>
          <MTPImage0 source={arrowDown} style={[styles.mtpImage0]} />
        </View>
      </TouchableOpacity>
    ),
    [state.isCalendarVisible, state.month],
  );

  // mymain
  return (
    <Container>
      {state.isEnabled && (
        <>
          <Header
            containerStyle={[styles.header0]}
            leftComponent={_leftComponent}
            centerComponent={_centerComponent}
          />
          {state.isCalendarVisible && (
            <CalendarList
              enableSwipeMonths={true}
              onVisibleMonthsChange={(value) =>
                onVisibleMonthsChangeEvent(value)
              }
              onDayPress={onConfirmCalendarDate}
              markedDates={state.calendarMarkedDate}
              horizontal={true}
              theme={{
                todayTextColor: '#000',
                selectedDayBackgroundColor: '#1790e9',
              }}
              renderHeader={_renderHeader}
            />
          )}
          <View style={styles.view1}>
            <Tabs onChangeTab={({i}) => onSetStatusEvent(i)}>
              <Tab
                heading='Đang thực hiện'
                activeTabStyle={styles.tab0}
                tabStyle={[styles.tab1]}
                activeTextStyle={styles.tab2}
                textStyle={styles.tab3}>
                {_renderOderProcessing()}
              </Tab>
              <Tab
                heading='Đã thanh toán'
                activeTabStyle={styles.tab0}
                activeTextStyle={styles.tab2}
                textStyle={styles.tab3}
                tabStyle={styles.tab1}>
                {_renderListOderPaid()}
              </Tab>
              <Tab
                heading='Đã huỷ'
                activeTabStyle={styles.tab0}
                activeTextStyle={styles.tab2}
                textStyle={styles.tab3}
                tabStyle={styles.tab1}>
                {_renderListOderCanceled()}
              </Tab>
            </Tabs>
          </View>
        </>
      )}

      {state.isLoadingProcessing && !state.isEnabled && <Loading />}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent('')}
        />
      )}
      <PrimaryButton
        title='TẠO MỚI ĐƠN HÀNG'
        containerStyle={styles.button2}
        onPress={() => onNavigateEvent('CreateOrder')}
      />
    </Container>
  );
});
