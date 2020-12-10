import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isPasswordValid: true,
  isPasswordConfirmedValid: true,
  isPasswordFocused: false,
  isPasswordConfirmedFocused: false,
};

const createNewPassword = createSlice({
  name: 'createNewPassword',
  initialState: initialState,
  reducers: {
    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      switch (name) {
        case 'password':
          state.isPasswordValid = isValid;
          state.isPasswordFocused = isValid;
          break;

        case 'passwordConfirmed':
          state.isPasswordConfirmedValid = isValid;
          state.isPasswordConfirmedFocused = isValid;
          break;
      }
    },
  },
});

const { reducer, actions } = createNewPassword;
export const { updateInputValid } = actions;

const createNewPasswordReducerWrapper = (state, action) => {
  // if (action.type === 'app/setAuth') {
  //   state = undefined;
  // }
  return reducer(state, action);
};

export default createNewPasswordReducerWrapper;
