import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCanShowTimePicker, setPickerTime} from './state';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.updatecalendarOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const setCanShowTimePickerEvent = (value) => {
    dispatch(setCanShowTimePicker({value}));
  };
  const setPickerTimeEvent = (value) => {
    dispatch(setPickerTime({value}));
  };
  return {
    state,
    dispatch,
    navigation,
    setCanShowTimePickerEvent,
    setPickerTimeEvent,
  };
};

export default useTodo;
