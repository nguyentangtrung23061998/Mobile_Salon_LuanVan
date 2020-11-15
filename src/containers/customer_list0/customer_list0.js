import {Container} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {SectionList, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import plus from '../../assets/icon/plus/plus.png';
import Loading from '../loading/loading';
import {MTPImage0} from '../mtp_image/index';
import {PrimaryButton} from '../primary_button/primary_button';
import {
  getSafeStringValue,
  getStringFromIndexRange,
} from '../../utility/string';
import useTodo from './hook';
import styles from './style';
export default React.memo(() => {
  // myhook
  const {
    state,
    onGoBackEvent,
    onGetAllCustomersEvent,
    onResetStateEvent,
    onPressItemEvent,
    onNavigateEvent,
  } = useTodo();

  // useeffect
  useEffect(() => {
    onGetAllCustomersEvent();
  }, []);

  const _handleFullName = (fullName) => {
    if (fullName.length >= 30) {
      return getStringFromIndexRange(fullName, 0, 29) + '...';
    }
    return fullName;
  };
  // subs

  const _renderItem = useCallback((data) => {
    const {
      item: {avatar, fullname, mobile, id},
    } = data;
    return (
      <TouchableOpacity onPress={() => onPressItemEvent(id, fullname)}>
        <View style={styles.view2}>
          <View style={styles.view4}>
            <MTPImage0 source={avatar} style={styles.mtpImage00} />
          </View>
          <View style={styles.view5}>
            <Text style={styles.text2}>{_handleFullName(fullname)}</Text>
            <Text style={styles.text3}>{getSafeStringValue(mobile, '')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const _renderSectionHeader = useCallback(
    (data) => {
      return (
        <View style={styles.view0}>
          <Text style={styles.text1}>
            {getSafeStringValue(data.section.key, '')}
          </Text>
        </View>
      );
    },
    [state.data],
  );

  const _centerComponent = useCallback(
    () => <Text style={styles.text0}>Danh sách khách hàng</Text>,
    [],
  );

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

  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);

  const _SectionSeparatorComponent = useCallback(
    () => <View style={styles.view1} />,
    [],
  );
  const _ItemSeparatorComponent = useCallback(
    () => <View style={styles.view3} />,
    [],
  );

  // main
  return (
    <Container>
      {state.isEnabled && (
        <>
          <Header
            containerStyle={styles.header0}
            leftComponent={_leftComponent}
            centerComponent={_centerComponent}
          />
          <SectionList
            scrollIndicatorInsets={{right: 1}}
            renderItem={_renderItem}
            renderSectionHeader={_renderSectionHeader}
            sections={state.data}
            keyExtractor={_keyExtractor}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{
              paddingBottom: 100,
              backgroundColor: '#fff',
            }}
            SectionSeparatorComponent={_SectionSeparatorComponent}
            ItemSeparatorComponent={_ItemSeparatorComponent}
          />
          <PrimaryButton
            title='TẠO MỚI KHÁCH HÀNG'
            containerStyle={styles.button0}
            onPress={() => onNavigateEvent('AddCustomer0')}
          />
        </>
      )}

      {state.isLoading && <Loading />}
    </Container>
  );
});
