import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    aspectRatio: 1 / 1,
    borderRadius: 6,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.34,
    color: '#fff',
  },
  text1: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.29,
    color: '#fff',
  },
  view0: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },
  view1: {
    backgroundColor: '#fff',
  },

  flatGrid0:{
    paddingBottom:100
  }
});

export default styles;
