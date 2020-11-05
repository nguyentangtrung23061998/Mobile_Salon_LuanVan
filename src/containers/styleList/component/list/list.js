import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { FlatGrid } from 'react-native-super-grid';
import reactotron from 'reactotron-react-native';
import { MTPImage0 } from '../../../mtp_image';
import styles from './style';
const List = ({ data, onPress }) => {
  // function

  const _ViewComponent = (item) => {
    let source = item.image[0];
    // reactotron.log('source uri: ', source)
    // source = source && typeof source.uri === 'string' && (source.uri.split('https://')[1] || source.uri.split('http://')[1]) ? source : null;

    return (
      <View style={[styles.view1]}>
        {item?.image[0] && (
          <FastImage
            style={[styles.itemContainer]}
            source={{
              uri: source,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        )}
        <MTPImage0 source={item.image[0]} />

        <View style={[styles.view0]}>
          <Text style={[styles.text0]}>{item.name}</Text>
          <Text style={[styles.text1]}>
            {item.price}
            {'   VND'}
          </Text>
        </View>
      </View>
    );
  };

  const _renderItem = useCallback((item) => {
    return (
      <ListItem
        onPress={() => {
          onPress(item);
        }}
        ViewComponent={() => {
          return _ViewComponent(item);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <FlatGrid
      itemDimension={130}
      data={data}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => {
        return _renderItem(item);
      }}
    />
  );
};

export default List;
