import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  view1: {
    flex: 1,
  },
  view2: {
    flex: 1,
  },
  view4: {
    position: 'absolute',
    left: 25,
    bottom: 25,
    right: 25,
  },
  view3: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#ffffff',
  },
  text1: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    lineHeight: 23,
    color: '#000',
  },
  mybutton0: {
    height: 48,
    borderRadius: 24,
  },
  view5: {
    // marginBottom: 70,
  },

  header0: {backgroundColor: '#fff'},
  mTPImage0: {
    left: 10,
  },
  mTPImage1: {
    right: 10,
  },
  touchableOpacity0: {
    width: 40,
    height: 30,
  },
});
