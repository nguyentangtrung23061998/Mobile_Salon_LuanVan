import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import reactotron from 'reactotron-react-native';
import { setAuth, setIsCashier } from '../../reducers/app';
import { getProfile, getStoreInfo, getToken } from '../../utility/local_storage';
import { setData as setDataEditProfile } from '../edit_profile/state';
import { setData as setDataHome } from '../home/state';
import { setData as setDataStoreDetails } from '../storeInfo/with_store_info';
export default function Auth() {
    const dispatch = useDispatch();
    const _setProfile = async () => {
        try {
            const profile = await getProfile();
            dispatch(setDataEditProfile({ value: profile }));
            dispatch(setRole({ value: profile.role }));
            dispatch(setIsCashier({ value: profile?.isCashier }));
            dispatch(setDataEditProfile({ value: profile }));
        } catch (error) { }
    }

    const _checkToken = async () => {
        const token = await getToken();
        const storeInfo = await getStoreInfo();
        if (token) {
            dispatch(setAuth(true));
            dispatch(setDataHome({ value: storeInfo }));
            dispatch(setDataStoreDetails({ value: storeInfo }));
            _setProfile();
        } else {
            dispatch(setAuth(false));
        }
    }

    useEffect(() => {
        _checkToken();
    }, []);

    return (
        <StatusBar barStyle="dark-content" />
    )
}