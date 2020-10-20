import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

const host = '192.168.0.107'

Reactotron.useReactNative()
.configure({host})
.setAsyncStorageHandler(AsyncStorage)
.connect();

// adb reverse tcp:9090 tcp:9090