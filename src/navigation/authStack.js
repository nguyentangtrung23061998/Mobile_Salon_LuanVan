import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Intro from '../containers/intro/intro';
import Login from '../containers/login/login';
import VerifyDomain from '../containers/verify_domain/verify_domain';
import SignUpAccount from '../containers/signup/signupaccount/sign_up_account';
import SignUpSuccess from '../containers/signUpSuccess/sign_up_success';
import VerifyOtp from '../containers/verify_otp/verify_otp';
import SignUpSuccessAccount from '../containers/signUpSuccess/sign_up_success';
// import Main from '../containers/main/main'

const Stack = createStackNavigator();

export default AuthStack = () => (<>
    <Stack.Navigator initialRouteName="Intro"
        headerMode="none"
        screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen component={VerifyDomain} name="VerifyDomain" />
        {/* <Stack.Screen component={Main} name="Main" /> */}
        <Stack.Screen component={SignUpAccount} name="SignUpAccount" />
        <Stack.Screen component={SignUpSuccess} name="SignUpSuccess" />
        <Stack.Screen component={SignUpSuccessAccount} name="SignUpSuccessAccount" />
        <Stack.Screen component={VerifyOtp} name="VerifyOtp" />
    </Stack.Navigator>
</>)


// export default function AuthStack() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigatator>
//                 <Stack.Screen name='Home' component={Home} />
//             </Stack.Navigatator>
//         </NavigationContainer>
//     );
// }
