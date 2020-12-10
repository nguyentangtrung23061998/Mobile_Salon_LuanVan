import {useDispatch, useSelector} from 'react-redux';
import {resetState, reducerName} from './global_state';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';

export default () => {
  const state = useSelector((rootReducer) => rootReducer[reducerName]);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onResetStateEvent = () => dispatch(resetState());

  return {
    state,
    t,
    onResetStateEvent,
  };
};
