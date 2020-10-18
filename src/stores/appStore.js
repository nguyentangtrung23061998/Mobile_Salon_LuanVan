import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import sampleReducer from '../reducers/sampleReducer';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), logger, sagaMiddleware];

const rootReducer = {
  sample: sampleReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

store.sagaTask = sagaMiddleware.run(rootSaga);

export default store;
