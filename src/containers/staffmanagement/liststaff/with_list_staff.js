import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  isSuccess: undefined,
  errMsg: undefined,
  data: undefined,
  isEnabled: false,
};

const ListStaff = createSlice({
  name: 'ListStaff',
  initialState: initialState,
  reducers: {
    setIsEnabled: (state, action) => {
      const {value} = action.payload;
      state.isEnabled = value;
    },
    getAllEmployeeLoading: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getAllEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.data;
    },

    getAllEmployeeFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload.errMsg;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errMsg = null;
    },
    sendUpdateListStaff: (state, action) => {},
    resetState: (state, action) => {},
  },
});

const {reducer, actions} = ListStaff;
export const {
  getAllEmployeeLoading,
  getAllEmployeeSuccess,
  getAllEmployeeFaild,
  onCloseErrorPopUp,
  sendUpdateListStaff,
  setIsEnabled,
  resetState,
} = actions;

const withListStaff = (state, action) => {
  if (action.type === 'ListStaff/resetState') {
    state = undefined;
  }

  return reducer(state, action);
};

export default withListStaff;
