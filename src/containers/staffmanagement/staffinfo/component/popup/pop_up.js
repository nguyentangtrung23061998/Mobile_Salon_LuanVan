import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Button, Overlay } from 'react-native-elements';
import { Container } from 'native-base';

export default function PopUp({
  hasTopButton,
  hasBottomButton,
  title,
  topButtonTitle,
  bottomButtonTitle,
  onPressTopButton,
  onPressBottomButton,
  isVisible,
  styleTitleTopButton,
  styleTopButton,
  styleBottomButton,
  styleBottomTitle,
  textTitleStyle,
}) {
  return (
    <Overlay isVisible={isVisible} overlayStyle={[styles.modal0]}>
      <View>
        <Text style={[styles.text0, textTitleStyle]}>{title}</Text>
        <View style={{ height: 50 }} />
        <Button
            onPress={onPressTopButton}
            title={topButtonTitle}
            titleStyle={[styles.button1, styleTitleTopButton]}
            buttonStyle={[styles.button0, styleTopButton]}
          />
        <View style={{ height: 20 }} />
        <Button
          onPress={onPressBottomButton}
          title={bottomButtonTitle}
          buttonStyle={[styles.button2, styleBottomButton]}
          titleStyle={[styles.button3, styleBottomTitle]}
        />
      </View>
    </Overlay>
    // <Overlay isVisible={isVisible} overlayStyle={[styles.modal0]}>
    //   <View style={[styles.view0]}>
    //     <Text style={[styles.text0, textTitleStyle]}>{title}</Text>
    //     <View style={{height: 50}} />
    //     {hasTopButton && (
    //       <Button
    //         onPress={onPressTopButton}
    //         title={topButtonTitle}
    //         titleStyle={[styles.button1, styleTitleTopButton]}
    //         buttonStyle={[styles.button0, styleTopButton]}
    //       />
    //     )}
    //     {hasTopButton && <View style={{height: 19}}></View>}
    //     {hasBottomButton && (
    //       <Button
    //         onPress={onPressBottomButton}
    //         title={bottomButtonTitle}
    //         buttonStyle={[styles.button2, styleBottomButton]}
    //         titleStyle={[styles.button3, styleBottomTitle]}
    //       />
    //     )}
    //   </View>
    // </Overlay>
  );
}