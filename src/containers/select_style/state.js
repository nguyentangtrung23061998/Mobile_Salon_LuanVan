import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';
import {getIndexByCondition} from '../../utility/array';

const initialState = {
  isLoading: false,
  isEnabled: false,

  data: [],

  canCall: true,
};
const slice = createSlice({
  name: 'selectStyle',
  initialState: initialState,
  reducers: {
    setisStyleChecked: (state, action) => {
      const {serviceId, styleId} = action.payload;
      state.isStyleChecked[serviceId + styleId] = !state.isStyleChecked[
        serviceId + styleId
      ];
    },
    setIsServiceExpanded: (state, action) => {
      const {serviceIndex, serviceId} = action.payload;
      state.data[serviceIndex]['isServiceExpanded' + serviceId] = !state.data[
        serviceIndex
      ]['isServiceExpanded' + serviceId];
    },
    getStylesByServiceLoading: (state, action) => {
      state.isLoading = true;
    },
    getStylesByServiceSuccess: (state, action) => {
      state.isLoading = false;
      const {serviceId, data} = action.payload;
      const selectedServiceIndex = getIndexByCondition(
        state.data,
        'id',
        serviceId,
      );
      state.data[selectedServiceIndex].styles = data;
      state.data[selectedServiceIndex]['isServiceExpanded' + serviceId] = true;
      state.data[selectedServiceIndex][
        'serviceAlreadyCalled' + serviceId
      ] = true;
    },
    getStylesByServiceFaild: (state, action) => {
      state.isLoading = false;
    },

    getAllServicesLoading: (state, action) => {
      state.isLoading = true;
    },
    getAllServicesSuccess: (state, action) => {
      state.isLoading = false;
      const {data} = action.payload;
      const formattedData = data.filter((el) => el.amount !== 0);
      state.data = formattedData;
      state.isEnabled = true;
      state.canCall = false;
    },
    getAllServicesFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.isEnabled = true;
    },
    resetState: (state, action) => {},
    selectStyle: (state, action) => {
      const {serviceIndex, styleIndex, imageName} = action.payload;
      state.data[serviceIndex].styles[styleIndex].isChecked = !state.data[
        serviceIndex
      ].styles[styleIndex].isChecked;
      state.data[serviceIndex].imageName = imageName;
    },
  },
});

const {reducer, actions} = slice;

export const {
  getAllServicesLoading,
  getAllServicesSuccess,
  getAllServicesFaild,

  getStylesByServiceLoading,
  getStylesByServiceSuccess,
  getStylesByServiceFaild,
  resetState,
  setIsServiceExpanded,
  setisStyleChecked,
  selectStyle,
} = actions;

const wrapper = (state, action) => {
  if (action.type === 'selectStyle/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};

export default wrapper;
