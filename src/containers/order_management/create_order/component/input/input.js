import styles from './style';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
export default function Input({
  label,
  value,
  containerStyle,
  onPress,
  textValueStyle,
}) {
  return (
    <View style={[containerStyle]}>
      <Text style={[styles.text0]}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.view0]}>
          <Text style={[styles.text1, textValueStyle]}>{value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
