import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  rowFront: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 20,
  },
  image0: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#cecece',
  },
  view00: {
    height: 0.8,
    backgroundColor: '#e3e3e3',
    position: 'absolute',
    left: 100,
    right: 0,
    bottom: -15,
  },
  view0: {
    paddingLeft: 30,
    justifyContent: 'center',
  },
  view1: {
    flexDirection: 'row',
  },
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 10,
  },
  text1: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    lineHeight: 15,
  },
  view2: {
    flexDirection: 'row',
  },
  view3: {
    height: 33,
    backgroundColor: '#e4e5e6',
    justifyContent: 'center',
    paddingLeft: 25,
  },
  text2: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    lineHeight: 23,
  },
});

export default styles;
