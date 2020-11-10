import React, {useEffect, useState, useCallback} from 'react';
import {Text, TouchableHighlight, View, SectionList} from 'react-native';
import styles from './style';
import {MTPImage0} from '../../mtp_image/index';

export default function List({data, onSelectCustomer}) {
  const [listData, setListData] = useState([]);
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);
  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);
  const _renderSectionHeader = useCallback((data) => {
    return (
      <View style={styles.view3}>
        <Text style={styles.text2}>{data?.section?.key ?? ''}</Text>
      </View>
    );
  }, []);
  const renderItem = (data) => {
    const {item, index} = data;
    const {id, avatar, fullname, mobile} = item;
    return (
      <TouchableHighlight
        style={styles.rowFront}
        underlayColor={'#AAA'}
        onPress={() => {
          onSelectCustomer(data);
        }}>
        <View style={[styles.view2]}>
          <View style={styles.image0}>
            {avatar !== '' && (
              <MTPImage0 source={avatar} style={styles.image0} />
            )}
          </View>
          <View style={styles.view00} />
          <View style={[styles.view0]}>
            <Text style={[styles.text0]}>{fullname}</Text>
            <View style={[styles.view1]}>
              <Text style={[styles.text1]}>{mobile}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SectionList
      renderItem={(rowData, rowMap) => {
        return renderItem(rowData, rowMap);
      }}
      renderSectionHeader={_renderSectionHeader}
      sections={listData}
      keyExtractor={_keyExtractor}
    />
  );
}
