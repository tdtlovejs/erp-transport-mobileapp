import React, {useContext, useLayoutEffect} from 'react';
import {createContext, useEffect, useState} from 'react';
import {
    KEY_STORAGE_GPS_ROUTE,
    KEY_STORAGE_LANGUAGE,
    KEY_STORAGE_THEME,
    KEY_STORAGE_USER, LANGUAGE_EN,
    listLanguage,
    listTheme,
    THEME_LIGHT,
} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../languages/i18n';
import * as RNLocalize from 'react-native-localize';
import gpsRouteApi from "../api/gpsRouteApi";
import BackgroundGeolocation from "react-native-background-geolocation";
import gpsPointApi from "../api/gpsPointApi";
import moment from "moment";
import { getDistance, getPreciseDistance } from 'geolib';

export const AppContext = createContext({})

const AppContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(THEME_LIGHT);
    const [language, setLanguage] = useState((Array.isArray(RNLocalize.getLocales()) && RNLocalize.getLocales().length > 0 && listLanguage.includes(RNLocalize.getLocales()[0].languageCode)) ? RNLocalize.getLocales()[0].languageCode : LANGUAGE_EN)

    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingTheme, setLoadingTheme] = useState(false);
    const [loadingLanguage, setLoadingLanguage] = useState(false);
    const [pdfLink, setPdfLink] = useState(null);
    const [currentGpsRoute, setCurrentGpsRoute] = useState(null);
    const [location, setLocation] = React.useState('');
    const [enabled, setEnabled] = React.useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // const onLocation = BackgroundGeolocation.onLocation((location) => {
        //     setLocation(JSON.stringify(location));
        // })
        // const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
        //     // console.log('[onMotionChange]', event);
        // });
        // const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
        //     // console.log('[onMotionChange]', event);
        // })
        // const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
        //     // console.log('[onProviderChange]', event);
        // })
        // // if (currentGpsRoute) {
        // //     getLocation();
        // // }
        // BackgroundGeolocation.ready({
        //     // Geolocation Config
        //     desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        //     distanceFilter: 10,
        //     // // Activity Recognition
        //     // stopTimeout: 5,
        //     // // Application config
        //     // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        //     // logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        //     // stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        //     // startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
        //     // // HTTP / SQLite config
        //     // url: 'http://yourserver.com/locations',
        //     // batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        //     // autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
        //     // headers: {              // <-- Optional HTTP headers
        //     //     "X-FOO": "bar"
        //     // },
        //     // params: {               // <-- Optional HTTP params
        //     //     "auth_token": "maybe_your_server_authenticates_via_token_YES?"
        //     // }
        // }).then((state) => {
        //     // console.log(state)
        //     // setEnabled(state)
        //     // console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
        // });
        // return () => {
        //     onLocation.remove();
        //     onMotionChange.remove();
        //     onActivityChange.remove();
        //     onProviderChange.remove();
        //     // watchPosition.remove()
        // }
    }, [])

    const getLocation = () => {
        BackgroundGeolocation.watchPosition(async (location) => {
            const currentLongitude = location.coords.longitude;
            const currentLatitude = location.coords.latitude;
            setCurrentLocation({
                longitude: currentLongitude,
                latitude: currentLatitude
            })
        }, (errorCode) => {
        }, {
            interval: 5000
        })
    }
    useEffect(() => {
        // if (enabled) {
        //     BackgroundGeolocation.start();
        // } else {
        //     BackgroundGeolocation.stop();
        //     setLocation('');
        // }
    }, [enabled]);

    useEffect(() => {
        getUserFromStorage();
        getThemeFromStorage();
        getLanguageFromStorage();
    }, [])

    useEffect(() => {
        if (user) {
            getCurrentGpsRoute();
        }
    }, [user])
    const getCurrentGpsRoute = async () => {
        const res = await gpsRouteApi.getCurrentRoute();
        if (res.status === 200 && res.data.item) {
            setCurrentGpsRoute(res.data.item);
        } else {
            setCurrentGpsRoute(null);
        }
    }
    const getUserFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_USER);
            if (result) {
                setUser(JSON.parse(result))
            }
            setLoadingUser(true);
        } catch (e) {
            setLoadingUser(true);
        }
    }
    const getThemeFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_THEME);
            if (listTheme.includes(result)) {
                setTheme(result);
            }
            setLoadingTheme(true);
        } catch (e) {
            setLoadingTheme(true);
        }
    }
    const getLanguageFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_LANGUAGE);
            if (listLanguage.includes(result)) {
                if (i18n.language !== result) {
                    await i18n.changeLanguage(result);
                }
                setLanguage(result);
            }
            setLoadingLanguage(true);
        } catch (e) {
            setLoadingLanguage(true);
        }
    }
    useEffect(() => {
        saveUserToStorage(user);
    }, [user])
    useEffect(() => {
        saveThemeToStorage(theme);
    }, [theme])
    useEffect(() => {
        i18n.changeLanguage(language);
        saveLanguageToStorage(language);
    }, [language])
    const saveUserToStorage = async (user) => {
        if (user) {
            await AsyncStorage.setItem(KEY_STORAGE_USER, JSON.stringify(user));
        } else {
            await AsyncStorage.removeItem(KEY_STORAGE_USER);
        }
    }
    const saveThemeToStorage = async (theme) => {
        await AsyncStorage.setItem(KEY_STORAGE_THEME, theme);
    }
    const saveLanguageToStorage = async (language) => {
        await AsyncStorage.setItem(KEY_STORAGE_LANGUAGE, language);
    }

    // useEffect(() => {
    //     if (currentGpsRoute) {
    //         getLocation();
    //     } else {
    //         BackgroundGeolocation.stopWatchPosition((success) => {
    //         })
    //     }
    // }, currentGpsRoute)
    const saveCurrentGpsRouteToStorage = async (currentGpsRoute) => {
        if (currentGpsRoute) {
            await AsyncStorage.setItem(KEY_STORAGE_GPS_ROUTE, JSON.stringify(currentGpsRoute));
        } else {
            await AsyncStorage.removeItem(KEY_STORAGE_GPS_ROUTE);
        }
    }

    const saveGpsPoint = async ({gpsRouteId, longitude, latitude, time, distance, isComplete}) => {
        if (isComplete) {
            setLoading(true);
        }
        const formData = new FormData();
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('time', time);
        formData.append('distance', distance);
        formData.append('gpsRoute', gpsRouteId);
        formData.append('isComplete', isComplete ? 1 : 0)
        const res = await gpsPointApi.createGpsPoint(formData);
        if (res.status === 200 && res.data.item) {
            if (isComplete) {
                getCurrentGpsRoute();
            }
        }
        if (isComplete) {
            setLoading(false);
        }
    }

    const completeGpsRoute = () => {
        setLoading(true);
        if (currentGpsRoute.latitude && currentGpsRoute.longitude && currentLocation) {
            let checkSave = (!currentGpsRoute?.longitude || !currentGpsRoute?.latitude);
            let distance = 0;
            if (!checkSave) {
                distance = getDistance(
                    {latitude: currentGpsRoute.latitude, longitude: currentGpsRoute.longitude},
                    {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
                );
            }
            saveGpsPoint({
                longitude: currentLocation.longitude,
                latitude: currentLocation.latitude,
                gpsRouteId: currentGpsRoute._id,
                time: moment().toISOString(),
                distance: distance,
                isComplete: true,
            })
        }
    }

    useEffect(() => {
        if (currentLocation && currentGpsRoute) {
            let checkSave = (!currentGpsRoute?.longitude || !currentGpsRoute?.latitude);
            let distance = 0;
            if (!checkSave) {
                distance = getDistance(
                    {latitude: currentGpsRoute.latitude, longitude: currentGpsRoute.longitude},
                    {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
                );
                if (distance > 100) {
                    checkSave = true;
                }
            }
            if (checkSave) {
                saveGpsPoint({
                    longitude: currentLocation.longitude,
                    latitude: currentLocation.latitude,
                    gpsRouteId: currentGpsRoute._id,
                    time: moment().toISOString(),
                    distance: distance,
                })
                setCurrentGpsRoute(prev => ({
                    ...prev,
                    ...currentLocation
                }))
            }
        }
    }, [currentLocation])

    const appContextData = {
        user,
        setUser,
        loadingUser,
        loading,
        setLoading,
        theme,
        setTheme,
        loadingTheme,
        setLoadingTheme,
        language,
        setLanguage,
        loadingLanguage,
        setLoadingLanguage,
        pdfLink,
        setPdfLink,
        getCurrentGpsRoute,
        currentGpsRoute,
        getLocation,
        completeGpsRoute
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
