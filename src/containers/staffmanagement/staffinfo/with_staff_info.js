import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: undefined,
  isSuccess: undefined,
  errMsg: undefined,
  data: undefined,
  isDeleteSuccess: undefined,
};

const StaffInfo = createSlice({
  name: 'StaffInfo',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataStaffInfo: (state, action) => {
      state.data = action.payload;
    },
    deleteEmployeeLoading: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleteSuccess = true;
    },
    deleteEmployeeFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload.errMsg;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isDeleteSuccess = null;
    },
  },
});

const {reducer, actions} = StaffInfo;
export const {
  deleteEmployeeLoading,
  deleteEmployeeSuccess,
  deleteEmployeeFaild,
  updateCanShowSuccess,
  setData,
  onCloseErrorPopUp,
  onCloseSuccessPopUp,
  setDataStaffInfo,
} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
