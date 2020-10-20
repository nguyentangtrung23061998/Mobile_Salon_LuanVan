import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from './state';
import {useTranslation} from 'react-i18next';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.home);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const {t} = useTranslation();

  const {role, isCashier} = appState;
  const navigation = useNavigation();

  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };

  return {onNavigateEvent, state, role, isCashier, t};
};

export default useTodo;
