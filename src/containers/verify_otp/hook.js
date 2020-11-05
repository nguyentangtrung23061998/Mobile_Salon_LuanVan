import {useDispatch, useSelector} from 'react-redux';
import {setCounter} from './state';
import {useNavigation} from '@react-navigation/native';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.verifyOtp);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return {
    state,
    navigation,
    dispatch,
  };
};

export default useTodo;
