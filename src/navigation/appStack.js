import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Main from '../containers/main/main';
import StoreInfo from '../containers/storeInfo/store_info';
import ServiceList from '../containers/serviceList/service_list.js';
import StyleList from '../containers/styleList/style_list';
import CreateStyle from '../containers/createStyle/createStyle';
import StyleInfo from '../containers/style_info/style_info';
import UpdateStyle from '../containers/update_style/update_style';
import ListStaff from '../containers/staffmanagement/liststaff/liststaff';
import CreateStaff from '../containers/staffmanagement/createstaff/createstaff';
import StaffInfo from '../containers/staffmanagement/staffinfo/staffinfo';
import EditStaff from '../containers/staffmanagement/editstaff/editstaff';
import ListCustomer from '../containers/customermanagement/listcustomer/listcustomer';
import CreateCustomer from '../containers/customermanagement/createcustomer/createcustomer';
import CustomerInfo from '../containers/customermanagement/customerinfo/customerinfo';
import EditCustomer from '../containers/customermanagement/editcustomer/editcustomer';
import Order from '../containers/order_management/order/order';
import InfoOrder from '../containers/order_management/info_order/info_order';
import CreateOrder from '../containers/order_management/create_order/create_order';
import AddCustomer from '../containers/order_management/add_customer/add_customer';
import EditOrder from '../containers/order_management/edit_order/edit_order';
import SelectStyle from '../containers/select_style/select_style';
import CustomerListOrder from '../containers/customer_list_order/customer_list_order';
import SelectStyle0 from '../containers/select_style0/select_style0';
import CustomerListFromOrder from '../containers/customer_list_from_order/customer_list_from_order';
// import CustomerList from '../containers/customer_list/customer_list';
const Stack = createStackNavigator();

export default AppStack = () => {
  return (
    <Stack.Navigator headerMode="none">
     <Stack.Screen component={Main} name="Main" />
      <Stack.Screen name="StoreInfo" component={StoreInfo} />
      <Stack.Screen component={ServiceList} name="ServiceList" />
      <Stack.Screen component={StyleList} name="StyleList" />
      <Stack.Screen component={CreateStyle} name="CreateStyle" />
      <Stack.Screen component={StyleInfo} name="StyleInfo" />
      <Stack.Screen component={UpdateStyle} name="UpdateStyle" />
      <Stack.Screen component={ListStaff} name="ListStaff" />
      <Stack.Screen component={CreateStaff} name="CreateStaff" />
      <Stack.Screen component={StaffInfo} name="StaffInfo" />
      <Stack.Screen component={EditStaff} name="EditStaff" />
      <Stack.Screen component={ListCustomer} name="ListCustomer" />
      <Stack.Screen component={CreateCustomer} name="CreateCustomer" />
      <Stack.Screen component={CustomerInfo} name="CustomerInfo" />
      <Stack.Screen component={EditCustomer} name="EditCustomer" />
      <Stack.Screen component={Order} name="Order" />
      <Stack.Screen component={InfoOrder} name="InfoOrder" />
      <Stack.Screen component={CreateOrder} name="CreateOrder" />
      <Stack.Screen component={AddCustomer} name="AddCustomer" />
      <Stack.Screen component={EditOrder} name="EditOrder" />
      <Stack.Screen component={SelectStyle} name="SelectStyle" />
      <Stack.Screen component={CustomerListOrder} name="CustomerListOrder" />
      <Stack.Screen component={SelectStyle0} name="SelectStyle0" />
      <Stack.Screen
        component={CustomerListFromOrder}
        name="CustomerListFromOrder"
      />
      {/* <Stack.Screen component={CustomerList} name="CustomerList" /> */}
    </Stack.Navigator>
  );
};
