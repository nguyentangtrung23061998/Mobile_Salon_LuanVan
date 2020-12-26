import React, {useCallback, useEffect} from 'react';
import useTodo from './hook';
import styles from './style';
import {Container} from 'native-base';
import {Header, SearchBar, Button} from 'react-native-elements';
import {MTPImage0} from '..//mtp_image/index';
import {
  KeyboardAwareSectionList,
  KeyboardAwareFlatList,
} from 'react-native-keyboard-aware-scroll-view';
import reactotron from 'reactotron-react-native';
import {
  TouchableOpacity,
  Text,
  Platform,
  SectionList,
  View,
} from 'react-native';
import back from '../../assets/icon/back/back.png';
import searchGray from '../../assets/icon/searchGray/search_gray.png';
import {MyScrollView0} from '../../my_scroll_view/my_scroll_view';
import Loading from '../loading/loading';
import {
  getSafeStringValue,
  getStringFromIndexRange,
} from '../../utility/string';
import {MTPFlatList0} from '../mtp_flat_list/mtp_flat_list';
import LinearGradient from 'react-native-linear-gradient';
import plus from '../../assets/icon/plus/plus.png';
import {PrimaryButton} from '../primary_button/primary_button';
export default React.memo(() => {
  // myhook
  const {
    state,
    onGoBackEvent,
    onSetSearchTextEvent,
    onGetAllCustomersEvent,
    onResetStateEvent,
    onPressItemEvent,
    onNavigateEvent,
  } = useTodo();

  const _handleFullName = (fullName) => {
    if (fullName.length >= 30) {
      return getStringFromIndexRange(fullName, 0, 29) + '...';
    }
    return fullName;
  };
  // useeffect
  useEffect(() => {
    onGetAllCustomersEvent();
  }, []);

  // subs

  const _renderItem = useCallback((data) => {
    const {
      item: {avatar, fullname, mobile, id},
    } = data;
    return (
      <TouchableOpacity onPress={() => onPressItemEvent(id, fullname, mobile)}>
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
  const _renderItem2 = useCallback((data) => {
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
            <Text style={styles.text2}>{getSafeStringValue(fullname, '')}</Text>
            <Text style={styles.text3}>{getSafeStringValue(mobile, '')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);
  const _renderSectionHeader = useCallback((data) => {
    return (
      <View style={styles.view0}>
        <Text style={styles.text1}>
          {getSafeStringValue(data.section.key, '')}
        </Text>
      </View>
    );
  }, []);

  const _centerComponent = useCallback(
    () => <Text style={styles.text0}>Danh sách khách hàng</Text>,
    [],
  );

  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          onGoBackEvent();
          onResetStateEvent();
        }}>
        <MTPImage0 source={back} />
      </TouchableOpacity>
    ),
    [],
  );

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

          <KeyboardAwareSectionList
            // ListHeaderComponent={
            //   <SearchBar
            //     placeholder={t('t18')}
            //     value={state.searchText}
            //     onChangeText={onSetSearchTextEvent}
            //     containerStyle={styles.searchBar0}
            //     inputContainerStyle={styles.searchBar1}
            //     inputStyle={styles.searchBar2}
            //     searchIcon={<MTPImage0 source={searchGray} />}
            //     clearIcon={false}
            //     keyboardType={
            //       Platform.OS === 'android' ? 'numeric' : 'number-pad'
            //     }
            //   />
            // }
            scrollIndicatorInsets={{right: 1}}
            stickySectionHeadersEnabled={false}
            sections={state.canShowSearchList ? [] : state.data}
            renderSectionHeader={_renderSectionHeader}
            renderItem={_renderItem}
            SectionSeparatorComponent={_SectionSeparatorComponent}
            ItemSeparatorComponent={_ItemSeparatorComponent}
            contentContainerStyle={{backgroundColor: '#fff'}}
          />
          {state.canShowSearchList && (
            <Container style={styles.container0}>
              <MTPFlatList0 data={state.searchData} renderItem={_renderItem2} />
            </Container>
          )}
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
