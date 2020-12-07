import { createSlice } from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  isLoading: undefined,
  isSuccess: undefined,
  data: undefined,
  errorMessage: null,
  isEmpty: true,

  service: '',
  role: ''
};

const StyleListAccount = createSlice({
  name: 'StyleListAccount',
  initialState: initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      const { value } = action.payload;
      state.errorMessage = value;
    },

    setServiceStyleList0: (state, action) => {
      const { value } = action.payload;
      state.service = value;
    },

    getStylesByServiceLoading: (state, action) => {
      state.isLoading = true;
    },
    getStylesByServiceSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.data;
      state.isEmpty = false;
    },
    getStylesByServiceFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      const { message } = action.payload;
      state.errorMessage = message;
      state.isEmpty = false;
    },
    updateStyleList: (state, action) => {
      state?.data?.push(action.payload.data);
    },
    editStyleList: (state, action) => {
      const { data } = action.payload;
      const { id, name, price, description, image } = data;
      const selectedId = id;
      const newData = [...state?.data];
      const prevIndex = state.data.findIndex((item) => item.id === selectedId);
      newData[prevIndex].name = name;
      newData[prevIndex].price = price;
      newData[prevIndex].description = description;
      newData[prevIndex].image = image;
      state.data = newData;
    },
    deleteStyle: (state, action) => {
      const selectedId = action.payload.styleId;
      const newData = [...state?.data];
      const prevIndex = state.data.findIndex((item) => item.id === selectedId);
      newData.splice(prevIndex, 1);
      state.data = newData;
    },
    setRole2: (state, action) => {
      const { value } = action.payload;
      state.role = value;
    }
  },
});

const { reducer, actions } = StyleListAccount;
export const {
  getStylesByServiceLoading,
  getStylesByServiceSuccess,
  getStylesByServiceFaild,
  updateStyleList,
  deleteStyle,
  editStyleList,
  setServiceStyleList0,
  setErrorMessage,
  setRole2
} = actions;

const reducerWrapper = (state, action) => {
  if (action.type === 'StyleListAccount/getStylesByServiceLoading') {
    state = undefined;
  }

  return reducer(state, action);
};

export default reducerWrapper;
