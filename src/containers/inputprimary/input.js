import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style';

const Input = ({
  placeholder,
  textinputstyle,
  secureTextEntry,
  errorMsg,
  onBlur,
  onFocus,
  onEndEditing,
  onChangeText,
  value,
  borderColor,
  returnKeyType,
  onSubmitEditing,
  autoFocus,
  focus,
  inputRef,
  maxLength,
  autoCapitalize,
  autoCorrect,
  keyboardType,
}) => {
  return (
    <>
      <View style={[styles.view0, {borderColor}]}>
        <View style={[styles.view1]}>
          <TextInput
            ref={inputRef}
            autoFocus={autoFocus}
            focus={focus}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            placeholderTextColor={'#8d8d8d'}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onEndEditing={onEndEditing}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.textInput0, textinputstyle]}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
          />
        </View>
      </View>
      <Text style={[styles.text0]}>{errorMsg}</Text>
    </>
  );
};

export default Input;
