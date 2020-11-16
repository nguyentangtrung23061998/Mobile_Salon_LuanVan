import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth, setRole, setIsCashier} from '../../reducers/app';
import {setData as setDataHome} from '../home/state';
import {setData as setDataStoreDetails} from '../storeInfo/with_store_info';
import {getProfile, getStoreInfo, getToken} from '../../utility/local_storage';
import {setData as setDataEditProfile} from '../edit_profile/state';
import {setData as setDataProfile} from '../profile/with_profile';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.signupSuccess);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onNavigateEvent = (name) => navigation.navigate(name);
  const _setProfile = async () => {
    try {
      const profile = await getProfile();
      dispatch(setDataEditProfile({value: profile}));
      dispatch(setRole({value: profile.role}));
      dispatch(setIsCashier({value: profile?.isCashier}));
      dispatch(setDataProfile({value: profile}));
    } catch (error) {}
  };
  const onPressButtonEvent = async () => {
    dispatch(setAuth(true));
    try {
      const storeInfo = await getStoreInfo();
      dispatch(setDataHome({value: storeInfo}));
      dispatch(setDataStoreDetails({value: storeInfo}));
      _setProfile();
    } catch (error) {}
  };

  return {state, dispatch, navigation, onNavigateEvent, onPressButtonEvent};
};

export default useTodo;
