import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/root';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), logger, sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware,
});

store.sagaTask = sagaMiddleware.run(rootSaga);

export default store;
