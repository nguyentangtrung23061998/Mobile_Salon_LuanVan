import {Container} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {SectionList, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import Loading from '../loading/loading';
import {MyImage0} from '../my_image/my_image';
import {PrimaryButton} from '../primary_button/primary_button';
import {getStringFromIndexRange, isStringEmpty} from '../../utility/string';
import useCustomerList from './hook';
import styles from './style';

export default function CustomerList() {
  const {
    state,
    goBack,
    getAllCustomersEvent,
    setSelectedItemEvent,
    navigate,
    changeSearchTextEvent,
    getCustomerByMobile,
  } = useCustomerList();
  useEffect(() => {
    getAllCustomersEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleFullName = (fullName) => {
    if (fullName.length >= 30) {
      return getStringFromIndexRange(fullName, 0, 29) + '...';
    }
    return fullName;
  };
  useEffect(() => {
    if (state?.isLoadingSearch) {
      getCustomerByMobile();
    }
  });

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
    const selectedItem = {idCustomer, customerName};

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
            <Text style={[styles.text0]}>{_handleFullName(item.fullname)}</Text>
            <Text style={[styles.text1]}>{item?.mobile}</Text>
            {index !== sectionLength - 1 && <View style={[styles.view3]} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={[styles.safeAreaView0]}>
      <View style={[styles.view0]}>
        {!state.isLoading && (
          <Header
            leftComponent={
              <TouchableOpacity onPress={goBack}>
                <Text style={[styles.text3]}>{'    '}HỦY</Text>
              </TouchableOpacity>
            }
            centerComponent={
              <Text style={[styles.text2]}>Danh sách khách hàng</Text>
            }
            containerStyle={[styles.header0]}
          />
        )}

        {!state.isLoading && (
          <SectionList
            stickySectionHeadersEnabled={false}
            contentContainerStyle={[styles.flatList0]}
            sections={state?.customerList}
            renderSectionHeader={_renderSectionHeader}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={[styles.view6]} />}
          />
        )}
      </View>
      {!state.isLoading && (
        <PrimaryButton
          title="TẠO MỚI KHÁCH HÀNG"
          containerStyle={styles.button0}
          onPress={() => {
            navigate('AddCustomer');
          }}
        />
      )}
      {state.isLoading && <Loading />}
    </Container>
  );
}
