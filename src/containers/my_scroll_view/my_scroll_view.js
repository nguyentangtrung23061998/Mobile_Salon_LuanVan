import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const MyScrollView0 = React.memo(({children, contentContainerStyle}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={'handled'}>
      {children}
    </KeyboardAwareScrollView>
  );
});
