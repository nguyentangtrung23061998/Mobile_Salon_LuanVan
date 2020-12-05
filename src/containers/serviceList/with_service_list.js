import {createSlice} from '@reduxjs/toolkit';
import elecrazor from '../../assets/icon/elecrazor/elecrazor.png';
import hairBrush from '../../assets/icon/hairBrush/hair_brush.png';
import hairCurling from '../../assets/icon/hairCurling/hair_curling.png';
import hairCut from '../../assets/icon/hairCut/hair_cut.png';
import hairDye from '../../assets/icon/hairDye/hair_dye.png';
import hairStraighten from '../../assets/icon/hairStraighten/hair_straignten.png';
import lashPaint from '../../assets/icon/lashPaint/lashPaint.png';
import nailPolish from '../../assets/icon/nailPolish/nail_polish.png';
import skinCare from '../../assets/icon/skinCare/skin_care.png';
import specialTreatment from '../../assets/icon/specialTreatment/special_treatment.png';

const DATA = [
  {isActive: false, name: 'hairCut', image: hairCut},
  {isActive: false, name: 'hairCurling', image: hairCurling},
  {isActive: false, name: 'hairStraighten', image: hairStraighten},
  {isActive: false, name: 'skinCare', image: skinCare},
  {isActive: false, name: 'nailPolish', image: nailPolish},
  {isActive: false, name: 'lashPaint', image: lashPaint},
  {isActive: false, name: 'specialTreatment', image: specialTreatment},
  {isActive: false, name: 'hairDye', image: hairDye},
  {isActive: false, name: 'hairBrush', image: hairBrush},
  {isActive: false, name: 'elecrazor', image: elecrazor},
];
const initialState = {
  serviceUpdateData: DATA,

  isLoading: undefined,
  isSuccess: undefined,
  errorMessage: undefined,

  isLoadingUpdate: undefined,
  data: undefined,
  serviceUpdateImage: undefined,
  serviceUpdateTitle: undefined,

  canShowPopUpAdding: undefined,

  isEnabled: false,
  canAdd: true,
  isShowPopupSuccess: undefined,
  isDeleteSuccess: undefined,
  role:undefined
};

const ServiceListAccount = createSlice({
  name: 'ServiceListAccount',
  initialState: initialState,
  reducers: {
    setCanAdd: (state, action) => {
      const {value} = action.payload;
      state.canAdd = value;
    },
    setIsEnabled: (state, action) => {
      const {value} = action.payload;
      state.isEnabled = value;
    },
    getAllServicesLoading: (state, action) => {
      state.isLoading = true;
    },

    getAllServicesSuccess: (state, action) => {
      const {data} = action.payload;

      state.data = data.map((el, i) => ({...el, key: `${i}`}));
      state.isLoading = false;
      state.isSuccess = true;
    },

    getAllServicesFaild: (state, action) => {
      const {errorMessage} = action.payload;

      state.errorMessage = errorMessage;
      state.data = [];
      state.isLoading = false;
      state.isSuccess = false;
    },

    createServiceLoading: (state, action) => {
      state.isLoading = true;
    },
    createServiceSuccess: (state, action) => {
      state.isLoading = false;
      const newService = action.payload.data;
      const newData = [...state.data];
      newData.push(newService);
      newData.map((el, i) => ({...el, key: `${i}`}));

      state.data = newData;
    },
    createServiceFaild: (state, action) => {
      const {errorMessage} = action.payload;
      state.errorMessage = errorMessage;
      state.isLoading = false;
    },

    deleteServiceLoading: (state, action) => {
      state.isLoading = true;
    },
    deleteServiceSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;

      const selectedId = action.payload.id;
      const newData = [...state.data];
      const prevIndex = state.data.findIndex((item) => item.id === selectedId);
      newData.splice(prevIndex, 1);
      state.data = newData;
      state.isDeleteSuccess = true;
    },
    deleteServiceFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload.errMsg;
    },

    updateServiceLoading: (state, action) => {
      state.isLoadingUpdate = true;
    },
    updateServiceSuccess: (state, action) => {
      const updatedService = action?.payload;

      const selectedId = updatedService.id;
      const newData = [...state.data];
      const selectedIndex = state.data.findIndex(
        (item) => item.id === selectedId,
      );
      newData[selectedIndex] = updatedService;
      state.data = newData;
      state.isLoadingUpdate = false;
      state.isSuccess = true;
      state.isShowPopupSuccess = true;
    },
    updateServiceFaild: (state, action) => {
      state.isLoadingUpdate = false;
      state.isSuccess = false;
    },
    getUpdateServiceData: (state, action) => {
      const {item} = action.payload;
      const {imageName, id, name} = item;
      const newServiceUpdateData = [...state.serviceUpdateData];
      const data = newServiceUpdateData.map((el) =>
        el.name === imageName
          ? {...el, isActive: true, id, title: name}
          : {...el, isActive: false},
      );
      data.map((el) => {
        if (el.isActive) {
          state.serviceUpdateImage = el.image;
          state.serviceUpdateTitle = el.title;
        }
      });
      state.serviceUpdateData = data;
    },
    updateServiceUpdateTitle: (state, action) => {
      state.serviceUpdateTitle = action.payload.title;
    },
    updateServiceState: (state, action) => {
      const serviceId = action?.payload?.serviceId;
      const newServiceData = [...state.data];
      const updatedData = newServiceData.map((el) =>
        el.id === serviceId ? {...el, amount: el.amount + 1} : el,
      );
      state.data = updatedData;
    },

    deleteServiceStyle: (state, action) => {
      const serviceId = action?.payload?.serviceId;
      const newServiceData = [...state.data];
      const updatedData = newServiceData.map((el) =>
        el.id === serviceId ? {...el, amount: el.amount - 1} : el,
      );
      state.data = updatedData;
    },
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },

    setCanShowPopUpAdding: (state, action) => {
      const {value} = action.payload;
      state.canShowPopUpAdding = value;
    },

    resetState: (state, action) => {},
    onCloseSuccessPopUp: (state, action) => {
      state.isShowPopupSuccess = null;
      state.isDeleteSuccess = null;
    },
    setRole: (state,action) =>{
      const {value} = action.payload;
      state.role = value;
    }
  },
});

const {reducer, actions} = ServiceListAccount;
export const {
  getAllServicesLoading,
  getAllServicesSuccess,
  getAllServicesFaild,
  createServiceLoading,
  createServiceSuccess,
  createServiceFaild,
  deleteServiceLoading,
  deleteServiceSuccess,
  deleteServiceFaild,
  updateServiceLoading,
  updateServiceSuccess,
  updateServiceFaild,
  getUpdateServiceData,
  updateServiceUpdateTitle,
  updateServiceState,
  deleteServiceStyle,
  setErrorMessage,
  setCanShowPopUpAdding,
  setIsEnabled,
  resetState,
  setCanAdd,
  onCloseSuccessPopUp,
  setRole
} = actions;

const reducerWrapper = (state, action) => {
  if (action.type === 'ServiceListAccount/resetState') {
    state = undefined;
  }

  return reducer(state, action);
};

export default reducerWrapper;
