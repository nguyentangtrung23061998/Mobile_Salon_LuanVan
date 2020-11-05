import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view0: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    width: '90%',
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
    lineHeight: 22,
    color: '#000',
  },
  button0: {
    marginTop: 30,
    width: '50%',
  },
});

export default styles;
