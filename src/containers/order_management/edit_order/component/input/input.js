import styles from './style';
import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {sumArray} from '../../../../../utility/array';
export default function Input({label, value, containerStyle, onPress}) {
  return (
    <View style={[containerStyle]}>
      <Text style={[styles.text0]}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.view0]}>
          <Text style={[styles.text1]}>{value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const renderItem = ({item}) => {
  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.view3}>
          <Text style={styles.text3}>{item.name}</Text>
          <Text style={styles.text4}>
            {sumArray(item.styles.map((el) => el.price)).toLocaleString(
              'vi-VN',
            ) + ' Đ'}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const InputService = ({label, containerStyle, onPress, data}) => {
  return (
    <View style={[containerStyle]}>
      <Text style={[styles.text0]}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.view1]}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
