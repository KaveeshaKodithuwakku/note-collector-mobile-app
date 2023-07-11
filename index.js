/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import axios from 'axios';

 axios.defaults.baseURL = 'http://13.232.125.3:8080/note_collector_app-0.0.1-SNAPSHOT/api/v1/';

AppRegistry.registerComponent(appName, () => App);
