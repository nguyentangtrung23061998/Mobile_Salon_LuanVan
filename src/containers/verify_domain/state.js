import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDomainNameValid: true,
  isDomainNameFocused: false,

  isLoading: false,
  isSuccess: false,
  errMsg: null,
};

const slice = createSlice({
  name: 'verifyDomain',
  initialState: initialState,
  reducers: {
    setInputValid: (state, action) => {
      const isValid = action.payload;
      state.isDomainNameValid = isValid;
      state.isDomainNameFocused = isValid;
    },
    checkCheckdomainLoading: (state, action) => {
      state.isLoading = true;
    },
    checkCheckdomainSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    checkCheckdomainFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload;
    },
    setErrMsg: (state, action) => {
      state.errMsg = action.payload;
    },
  },
});

const {reducer, actions} = slice;
export const {
  setInputValid,
  checkCheckdomainLoading,
  checkCheckdomainSuccess,
  checkCheckdomainFaild,
  setErrMsg,
} = actions;

const verifyDomainReducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default verifyDomainReducerWrapper;
