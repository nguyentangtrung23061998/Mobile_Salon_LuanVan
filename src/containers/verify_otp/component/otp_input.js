import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

class OTPInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    otpLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    containerStyle: PropTypes.object,
    cellStyle: PropTypes.object,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    focusHighlight: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => undefined,
    otpLength: 4,
    tintColor: '#FB6C6A',
    offTintColor: '#BBBCBE',
    containerStyle: {},
    cellStyle: {},
    focusHighlight: true,
  };

  textInput = null;

  state = {
    internalVal: this.props.value || this.props.defaultValue,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.hasOwnProperty('value') &&
      nextProps.value !== this.state.internalVal
    ) {
      this.setState({ internalVal: nextProps.value });
    }
  }

  componentDidMount() {
    this.focus();

    // setTimeout(() => {
    //   // Prevent 'Argument 0 (NSNumber) of UIManager.measure must not be null from react-navigation
    // }, 500);

    this.blinkAnimation();
  }

  blinkAnimation() {
    const { tintColor, focusHighlight } = this.props;
    if (focusHighlight) {
      let transparency = 0;
      let increase = true;
      const blinkInterval = setInterval(() => {
        if (increase) {
          transparency = transparency + 5;
          if (transparency >= 255) {
            increase = false;
          }
        } else {
          transparency = transparency - 5;
          if (transparency <= 25) {
            increase = true;
          }
        }
        // Converting to hex
        this.setState({
          blinkTintColor:
            tintColor +
            ('0' + Number(transparency).toString(16)).slice(-2).toUpperCase(),
        });
        // Define blinking time in milliseconds
        1;
      });
      this.setState({ blinkInterval });
    }
  }

  componentWillUnmount() {
    if (this.state.blinkInterval) {
      clearInterval(this.state.blinkInterval);
    }
  }

  handleChangeText = (val) => {
    const { onChange } = this.props;

    onChange(val);
    this.setState({ internalVal: val });
  };

  // public methods
  inputRef() {
    return this.textInput;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.setState({ internalVal: '' });
  }

  handleFocus(index) {
    const { internalVal } = this.state;
    if (internalVal && internalVal.length) {
      let aux = [...internalVal];
      for (var i = index; i < internalVal.length; i++) {
        // aux[i] = undefined;
        // this.handleChangeText(aux.join(''));
      }
    }

    this.textInput.focus();
  }

  render() {
    const {
      containerStyle,
      cellStyle,
      tintColor,
      offTintColor,
      otpLength,
      ...otherProps
    } = this.props;

    const { internalVal, blinkTintColor } = this.state;

    return (
      <View>
        <TextInput
          caretHidden={true}
          ref={(input) => (this.textInput = input)}
          onChangeText={this.handleChangeText}
          style={{ width: 0, height: 0 }}
          value={internalVal || 0}
          minLength={otpLength}
          maxLength={otpLength}
          returnKeyType="done"
          keyboardType="numeric"
          {...otherProps}
        />
        <View style={[styles.container, containerStyle]}>
          {Array(otpLength)
            .fill()
            .map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  cellStyle,
                  {
                    borderColor:
                      (internalVal && index === internalVal.length) ||
                        (!internalVal && index == 0)
                        ? blinkTintColor
                        : offTintColor,
                  },
                ]}
                onPress={() => {
                  this.handleFocus(index);
                }}>
                {internalVal && internalVal.length > index
                  ? internalVal[index]
                  : ' '}
              </Text>
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
  cell: {
    borderRadius: 4,
    paddingVertical: 11,
    width: '20%',
    aspectRatio: 1 / 1,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    borderWidth: 1.5,
  },
});

export default OTPInput;
