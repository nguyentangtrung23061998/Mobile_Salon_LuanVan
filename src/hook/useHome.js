import React from 'react';
import {HomeContext} from '../provider/withHome';
import {increase, decrese} from '../provider/withHome';
const useTodo = () => {
  const context = React.useContext(HomeContext);
  if (context === undefined) {
    throw new Error('No provider ListTodoContext');
  }
  const {state, dispatch} = context;

  const reduceCounter = async (payload) => {
    dispatch(decrese);
  };

  const addCounter = () => {
    dispatch(increase);
  };

  return {state, reduceCounter, addCounter};
};

export default useTodo;
