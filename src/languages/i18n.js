import i18next from 'i18next';
import en from "./en.json";
import vi from "./vi.json";
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE_EN, listLanguage} from '../utils/constants';
let initialLanguage = null;
// try {
//     const result = await AsyncStorage.getItem('language');
//     if (listLanguage.includes(result)) {
//         initialLanguage = result;
//     }
// } catch (e) {
//
// }
const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        return initialLanguage || (listLanguage.includes(RNLocalize.getLocales()[0].languageCode) ? RNLocalize.getLocales()[0].languageCode : LANGUAGE_EN);
    },
    init: () => {},
    cacheUserLanguage: () => {}
}

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: LANGUAGE_EN,
        resources: {
            en: {
                translation: en
            },
            vi: {
                translation: vi
            },
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    })

export default i18next;
