import { createSlice } from '@reduxjs/toolkit';
import React, { useReducer } from 'react';
const initialState = {
    isStyleNameValid: true,
    isStylePriceValid: true,

    isStyleNameFocused: false,
    isStylePriceFocus: false,

    firstImg: null,
    secondImg: null,
    thirdImg: null,
    fourthImg: null,
    serviceId: null,
    isLoading: undefined,
    isSuccess: undefined,
    successMessage: '',
    errorMessage: '',
}

const CreateStyleAccount = createSlice({
    name: 'CreateStyleAccount',
    initialState: initialState,
    reducers: {
        setSuccessMessage: (state, action) => {
            const { value } = action.payload;
            state.errorMessage = value;
        },
        setErrorMessage: (state, action) => {
            const { value } = action.payload;
            state.errorMessage = value;
        },
        updateInputValid: (state, action) => {
            const name = action.payload.name;
            const isValid = action.payload.isValid;

            if (name === 'name') {
                state.isStyleNameValid = isValid;
                state.isStyleNameFocused = isValid;
            } else {
                state.isStylePriceValid = isValid;
                state.isStylePriceFocus = isValid;
            }
        },
        getImagePath: (state, action) => {
            const name = action.payload.name;
            const path = action.payload.path;

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
                case 'third':
                    state.fourthImg = path;
                    break;
            }
        },
        getServiceId: (state, action) => {
            state.serviceId = action.payload.serviceId;
        },
        createStyleLoading: (state, action) => {
            action.isLoading = true;
        },
        createStyleSuccess: (state, action) => {
            const { message } = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = message;
        },
        createServiceFail: (state, action) => {
            const { message } = action.payload;
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = message;
        },
    }
})

const {reducer, actions} = CreateStyleAccount;
export const{
    updateInputValid,
    getImagePath,
    getServiceId,
    createStyleLoading,
    createStyleSuccess,
    createServiceFail,
    setSuccessMessage,
    setErrorMessage
} = actions;

export const CreateStyleAccountContext = React.createContext(initialState);

const CreateStyleAccountProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = React.useMemo(() => ({ state, dispatch }), [state]);

    return (
        <CreateStyleAccountContext.Provider value={value}>
            {props.children}
        </CreateStyleAccountContext.Provider>
    )
}

const withCreatStyleAccount = (WrappedComponent) => {
    return ({ ...props }) => {
        return(
            <CreateStyleAccountProvider>
                <WrappedComponent {...props}/>
            </CreateStyleAccountProvider>
        )
    }
}

export default withCreatStyleAccount;