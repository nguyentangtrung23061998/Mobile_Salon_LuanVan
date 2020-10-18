import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isAuthLoading: true,
  isAuth: false,

  role: undefined,
  isCashier: undefined,
  // demo: true,
};
const app = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setRole: (state, action) => {
      const {value} = action.payload;
      state.role = value;
    },
    setIsCashier: (state, action) => {
      const {value} = action.payload;
      state.isCashier = value;
    },

    setAuth: (state, action) => {
      state.isAuth = action.payload;
      state.isAuthLoading = false;
    },

    createApp: (state, action) => {
      state.push(action.payload);
    },
    deleteApp: (state, action) => {
      const deletedAppId = action.payload;
      return state.filter((app) => app.id !== deletedAppId);
    },
    updateApp: (state, action) => {
      const newApp = action.payload;
      const sampleIndex = state.findIndex((app) => app.id === newApp.id);

      if (sampleIndex >= 0) {
        state[sampleIndex] = newApp;
      }
    },
  },
});

const {reducer, actions} = app;
export const {
  createApp,
  deleteApp,
  updateApp,
  setAuth,
  setRole,
  setIsCashier,
} = actions;
export default reducer;
