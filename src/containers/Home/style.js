import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  image0: {
    marginBottom: 23,
  },

  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    lineHeight: 25,
    color: '#fff',
    maxWidth: '100%',
  },
  text1: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#09333e',
  },
  text2: {
    marginLeft: 25,
    marginTop: 25,
    fontFamily: 'Quicksand-Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#09333e',
  },

  view0: {
    position: 'absolute',
    top: 45,
    left: 25,
  },
  view1: {backgroundColor: 'transparent', flex: 1, marginTop: -70},
  view2: {
    height: 200,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
  },
  view3: {flexDirection: 'row', justifyContent: 'space-between'},
  view4: {height: 30},
  view5: {
    flexDirection: 'row',
    marginHorizontal: 25,
    paddingBottom: 50,
    marginTop: 15,
  },
  view6: {height: 1, backgroundColor: '#eaeaea', marginHorizontal: 25},
  view7: {flex: 1},
  view8: {
    marginTop: 20,
  },
  view9: {position: 'absolute', left: 0, top: 0, right: 0},
  view10: {
    marginHorizontal: 25,
    marginTop: -70,
  },
  view11: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  view12: {height: 20},
  keyboardAwareScrollView0: {paddingTop: 270, flexGrow: 1, paddingBottom: 100},
  view13: {
    width: '2%',
  },

  header0: {
    height: 0,
    marginTop: -getStatusBarHeight(),
  },

  salonIcon0: {
    marginBottom: 25,
  },

  mTPImage0: {
    width: '100%',
  },
});

export default styles;
