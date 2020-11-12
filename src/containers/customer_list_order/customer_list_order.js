import React, {useCallback, useEffect} from 'react';
import {
  Image as MyImage,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Header, SearchBar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import plus from '../../assets/icon/plus/plus.png';
import searchGray from '../../assets/icon/searchGray/search_gray.png';
import Loading from '../loading/loading';
import {MyImage0} from '../my_image/my_image';
import {isStringEmpty} from '../../utility/string';
import useCustomerList from './hook';
import styles from './style';
import {Container} from 'native-base';

export default function CustomerListOrder() {
  const {
    state,
    goBack,
    getAllCustomersEvent,
    setSelectedItemEvent,
    navigate,
  } = useCustomerList();
  useEffect(() => {
    getAllCustomersEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);

  const _renderSectionHeader = useCallback((data) => {
    return (
      <View style={[styles.view8]}>
        <Text style={[styles.text4]}>{data?.section?.key ?? ''}</Text>
      </View>
    );
  }, []);

  const _renderItem = (data) => {
    const {item, section, index} = data;
    const sectionLength = section.data.length;
    const idCustomer = item.id;
    const customerName = item.fullname;
    const customerMobile = item.mobile;
    const selectedItem = {idCustomer, customerName, customerMobile};
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItemEvent(selectedItem);
        }}>
        <View style={[styles.view1]}>
          <View>
            {!isStringEmpty(item.avatar) && (
              <MyImage0 source={item.avatar} style={[styles.image0]} />
            )}
          </View>
          <View style={[styles.view2]}>
            <Text style={[styles.text0]}>{item?.fullname}</Text>
            <Text style={[styles.text1]}>{item?.mobile}</Text>
            {index !== sectionLength - 1 && <View style={[styles.view3]} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // main
  return (
    <Container style={[styles.safeAreaView0]}>
      <View style={[styles.view0]}>
        {!state.isLoading && (
          <Header
            leftComponent={
              <TouchableOpacity onPress={goBack}>
                <Text style={[styles.text3]}>{'   '}HỦY</Text>
              </TouchableOpacity>
            }
            centerComponent={
              <Text style={[styles.text2]}>Danh sách khách hàng</Text>
            }
            containerStyle={[styles.header0]}
          />
        )}

        {!state.isLoading && (
          <SearchBar
            placeholder="Tìm kiếm"
            onChangeText={(text) => {}}
            value={state.searchText}
            containerStyle={[styles.searchBar0]}
            inputContainerStyle={[styles.searchBar1]}
            inputStyle={[styles.searchBar2]}
            searchIcon={<MyImage source={searchGray} />}
            clearIcon={false}
          />
        )}

        <SectionList
          stickySectionHeadersEnabled={false}
          contentContainerStyle={[styles.flatList0]}
          sections={state?.customerList}
          renderSectionHeader={_renderSectionHeader}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={[styles.view6]} />}
        />
      </View>
      <View style={styles.view7}>
        {!state.isLoading && (
          <Button
            title=" TẠO MỚI KHÁCH HÀNG"
            containerStyle={styles.button0}
            titleStyle={styles.button1}
            icon={<MyImage source={plus} />}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
            onPress={() => {
              navigate('AddCustomerOrder');
            }}
          />
        )}
      </View>
      {state.isLoading && <Loading />}
    </Container>
  );
}
