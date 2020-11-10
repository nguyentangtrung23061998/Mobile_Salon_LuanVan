import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: undefined,
  isSuccess: undefined,
  errorText: undefined,
  data: undefined,

  isEnabled: false,
};

const ListCustomer = createSlice({
  name: 'ListCustomer',
  initialState: initialState,
  reducers: {
    setIsEnabled: (state, action) => {
      const {value} = action.payload;
      state.isEnabled = value;
    },
    getAllCustomerLoading: (state, action) => {
      state.isLoading = true;
    },
    getAllCustomerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    getAllCustomerFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorText = action.payload.errMsg;
      state.data = [];
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    sendUpdateListCustomer: (state, action) => {},

    resetState: (state, action) => {},
  },
});

const {reducer, actions} = ListCustomer;
export const {
  getAllCustomerLoading,
  getAllCustomerSuccess,
  getAllCustomerFaild,
  onCloseErrorPopUp,
  updateListCustomer,
  setIsEnabled,
  resetState,
  sendUpdateListCustomer,
} = actions;
const withListCustomer = (state, action) => {
  if (action.type === 'ListCustomer/resetState') {
    state = undefined;
  }

  return reducer(state, action);
};

export default withListCustomer;
