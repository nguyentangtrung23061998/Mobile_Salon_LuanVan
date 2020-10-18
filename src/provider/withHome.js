import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {counter: 0};

const home = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    increase: (state, action) => {
      state.counter = state.counter + 1;
    },
    decrese: (state, action) => {
      state.counter = state.counter - 1;
    },
  },
});

const {reducer, actions} = home;
export const {increase, decrese} = actions;

export const HomeContext = React.createContext(initialState);

const HomeProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(() => ({state, dispatch}), [state]);

  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};

const withHome = (WrappedComponent) => {
  return ({...props}) => {
    return (
      <HomeProvider>
        <WrappedComponent {...props} />
      </HomeProvider>
    );
  };
};

export default withHome;
