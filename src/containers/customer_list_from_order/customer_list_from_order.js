import React, {useCallback, useEffect} from 'react';
import useTodo from './hook';
import styles from './style';
import {Container} from 'native-base';
import {Header} from 'react-native-elements';
import {MTPImage0} from '../mtp_image/index';
import reactotron from 'reactotron-react-native';
import {TouchableOpacity, Text, SectionList, View} from 'react-native';
import back from '../../assets/icon/back/back.png';
import Loading from '../loading/loading';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import plus from '../../assets/icon/plus/plus.png';
export default React.memo(() => {
  const {
    state,
    onGoBackEvent,
    onGetAllCustomersEvent,
    onResetStateEvent,
    onPressItemEvent,
    onNavigateEvent,
  } = useTodo();

  // useEffect
  useEffect(() => {
    onGetAllCustomersEvent();
  }, []);
  // subs
  const _ItemSeparatorComponent = useCallback(
    () => <View style={styles.view0} />,
    [],
  );

  const _renderItem = useCallback((data) => {
    const {item} = data;
    const {avatar, fullname, mobile, id} = item;
    return (
      <TouchableOpacity
        onPress={() => onPressItemEvent({id, fullname, mobile})}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <MTPImage0 source={avatar} style={styles.mtpImage00} />
          </View>
          <View style={styles.view3}>
            <Text style={styles.text1}>{fullname ? fullname : ''}</Text>
            <Text style={styles.text2}>{mobile ? mobile : ''}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

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

  const _centerComponent = useCallback(
    () => <Text style={styles.text0}>Danh sách khách hàng</Text>,
    [],
  );

  const _renderSectionHeader = useCallback((data) => {
    const {section} = data;
    const {key} = section;
    return (
      <View style={styles.view4}>
        <Text style={styles.text3}>{key ? key : ''}</Text>
      </View>
    );
  }, []);

  // main
  return (
    <Container>
      {state.canShowUI && (
        <Container>
          <Header
            containerStyle={styles.header0}
            leftComponent={_leftComponent}
            centerComponent={_centerComponent}
          />
          <SectionList
            sections={state.data}
            renderItem={_renderItem}
            ItemSeparatorComponent={_ItemSeparatorComponent}
            renderSectionHeader={_renderSectionHeader}
            stickySectionHeadersEnabled={false}
          />
        </Container>
      )}

      {state.isLoading && <Loading />}
      <Button
        title='TẠO MỚI KHÁCH HÀNG'
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#4db1e9', '#005eff'],
          start: {x: 1, y: 0},
          end: {x: 1, y: 1},
        }}
        containerStyle={styles.button0}
        buttonStyle={styles.button1}
        titleStyle={styles.button2}
        icon={<MTPImage0 source={plus} />}
        onPress={() => onNavigateEvent('AddCustomer1')}
      />
    </Container>
  );
});
