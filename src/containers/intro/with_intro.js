import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {};

const IntroAccount = createSlice({
  name: 'IntroAccount',
  initialState: initialState,
  reducers: {},
});

const {reducer, actions} = IntroAccount;
export const {} = actions;

export const IntroAccountContext = React.createContext(initialState);
const IntroAccountProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(() => ({state, dispatch}), [state]);

  return (
    <IntroAccountContext.Provider value={value}>
      {props.children}
    </IntroAccountContext.Provider>
  );
};

const withIntroAccount = (WrappedComponent) => {
  return ({...props}) => {
    return (
      <IntroAccountProvider>
        <WrappedComponent {...props} />
      </IntroAccountProvider>
    );
  };
};

export default withIntroAccount;
