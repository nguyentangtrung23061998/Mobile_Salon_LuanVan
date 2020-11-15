import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
    lineHeight: 23,
    color: '#000',
  },
  text1: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
    lineHeight: 23,
  },
  text2: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    marginTop: 10,
    marginLeft: 25,
  },
  header0: {
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    marginTop: -100,
  },

  view0: {
    // paddingHorizontal: 25,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  input0: {
    width: 80,
    borderBottomWidth: 0,
    marginRight: 25,
  },
  input1: {
    borderColor: '#97b3e0',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#f0f9ff',
    color: '#1790e9',
    fontFamily: 'Quicksand-Medium',
    fontSize: 19,
    lineHeight: 24,
    height: 40,
  },

  calendarList0: {
    height: '100%',
    width: '100%',
  },
  modal0: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginHorizontal: 0,
    marginBottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default styles;
