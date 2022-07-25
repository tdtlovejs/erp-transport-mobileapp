import axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API, KEY_STORAGE_USER} from '../utils/constants';

const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
  },
});

axiosClient.interceptors.request.use(async (config) => {
    const result = await AsyncStorage.getItem(KEY_STORAGE_USER);
    let token = '';
    if (result) {
        try {
            token = JSON.parse(result)?.token;
        } catch (e) {

        }
    }
    config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
      const response = error.response;
      const message = (Array.isArray(response?.data?.message) && response?.data?.message.length > 0)
          ? response?.data?.message[0]
          :
          response?.data?.message
              ?
              response?.data?.message
              :
              response?.data
                  ?
                  response?.data
                  :
                  "Error"
      ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
      );
      return response;
  },
);

export default axiosClient;
