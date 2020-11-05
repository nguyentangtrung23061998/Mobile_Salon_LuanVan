import {useSelector} from 'react-redux';
import {} from './state';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.timePicker);

  return {
    state,
  };
};

export default useTodo;
