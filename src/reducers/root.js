import { combineReducers } from 'redux';
import homeReducerWrapper from '../containers/home/state';
import loginReducerWrapper from '../containers/login/with_login';
import verifyDomainReducerWrapper from '../containers/verify_domain/state';
import storeInfoReducer from '../containers/storeInfo/with_store_info';
import profileReducer from '../containers/profile/with_profile';
import serviceReducer from '../containers/serviceList/with_service_list';
import styleReducer from '../containers/styleList/with_style_list';
import styleInfoReducer from '../containers/style_info/with_style_info';
import updateStyleReducer from '../containers/update_style/state';
import listStaffReducer from '../containers/staffmanagement/liststaff/with_list_staff';
import createStaffReducer from '../containers/staffmanagement/createstaff/with_create_staff';
import staffInfoReducer from '../containers/staffmanagement/staffinfo/with_staff_info';
import editStaffReducer from '../containers/staffmanagement/editstaff/with_edit_staff';
import listCustomerReducer from '../containers/customermanagement/listcustomer/with_list_customer';
import editCustomerReducer from '../containers/customermanagement/editcustomer/with_edit_customer';
import infoCustomerReducer from '../containers/customermanagement/customerinfo/with_customer_info';
import createCustomerReducer from '../containers/customermanagement/createcustomer/with_create_customer';
// import customerListReducer from '../containers/customer_list/state';
import appReducer from './app';

const rootRecuder = combineReducers({
    app: appReducer,
    verifyDomain: verifyDomainReducerWrapper,
    login: loginReducerWrapper,
    home:homeReducerWrapper,
    storeInfo: storeInfoReducer,
    profile: profileReducer,
    service: serviceReducer,
    style: styleReducer,
    styleInfo: styleInfoReducer,
    updateStyle: updateStyleReducer,
    listStaff: listStaffReducer,
    createStaff: createStaffReducer,
    staffInfo: staffInfoReducer,
    editStaff: editStaffReducer,
    listCustomer: listCustomerReducer,
    editCustomer: editCustomerReducer,
    infoCustomer: infoCustomerReducer,
    createCustomer: createCustomerReducer,
    listCustomer: listCustomerReducer,
    editCustomer: editCustomerReducer,
    infoCustomer: infoCustomerReducer,
    // customerList:customerListReducer,
})

const rootReducerWrapper = (state, action) => {
    if (action.type === 'app/setAuth') {
        state = undefined;
    }
    return rootRecuder(state,action);
}
export default rootReducerWrapper;