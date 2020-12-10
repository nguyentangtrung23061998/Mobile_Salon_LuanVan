import {Container, Tab, Tabs} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Text} from 'react-native';
import {Header} from 'react-native-elements';
import {AndroidStatusBar} from '../android_status_bar/android_status_bar';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import useGlobalTodo from './global_hook';
import useLocalTodo from './local_hook';
import withLocalState from './local_state';
import styles from './style';
import TotalProfit from './component/total_profit/total_profit';
import LineChart from './component/line_chart/line_chart';
import PieChart from './component/pie_chart/pie_chart';
import Loading from '../loading/loading';
import {TimerPicker0} from './component/timer_picker0/timer_picker0';

export default withLocalState(
  React.memo(() => {
    const {
      localState,
      onGetReportTotalEvent,
      onSetCanShowTimerPicker0Event,
    } = useLocalTodo();

    // myuseeffect
    useEffect(() => {
      onGetReportTotalEvent();
    }, []);

    // mysub
    const _centerComponent = useCallback(
      () => <Text style={styles.text0}>Thống kê</Text>,
      [],
    );

    const _renderTotalProfit = useCallback(
      () => (
        <Container style={styles.container0}>
          <TotalProfit
            onPress={() => onSetCanShowTimerPicker0Event(true)}
            total={localState.data.total}
          />
        </Container>
      ),
      [localState.data.total],
    );

    // mymain
    return (
      <Container>
        <AndroidStatusBar />
        <Header
          centerComponent={_centerComponent}
          containerStyle={styles.header0}
        />
        <Container>
          <Tabs>
            <Tab
              heading="Doanh Thu"
              activeTabStyle={styles.activeTabStyle0}
              activeTextStyle={styles.activeTextStyle0}
              tabStyle={styles.tabStyle0}>
              {_renderTotalProfit()}
            </Tab>
            <Tab
              heading="Biểu đồ chi tiết"
              activeTextStyle={styles.activeTextStyle0}
              activeTabStyle={styles.activeTabStyle0}
              tabStyle={styles.tabStyle0}>
              <LineChart />
            </Tab>
            <Tab
              heading="Biểu đồ dịch vụ"
              activeTextStyle={styles.activeTextStyle0}
              activeTabStyle={styles.activeTabStyle0}
              tabStyle={styles.tabStyle0}>
              <PieChart />
            </Tab>
          </Tabs>
        </Container>
        {localState.isLoading && <Loading />}
        {localState.canShowTimerPicker0 && <TimerPicker0 />}
      </Container>
    );
  }),
);
