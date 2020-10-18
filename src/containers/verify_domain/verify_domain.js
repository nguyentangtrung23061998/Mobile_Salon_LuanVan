import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import back from '../../assets/icon/back/back.png';
import rightBlueArrow from '../../assets/icon/rightBlueArrow/right_blue_arrow.png';
import salozoText from '../../assets/icon/salozoText/salozo_text.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Loading from '../loading/loading';
import { isStringEmpty, noSpaceAtAll } from '../../utility/string';
import useTodo from './hook';
import styles from './style';
import { Container } from 'native-base';
function VerifyDomain() {
    const {
      state,
      form,
      goBackEvent,
      setInputValidEvent,
      setErrMsgEvent,
    } = useTodo();
    const _leftComponent = useCallback(() => {
      return (
        <TouchableOpacity onPress={goBackEvent}>
          <Image source={back} style={styles.image1} />
        </TouchableOpacity>
      );
    }, []);
  
    const _icon = useCallback(() => {
      return (
        <Image
          source={rightBlueArrow}
          style={[
            isStringEmpty(form.values.domainAddress) ? styles.image0 : null,
          ]}
        />
      );
    }, [form.values.domainAddress]);
    return (
      <Container>
        <Header
          leftComponent={_leftComponent}
          containerStyle={[styles.header0]}
        />
        <View style={[styles.view1]}>
          <KeyboardAwareScrollView scrollEnabled={false}>
            <View style={[styles.view0]}>
              <Image source={salozoText} />
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                label={'Địa chỉ tên miền'}
                labelStyle={[styles.input0]}
                placeholder={'name.salozo.com'}
                inputStyle={[
                  styles.input1,
                  state.isDomainNameFocused ? styles.input5 : styles.input4,
                ]}
                inputContainerStyle={[styles.input2]}
                containerStyle={[styles.input3]}
                onBlur={form.handleBlur('domainAddress')}
                onChangeText={(value) =>
                  form.setFieldValue('domainAddress', noSpaceAtAll(value))
                }
                value={form.values.domainAddress}
                onFocus={() => setInputValidEvent(true)}
                onEndEditing={() => setInputValidEvent(false)}
                errorMessage={
                  state.isDomainNameValid || !form.errors.domainAddress
                    ? null
                    : form.errors.domainAddress
                }
              />
              <Text style={[styles.text0]}>
                Nếu bạn chưa có tên miền, vui lòng liên hệ quản lý của bạn
              </Text>
              <Button
                title={'TIẾP TỤC   '}
                icon={_icon}
                iconRight
                disabled={isStringEmpty(form.values.domainAddress)}
                disabledStyle={[styles.button3]}
                buttonStyle={[styles.button0]}
                titleStyle={[styles.button1]}
                containerStyle={[styles.button2]}
                onPress={form.handleSubmit}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
        {state.isLoading && <Loading />}
        {state.errMsg && (
          <ErrorPopUp
            msg={state.errMsg}
            buttonText={'Quay lại'}
            onPress={() => setErrMsgEvent(null)}
          />
        )}
      </Container>
    );
  }
  
  export default React.memo(VerifyDomain);
  