import {useNavigation} from '@react-navigation/native';
import Lodash from 'lodash';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCustomers, getCustomersByPhone} from '../../api/index';
import {
  getAllCustomersFaild,
  getAllCustomersLoading,
  getAllCustomersSuccess,
  resetState,
  searchCustomersSuccess,
  setcanShowSearchList,
  setSearchText,
  sliceName,
} from './state';
import {setDataEditOrder1} from '../order_management/edit_order/state';

export default () => {
  const state = useSelector((rootReducer) => rootReducer[sliceName]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onResetStateEvent = () => dispatch(resetState());
  const onResetStateEvent0 = () => dispatch(resetState());


  const onSetSearchTextEvent = (value) => {
    dispatch(setSearchText({value}));
    if (value === '') {
      dispatch(setcanShowSearchList({value: false}));
    } else {
      dispatch(setcanShowSearchList({value: true}));
      onSearchEvent(value);
    }
  };

  const onGetAllCustomersEvent = async () => {
    dispatch(getAllCustomersLoading());
    try {
      const response = await getAllCustomers();
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getAllCustomersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getAllCustomersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getAllCustomersFaild({message}));
    }
  };
  const onGetAllCustomersEvent0 = async () => {
    dispatch(getAllCustomersLoading());
    try {
      const response = await getAllCustomers();
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getAllCustomersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getAllCustomersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getAllCustomersFaild({message}));
    }
  };

  const onPressItemEvent = (id, fullname, mobile) => {
    dispatch(setDataEditOrder1({id, fullname, mobile}));
    onResetStateEvent();
    onGoBackEvent();
  };

  const onSearchEvent = Lodash.debounce(async (mobile) => {
    try {
      const response = await getCustomersByPhone(mobile);
      if (response.status === 'success') {
        const {
          data: {profile},
        } = response;
        dispatch(searchCustomersSuccess({data: profile}));
      } else {
      }
    } catch (error) {}
  }, 500);

  return {
    state,
    onResetStateEvent,
    onResetStateEvent0,
    onGoBackEvent,
    onSetSearchTextEvent,
    onGetAllCustomersEvent,
    onGetAllCustomersEvent0,
    onPressItemEvent,
    onSearchEvent,
    onNavigateEvent,
  };
};
