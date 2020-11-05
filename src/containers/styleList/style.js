import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header0: {
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },

  view0: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  view1: {flex: 1},
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    justifyContent: 'space-between',
  },

  safeAreaView0: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerNav0: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  myButton0: {
    position: 'absolute',
    left: 25,
    bottom: 25,
    right: 25,
  },

  container0: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text0: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: '#2c7dce',
    maxWidth: '80%',
    textAlign: 'center',
    marginTop: 80,
  },
  text1: {
    fontFamily: 'Nunito-Regular',
    fontSize: 17,
    lineHeight: 23,
    color: '#1792e6',
  },
  text2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    lineHeight: 23,
    color: '#000',
  },

  button1: {
    position: 'absolute',
    left: 25,
    bottom: 30,
    right: 25,
    borderRadius: 20,
  },
  mTPImage0: {
    left: 10,
  },
  touchableOpacity0: {
    width: 40,
    height: 30,
  },
});

export default styles;
