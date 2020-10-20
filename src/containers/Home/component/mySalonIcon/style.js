import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view0: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#00000029',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 45,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  view1: {width: '47%', aspectRatio: 1 / 1},
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    aspectRatio: 1 / 1,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 19,
    color: '#2f2f2f',
    marginTop: 20,
  },
  text1: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    lineHeight: 14,
    color: '#868686',
    marginTop: 10,
    maxWidth: '100%',
  },
  text3: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    lineHeight: 19,
    color: '#2f2f2f',
    marginVertical: 10,
  },
  text4: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    lineHeight: 14,
    color: '#868686',
  },
});

export default styles;
