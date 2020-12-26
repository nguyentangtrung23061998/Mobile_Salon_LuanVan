import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from '../../assets/icon/home/home.png';
import React from 'react';
import { Image } from 'react-native';
import Home from '../home/home';
import styles from './style';
import profile from '../../assets/icon/profile/profile.png';
import Profile from '../profile/profile';
import Analytic from '../analytic/analytic';
import analytic from '../../assets/icon/analytic/analytic.png';
const Tab = createBottomTabNavigator();

const tintColor = '#1792e6';
const Main = ({ route }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                tabStyle: styles.tabNavigator0,
                activeTintColor: tintColor,
                labelStyle: styles.tabNavigator1,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={({ navigation: { isFocused } }) => {
                    return {
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={home}
                                style={[
                                    { tintColor: isFocused() ? tintColor : color },
                                    styles.image0,
                                ]}
                            />
                        ),
                        tabBarLabel: isFocused() ? 'Trang Chủ' : 'Trang Chủ',
                    };
                }}
            />
            {/* <Tab.Screen
                name="Analytic"
                initialParams={route}
                component={Analytic}
                options={({ navigation: { isFocused } }) => {
                    return {
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={analytic}
                                style={[
                                    { tintColor: isFocused() ? tintColor : color },
                                    styles.image0,
                                ]}
                            />
                        ),
                        tabBarLabel: isFocused() ? 'Thống kê' : 'Thống kê',
                    };
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                initialParams={route}
                component={Profile}
                options={({ navigation: { isFocused } }) => {
                    return {
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={profile}
                                style={[
                                    { tintColor: isFocused() ? tintColor : color },
                                    styles.image0,
                                ]}
                            />
                        ),
                        tabBarLabel: isFocused() ? 'Người Dùng' : 'Người Dùng',
                    };
                }}
            />
        </Tab.Navigator>
    )
}
export default Main;