/**
 * @format
 */
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'Non-serializable values were found in the navigation state',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
    'new NativeEventEmitter'
]);
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => App);
