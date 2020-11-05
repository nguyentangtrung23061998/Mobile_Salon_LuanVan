import {useNavigation} from '@react-navigation/native';
import {getAllEmployees} from '../../../api/index';
import {
  getAllEmployeeLoading,
  getAllEmployeeSuccess,
  getAllEmployeeFaild,
  onCloseErrorPopUp,
  setIsEnabled,
  resetState,
} from './with_list_staff';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../staffinfo/with_staff_info';
import {resetCreateStaff} from '../createstaff/with_create_staff';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.listStaff);
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };
  const getAllEmployeeEvent = async () => {
    dispatch(getAllEmployeeLoading());
    try {
      const EmployeeResponse = await getAllEmployees();
      if (EmployeeResponse.status === 'success') {
        dispatch(getAllEmployeeSuccess({data: EmployeeResponse.data}));
        dispatch(setIsEnabled({value: true}));
      } else {
        dispatch(getAllEmployeeFaild({errMsg: EmployeeResponse.message}));
        dispatch(setIsEnabled({value: true}));
      }
    } catch (error) {
      dispatch(getAllEmployeeFaild({errMsg: error.errMsg}));
      dispatch(setIsEnabled({value: true}));
    }
  };
  const onSetDataEvent = (dt) => {
    dispatch(setData(dt));
  };

  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const onResetCreateStaffEvent = () => {
    dispatch(resetCreateStaff());
  };

  const onResetStateEvent = () => dispatch(resetState());

  return {
    state,
    goBack,
    getAllEmployeeEvent,
    onNavigateEvent,
    onSetDataEvent,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onResetStateEvent,
    onResetCreateStaffEvent,
  };
};

export default useTodo;
