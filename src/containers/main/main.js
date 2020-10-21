import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from '../../assets/icon/home/home.png';
import React from 'react';
import { Image } from 'react-native';
import Home from '../home/home';
import styles from './style';
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
        </Tab.Navigator>
    )
}
export default Main;