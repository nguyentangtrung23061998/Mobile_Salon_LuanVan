import React from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
import styles from './style';
import {Textarea} from 'native-base';
import {TextInputMask} from 'react-native-masked-text';

const Input = ({
  title,
  required,
  placeholder,
  rightText,
  rightTextStyle,
  containerStyle,
  multiline = false,
  inputContainerStyle,
  onChangeText,
  errorText,
  value,
  onFocus,
  onEndEditing,
  onBlur,
  maxLength,
  keyboardType,
  secureTextEntry,
  borderBottomColor,
  titleStyle,
  requireStyle,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  autoCapitalize,
  editable,
  textContentType,
  dataDetectorTypes,
  pointerEvents,
}) => {
  return (
    <View>
      <View
        style={[
          styles.view0,
          containerStyle,
          {borderBottomColor: borderBottomColor ?? '#8b8b8b'},
        ]}>
        <View style={[styles.view1]}>
          {title && <Text style={[styles.text0, titleStyle]}>{title}</Text>}
          {required && <Text style={[styles.text1, requireStyle]}>*</Text>}
        </View>
        <View style={[styles.view2]}>
          <TextInput
            dataDetectorTypes={dataDetectorTypes}
            textContentType={textContentType}
            autoCorrect={false}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            ref={inputRef}
            numberOfLines={1}
            placeholderTextColor={'#8d8d8d'}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            keyboardType={keyboardType}
            value={value}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onChangeText={onChangeText}
            multiline={multiline}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            style={[styles.textInput0, inputContainerStyle]}
            editable={editable}
            pointerEvents={pointerEvents}
          />
        </View>
        <View style={styles.view3}>
          {rightText && (
            <Text style={([styles.text2], rightTextStyle)}>{rightText}</Text>
          )}
        </View>
      </View>
      <Animatable.Text
        animation={errorText ? 'fadeIn' : 'fadeOut'}
        style={[styles.text3]}
        duration={300}>
        {errorText}
      </Animatable.Text>
    </View>
  );
};

export const InputMask = ({
  title,
  required,
  placeholder,
  rightText,
  rightTextStyle,
  containerStyle,
  multiline,
  inputContainerStyle,
  onChangeText,
  errorText,
  value,
  onFocus,
  onEndEditing,
  onBlur,
  maxLength,
  keyboardType,
  secureTextEntry,
  borderBottomColor,
  titleStyle,
  requireStyle,
  type,
  options,
  placeholderTextColor,
  pointerEvents,
  editable,
}) => {
  return (
    <View>
      <View
        style={[
          styles.view0,
          containerStyle,
          {borderBottomColor: borderBottomColor ?? '#d0d0d0'},
        ]}>
        <View style={[styles.view1]}>
          {title && <Text style={[styles.text0, titleStyle]}>{title}</Text>}
          {required && <Text style={[styles.text1, requireStyle]}>*</Text>}
        </View>
        <View style={[styles.view2]}>
          <TextInputMask
            editable={editable}
            pointerEvents="none"
            placeholderTextColor={placeholderTextColor}
            type={type}
            options={options}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            keyboardType={keyboardType}
            value={value}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onChangeText={onChangeText}
            multiline={multiline}
            placeholder={placeholder}
            style={[styles.textInput0, inputContainerStyle]}
          />
        </View>
        <View style={styles.view3}>
          {rightText && (
            <Text style={([styles.text2], rightTextStyle)}>{rightText}</Text>
          )}
        </View>
      </View>
      <Animatable.Text
        animation={errorText ? 'fadeIn' : 'fadeOut'}
        style={[styles.text3]}
        duration={300}>
        {errorText}
      </Animatable.Text>
    </View>
  );
};

export const TextArea = ({
  characterCount,
  title,
  placeholder,
  textColor,
  onChangeText,
  value,
}) => {
  return (
    <View>
      <Text style={[styles.text5, textColor]}>{title}</Text>
      <Textarea
        rowSpan={7}
        placeholder={placeholder}
        maxLength={200}
        style={[styles.textarea0]}
        onChangeText={onChangeText}
        value={value}
      />
      <Text style={[styles.text4]}>{characterCount}</Text>
    </View>
  );
};

export default Input;
