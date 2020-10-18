import {createSaga} from '../config/saga/saga.ts';
import {createSample} from '../reducers/sampleReducer';

export const sampleSaga = createSaga(
  createSample.type, // start type
  // function
  // success type
  // faild type
);
