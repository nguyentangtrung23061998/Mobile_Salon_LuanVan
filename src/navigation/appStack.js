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
      {/* <Stack.Screen component={CustomerList} name="CustomerList" /> */}
    </Stack.Navigator>
  );
};
