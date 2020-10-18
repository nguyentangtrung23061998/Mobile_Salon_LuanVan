import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import useHome from '../../hook/useHome';
import withHome from '../../provider/withHome';

const Home = () => {
  const {
    state: { counter },
    addCounter,
    reduceCounter,
  } = useHome();

  return (
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>{counter}</Text>

    //   <TouchableOpacity onPress={() => addCounter()}>
    //     <Text>Increase</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => reduceCounter()}>
    //     <Text>Decrease</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={[styles.view1]}>
      <View style={[styles.view2]}>
        <ThemeProvider>
          <Button title="Hey!" />
        </ThemeProvider>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view0: { flex: 1, backgroundColor: '#fff' },
  view2: { marginHorizontal: 25 },
  myButton1: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#1792e6',
    borderWidth: 1.5,
    marginBottom: 25,
  },

  button0: {
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    borderRadius: 20,
  },
  button1: {
    backgroundColor: '#fff',
    borderColor: '#1790e9',
    borderWidth: 1,
    borderRadius: 20,
  },
  button2: {
    lineHeight: 20,
    color: '#1790e9',
  },
  button3: {
    borderRadius: 20,
  },
  button4: {
    borderRadius: 20,
  },
});
export default withHome(Home);
