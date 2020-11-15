import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#9b9b9b',
    marginLeft: 25,
  },
  text1: {
    position: 'absolute',
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    lineHeight: 25,
    color: '#ffffff',
  },
  text2: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
  },
  text3: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0.98,
    color: '#000000',
    marginTop: 12,
  },
  text4: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 12,
    lineHeight: 15,
    color: '#a8a8a8',
    marginTop: 4,
  },
  text5: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
    lineHeight: 15,
    position: 'absolute',
    right: 0,
  },

  view0: {
    flexDirection: 'row',
    marginHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#cccccc',
    borderWidth: 0.8,
    shadowColor: '#27272715',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
  },
  view1: {justifyContent: 'center', alignItems: 'center'},
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
  },
  view3: {height: 20, backgroundColor: 'transparent'},
  view4: {flex: 1},

  image0: {
    height: '100%',
  },

  keyboardAwareFlatList0: {
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default styles;
