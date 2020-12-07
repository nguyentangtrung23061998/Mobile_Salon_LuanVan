import emptyStyle from '../../assets/icon/empty_style/empty_style.png';
import plus from '../../assets/icon/plus/plus.png';
import { Container } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import Loading from '../loading/loading';
import { MTPImage0 } from '../mtp_image';
import { MANAGER_ROLE } from '../../constants/app';
import List from './component/list/list';
import styles from './style';
import useStyleListAccount from './use_style_list';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import { PrimaryButton } from '../primary_button/primary_button';
import reactotron from 'reactotron-react-native';

const StyleListAccount = ({ route, navigation }) => {
  const { item } = route?.params;
  const { id } = item;

  // myhook
  const {
    state,
    getStylesByServiceEvent,
    goBack,
    onGoToStyleInfoEvent,
    onSetErrorMessageEvent,
    _setProfile
  } = useStyleListAccount();

  const { isLoading } = state;

  useEffect(() => {
    _setProfile();
    getStylesByServiceEvent(id);
  }, []);

  // function
  const _renderEmpty = () => {
    return (
      <Container style={[styles.container0]}>
        <Image source={emptyStyle} />
        <Text style={[styles.text0]}>
          Bổ sung kiểu dáng cho dịch vụ này để khách hàng có thể chọn lựa bạn
          nhé.
        </Text>
      </Container>
    );
  };

  const _renderList = (listData) => {
    return (
      <List
        data={listData ?? []}
        onPress={(item0) => onGoToStyleInfoEvent(item0, id)}
      />
    );
  };

  // mysub
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          goBack();
        }}>
        <View style={styles.view2}>
          <MTPImage0 source={back} style={styles.mTPImage0} />
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={styles.text2}>{state.service}</Text>,
    [],
  );

  return (
    <Container>
      <Header
        containerStyle={[styles.header0]}
        leftComponent={_leftComponent}
        leftContainerStyle={styles.header1}
        centerComponent={_centerComponent}
      />

      <View style={[styles.view1]}>
        {state?.data?.length === 0 ? _renderEmpty() : _renderList(state?.data)}
      </View>

      { state.role === MANAGER_ROLE && (
        <PrimaryButton
          title={'TẠO MỚI KIỂU DÁNG'}
          onPress={() => {
            navigation.navigate('CreateStyle', { id: id });
          }}
          containerStyle={[styles.button1]}
        />
      )}
      {isLoading && <Loading />}
      {state.errMsg && (
        <ErrorPopUp
          msg={state.errMsg}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent(null)}
        />
      )}
    </Container>
  );
};
export default StyleListAccount;
