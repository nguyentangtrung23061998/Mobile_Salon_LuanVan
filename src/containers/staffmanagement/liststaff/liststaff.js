import plus from '../../../assets/icon/plus/plus.png';
import {Container} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../../assets/icon/back/back.png';
import Loading from '../../loading/loading';
import PopUp from './component/error_pop_up/error_pop_up';
import List from './component/list/example';
import {MTPImage0} from './component/mtp_image';
import styles from './style';
import useListStaff from './use_list_staff';
import search from '../../../assets/icon/searchcolor/search.png';
import {PrimaryButton} from '../../primary_button/primary_button';

export default React.memo(() => {
  const {
    state,
    getAllEmployeeEvent,
    onNavigateEvent,
    onSetDataEvent,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onResetStateEvent,
    onResetCreateStaffEvent,
  } = useListStaff();

  useEffect(() => {
    getAllEmployeeEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    () => <Text style={[styles.text1]}>Danh sách nhân viên</Text>,
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
  const _renderList = useCallback(() => {
    return (
      <View style={styles.view5}>
        <List
          onSelectEmployee={(dt) => {
            onSetDataEvent(dt.item, dt.item.id);
            onNavigateEvent('StaffInfo');
          }}
          data={state?.data ?? []}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data]);

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
          <PrimaryButton
            title=" TẠO MỚI NHÂN VIÊN"
            onPress={() => {
              onResetCreateStaffEvent();
              onNavigateEvent('CreateStaff');
            }}
          />
        )}
      </View>
      {state?.errMsg && (
        <PopUp
          msg={state.errMsg ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      {state.isLoading && <Loading />}
    </Container>
  );
});
