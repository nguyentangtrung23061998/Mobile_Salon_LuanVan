import React, {useCallback} from 'react';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import reactotron from 'reactotron-react-native';

export const MTPFlatList0 = React.memo(
  ({
    data,
    renderItem,
    ItemSeparatorComponent,
    ListHeaderComponent,
    ListFooterComponent,
    contentContainerStyle,
    ListHeaderComponentStyle,
    ListFooterComponentStyle,
    onEndReached,
    onEndReachedThreshold,
  }) => {
    const _keyExtractor = useCallback((item, index) => {
      return item + index;
    }, []);
    return (
      <KeyboardAwareFlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        scrollIndicatorInsets={{right: 1}}
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponentStyle={ListHeaderComponentStyle}
        ListFooterComponentStyle={ListFooterComponentStyle}
      />
    );
  },
);
