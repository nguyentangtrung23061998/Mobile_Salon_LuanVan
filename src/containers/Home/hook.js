import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {} from './state';
import {setData as setDataProfile} from './state';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.home);
  const appState = useSelector((rootReducer) => rootReducer.app);

  const {role, isCashier} = appState;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const _setProfile = async () => {
    try {
        const profile = await getProfile();
        dispatch(setDataProfile({value: profile}));
    } catch (error) { }
}

  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };

  return {onNavigateEvent,_setProfile, state, role, isCashier};
};

export default useTodo;
