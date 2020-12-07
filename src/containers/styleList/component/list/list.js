import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
import {MTPImage0} from '../../../mtp_image';
import {getStringFromIndexRange} from '../../../../utility/string';
import styles from './style';

const List = ({data, onPress}) => {
  // function

  const _handleName = (name) => {
    if (name.length >= 20) {
      return getStringFromIndexRange(name, 0, 19) + '...';
    }
    return name;
  };

  const _ViewComponent = (item) => (
    <View style={[styles.view1]}>
      <MTPImage0 style={[styles.itemContainer]} source={item.image[0]} />

      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>
          {_handleName(item?.name).toUpperCase()}
        </Text>
        <Text style={[styles.text1]}>
          {item?.price.toLocaleString()}
          {'   VND'}
        </Text>
      </View>
    </View>
  );

  const _renderItem = useCallback((item) => {
    return (
      <ListItem
        onPress={() => {
          onPress(item);
        }}
        ViewComponent={() => _ViewComponent(item)}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <FlatGrid
      contentContainerStyle={styles.flatGrid0}
      itemDimension={130}
      data={data}
      style={styles.gridView}
      spacing={10}
      renderItem={({item}) => {
        return _renderItem(item);
      }}
    />
  );
};

export default List;
