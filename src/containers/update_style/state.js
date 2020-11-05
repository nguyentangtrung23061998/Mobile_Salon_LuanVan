import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    data: {},
    firstImg: null,
    secondImg: null,
    thirdImg: null,
    fourthImg: null,
    isStyleNameValid: true,
    isStylePriceValid: true,
    isStyleNameFocused: false,
    isStylePriceFocused: false,
    serviceId: '',

    isLoading: false,
    isSuccess: false,
    canShowSuccess: undefined,

    successMessage: '',
    errorMessage: '',
};

const updateStyleSlice = createSlice({
    name: "updateStyle",
    initialState: initialState,
    reducers: {
        updateStyle: (state, action) => { },
        sendUpdateStyleData: (state, action) => {
            state.serviceId = action.payload.serviceId;
            const { data } = action.payload;
            state.data = data;
            if (data?.image[0]) {
                state.firstImg = data?.image[0];
            }
            if (data?.image[1]) {
                state.secondImg = data?.image[1];
            }
            if (data?.image[2]) {
                state.thirdImg = data?.image[2];
            }
            if (data?.image[3]) {
                state.fourthImg = data?.image[3];
            }
        },
        getImagePath: (state, action) => {
            const { name, path } = action.payload;
            switch (name) {
                case 'first':
                    state.firstImg = path;
                    break;
                case 'second':
                    state.secondImg = path;
                    break;
                case 'third':
                    state.thirdImg = path;
                    break;
                case 'fourth':
                    state.fourthImg = path;
                    break;
            }
        },
        updateInputValid: (state, action) => {
            const name = action.payload.name;
            const isValid = action.payload.isValid;
            if (name === 'name') {
                state.isStyleNameValid = isValid;
                state.isStyleNameFocused = isValid;
            } else {
                state.isStylePriceValid = isValid;
                state.isStylePriceFocused = isValid;
            }
        },
        updateStyleLoading: (state, action) => {
            state.isLoading = true;
        },
        updateStyleSuccess: (state, action) => {
            const { message, data } = action.payload;
            state.successMessage = message;
            state.isLoading = false;
            state.isSuccess = true;
            state.canShowSuccess = true;
        },
        updateStyleFail: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            const { errorMessage } = action.payload;
            state.errorMessage = errorMessage;
        },
        updateCanShowSuccess: (state, action) => {
            state.canShowSuccess = false;
        },
        setSuccessMessage: (state, action) => {
            const { value } = action.payload;
            state.successMessage = value;
        },
        setErrorMessage: (state, action) => {
            const { value } = action.payload;
            state.errorMessage = value;
        },
    },
});

const{reducer,actions} =updateStyleSlice;
export const{
    updateStyle,
    sendUpdateStyleData,
    getImagePath,
    updateInputValid,
    updateStyleLoading,
    updateStyleSuccess,
    updateStyleFail,
    updateCanShowSuccess,
    setSuccessMessage,
    setErrorMessage
} = actions;
export default reducer;