import styles from './style';
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
export default function ErrorPopUp({msg, buttonText, onPress}) {
  return (
    <View style={[styles.view0]}>
      <View style={[styles.view1]}>
        <Text style={[styles.text0]}>{msg}</Text>
        <Button
          onPress={onPress}
          title={buttonText}
          containerStyle={[styles.button0]}
        />
      </View>
    </View>
  );
}
