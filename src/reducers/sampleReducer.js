import {createSlice} from '@reduxjs/toolkit';
const initialState = [];
const sample = createSlice({
  name: 'sample',
  initialState: initialState,
  reducers: {
    createSample: (state, action) => {
      state.push(action.payload);
    },
    deleteSample: (state, action) => {
      const deletedSampleId = action.payload;
      return state.filter((sample) => sample.id !== deletedSampleId);
    },
    updateSample: (state, action) => {
      const newSample = action.payload;
      const sampleIndex = state.findIndex(
        (sample) => sample.id === newSample.id,
      );

      if (sampleIndex >= 0) {
        state[sampleIndex] = newSample;
      }
    },
  },
});

const {reducer, actions} = sample;
export const {createSample, deleteSample, updateSample} = actions;
export default reducer;
