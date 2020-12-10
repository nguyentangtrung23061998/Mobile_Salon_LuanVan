import React from 'react';
import {getReportTotal} from '../../api';
import {
  AnalyticContext,
  getReportTotalLoading,
  getReportTotalSuccess,
  getReportTotalFaild,
  setCanShowTimerPicker0,
} from './local_state';
export default () => {
  const context = React.useContext(AnalyticContext);
  if (context === undefined) {
    throw new Error('No provider ListTodoContext');
  }

  const {localDispatch, localState} = context;

  const onGetReportTotalEvent = async () => {
    localDispatch(getReportTotalLoading());
    try {
      const response = await getReportTotal('current');
      if (response.status === 'success') {
        const {data} = response;
        localDispatch(getReportTotalSuccess({value: data}));
      } else {
      }
    } catch (error) {
      localDispatch(getReportTotalFaild());
    }
  };

  const onSetCanShowTimerPicker0Event = (value) =>
    localDispatch(setCanShowTimerPicker0({value}));

  return {localState, onGetReportTotalEvent, onSetCanShowTimerPicker0Event};
};
