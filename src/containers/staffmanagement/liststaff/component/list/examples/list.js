import React, {useEffect, useState, useCallback} from 'react';
import {Text, TouchableHighlight, View, SectionList} from 'react-native';
import styles from './style';
import {MTPImage0} from '../../mtp_image/index';
import {getStringFromIndexRange} from '../../../../../../utility/string';

export default function List({data, onSelectEmployee}) {
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

  const _handleFullName = (fullName) => {
    if (fullName.length >= 30) {
      return getStringFromIndexRange(fullName, 0, 29) + '...';
    }
    return fullName;
  };
  const _handlePosition = (position) => {
    if (position.length >= 34) {
      return getStringFromIndexRange(position, 0, 33) + '...';
    }
    return position;
  };
  const renderItem = (data) => {
    const {item, index} = data;
    const {id, avatar, fullname, position, isCashier} = item;
    return (
      <TouchableHighlight
        style={styles.rowFront}
        underlayColor={'#AAA'}
        onPress={() => {
          onSelectEmployee(data);
        }}>
        <View style={[styles.view2]}>
          <View style={styles.image0}>
            {avatar !== '' && (
              <MTPImage0 source={avatar} style={styles.image0} />
            )}
          </View>
          <View style={styles.view00} />
          <View style={[styles.view0]}>
            <Text style={[styles.text0]}>{_handleFullName(fullname)}</Text>
            <View style={[styles.view1]}>
              <Text style={[styles.text1]}>
                {_handlePosition(position)}
                {isCashier ? ' - Thu ngân' : null}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SectionList
      scrollIndicatorInsets={{right: 1}}
      renderItem={(rowData, rowMap) => {
        return renderItem(rowData, rowMap);
      }}
      renderSectionHeader={_renderSectionHeader}
      sections={listData}
      keyExtractor={_keyExtractor}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{paddingBottom: 100}}
    />
  );
}
