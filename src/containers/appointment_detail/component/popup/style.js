import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modal0: {
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:0,left:0,right:0, bottom:0,
    backgroundColor:'transparent',
  },

  view0: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    width: '80%',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 12,
    elevation: 3,
    shadowOpacity: 0.8,
  },

  text0: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    lineHeight: 19,
    color: '#000000',
    textAlign: 'center',
  },
  button0: {
    height: 40,
  },
  button1: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
    lineHeight: 22,
    color: '#ffffff',
    letterSpacing: -0.41,
  },
  button2: {
    height: 40,
  },
  button3: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: '#2d6287',
  },
});
