import emptyStyle from '../../assets/icon/empty_style/empty_style.png';
import plus from '../../assets/icon/plus/plus.png';
import {Container} from 'native-base';
import React, {useEffect, useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import Loading from '../loading/loading';
import useStyleInfo from '../style_info/use_style_info';
import List from './component/list/list';
import styles from './style';
import useStyleListAccount from './use_style_list';
import {MANAGER_ROLE} from '../../constants/app';
import {MTPImage0} from '../mtp_image/index';
import reactotron from 'reactotron-react-native';
const StyleListAccount = ({route, navigation}) => {
  const {item} = route?.params;
  const {id, name} = item;

  const {state, role, getStylesByServiceEvent, goBack} = useStyleListAccount();
  const {isLoading} = state;
  const {sendStyleInfoDataEvent} = useStyleInfo();
  useEffect(() => {
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
    reactotron.log('listData: ', listData)
    return (
      <List
        data={listData ?? []}
        onPress={(it) => {
          navigation.navigate('StyleInfo');
          sendStyleInfoDataEvent(it, id);
        }}
      />
    );
  };

  // mysub
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}>
        <View style={styles.view2}>
          <MTPImage0 source={back} style={styles.mTPImage0} />
          <Text style={styles.text1}>Dịch vụ</Text>
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

      {!state.isEmpty && role === MANAGER_ROLE && (
        <Button
          icon={<Image source={plus} />}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#4db1e9', '#005eff'],
            start: {x: 0, y: 1},
            end: {x: 0, y: 0},
          }}
          title={'  TẠO MỚI KIỂU DÁNG'}
          onPress={() => {
            navigation.navigate('CreateStyle', {id: id});
          }}
          titleStyle={[styles.button0]}
          containerStyle={[styles.button1]}
        />
      )}
      {isLoading && <Loading />}
    </Container>
  );
};
export default StyleListAccount;
