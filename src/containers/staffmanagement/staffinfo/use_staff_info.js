import {useNavigation} from '@react-navigation/native';
import {deleteEmployee} from '../../../api/index';
import {
  deleteEmployeeLoading,
  deleteEmployeeSuccess,
  deleteEmployeeFaild,
  onCloseErrorPopUp,
  onCloseSuccessPopUp,
} from './with_staff_info';
import {sendUpdateListStaff} from '../liststaff/with_list_staff';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../editstaff/with_edit_staff';
import useListStaff from '../liststaff/use_list_staff';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.staffInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {getAllEmployeeEvent} = useListStaff();
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const goBackEvent = () => {
    navigation.goBack();
  };
  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };
  const deleteEmployeeEvent = async (id) => {
    dispatch(deleteEmployeeLoading());
    try {
      const Response = await deleteEmployee(id);
      if (Response.status === 'success') {
        dispatch(deleteEmployeeSuccess({id}));
        dispatch(sendUpdateListStaff());
        updateListStaff();
      } else {
        dispatch(deleteEmployeeFaild({errMsg: Response.message}));
      }
    } catch (err) {
      dispatch(deleteEmployeeFaild({errMsg: err.errMsg}));
    }
  };
  const onSetDataEvent = (dt) => {
    dispatch(setData(dt));
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };
  const updateListStaff = () => {
    getAllEmployeeEvent();
  };

  return {
    state,
    navigation,
    goBackEvent,
    deleteEmployeeEvent,
    onSetDataEvent,
    onNavigateEvent,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
  };
};

export default useTodo;
