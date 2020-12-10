import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {
  isLoading: false,
  canShowTimerPicker0: false,
  data: {},
};
export const reducerName = 'analytic';

const slice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    setCanShowTimerPicker0: (state, action) => {
      const {value} = action.payload;
      state.canShowTimerPicker0 = value;
    },
    getReportTotalLoading: (state, action) => {
      state.isLoading = true;
    },
    getReportTotalSuccess: (state, action) => {
      state.isLoading = false;
      const {value} = action.payload;
      state.data = value;
    },
    getReportTotalFaild: (state, action) => {
      state.isLoading = false;
    },
  },
});

const {reducer, actions} = slice;

export const {
  resetState,
  getReportTotalLoading,
  getReportTotalSuccess,
  getReportTotalFaild,
  setCanShowTimerPicker0,
} = actions;

export const AnalyticContext = React.createContext(initialState);
const AnalyticProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(
    () => ({localState: state, localDispatch: dispatch}),
    [state],
  );

  return (
    <AnalyticContext.Provider value={value}>
      {props.children}
    </AnalyticContext.Provider>
  );
};

const withAnalytic = (WrappedComponent) => {
  return ({...props}) => {
    return (
      <AnalyticProvider>
        <WrappedComponent {...props} />
      </AnalyticProvider>
    );
  };
};

export default withAnalytic;
