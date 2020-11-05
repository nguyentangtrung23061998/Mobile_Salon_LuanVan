import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  view0: {
    borderBottomColor: '#8b8b8b',
    borderBottomWidth: 1,
    paddingBottom: 7,
  },
  view1: {
    flexDirection: 'row',
  },
  view2: {flexDirection: 'row', justifyContent: 'space-between'},
  view3: {position: 'absolute', top: '50%', right: 0},
  text0: {
    fontSize: 14,
    lineHeight: 19,
    color: '#000000',
    fontFamily: 'Quicksand-Regular',
  },
  text1: {fontSize: 14, lineHeight: 19, color: '#ff0033'},
  text2: {marginTop: 12, fontSize: 14, lineHeight: 19, color: '#000000'},
  text3: {marginTop: 5, color: '#ff0033'},
  text4: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    position: 'absolute',
    bottom: 7,
    right: 7,
  },
  text5: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginBottom: 10,
  },

  textInput0: {
    fontSize: 14,
    lineHeight: 19,
    color: '#8d8d8d',
    marginTop: 5,
    width: '100%',
    height: '100%',
  },

  textarea0: {
    backgroundColor: 'rgba(222,222,222, 0.2)',
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    lineHeight: 18,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 6,
  },
});
