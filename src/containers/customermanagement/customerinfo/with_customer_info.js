import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: undefined,
  isSuccess: undefined,
  errorText: undefined,
  data: undefined,
  isDeleteSuccess: undefined,
  dataOrder: undefined,
};

const CustomerInfo = createSlice({
  name: 'CustomerInfo',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataCustomerInfo: (state, action) => {
      state.data = action.payload;
    },
    deleteCustomerLoading: (state, action) => {
      state.isLoading = true;
    },
    deleteCustomerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleteSuccess = true;
    },
    deleteCustomerFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorText = action.payload.errMsg;
    },
    updateCanShowSuccess: (state, action) => {
      state.canShowSuccess = false;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isDeleteSuccess = null;
    },
    getAllOrderHistoryLoading: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    getAllOrderHistorySuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataOrder = action.payload.dataOrder;
    },
    getAllOrderHistoryFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload.errMsg;
    },
  },
});

const {reducer, actions} = CustomerInfo;
export const {
  setData,
  deleteCustomerLoading,
  deleteCustomerSuccess,
  deleteCustomerFaild,
  onCloseErrorPopUp,
  onCloseSuccessPopUp,
  getAllOrderHistoryLoading,
  getAllOrderHistorySuccess,
  getAllOrderHistoryFaild,
  setDataCustomerInfo,
} = actions;
const withStaffInfo = (state, action) => {
  return reducer(state, action);
};

export default withStaffInfo;
