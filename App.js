import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <>
      <View style={[styles.view1]}>
        <View style={[styles.view2]}>
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: { x: 0, y: 1 },
              end: { x: 0, y: 0 },
            }}
            containerStyle={[styles.button3]}
            title='ĐĂNG NHẬP'
            titleStyle={[styles.button0]}
          />
        </View>
      </View>
    </>
  );
};

export default App;
