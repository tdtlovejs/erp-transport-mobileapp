export const KEY_STORAGE_USER = 'user';
export const KEY_STORAGE_GPS_ROUTE = 'gpsRoute';
import {Dimensions} from 'react-native';


export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';



export const listTheme = [
    THEME_LIGHT,
    THEME_DARK
]

export const LANGUAGE_EN = 'en';
export const LANGUAGE_VI = 'vi';

export const listLanguage = [
    LANGUAGE_EN,
    LANGUAGE_VI
]


export const KEY_STORAGE_THEME = 'theme';
export const KEY_STORAGE_LANGUAGE = 'language';
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;


export const SAVE_STATUS_PROCESS = 'process';
export const SAVE_STATUS_DONE = 'done';




export const GENDER_MALE = 'male';
export const GENDER_FEMALE = 'female';
export const GENDER_SECRET = 'secret';

export const ROLE_SUPERADMIN = 'superadmin';
export const ROLE_ADMIN = 'admin';
export const ROLE_EMPLOYEE = 'employee';




export const CLIENT_TYPE_PERSONAL = 'personal';
export const CLIENT_TYPE_ORGANIZATION = 'organization';

export const ACTION_EDIT = 'action_edit';
export const ACTION_NEW = 'action_new';

export const BASE_API = 'https://erp-transport-api.herokuapp.com/'

export const MIN_SIZE_IMAGE = 2097152

export const VEHICLE_TYPE_BICYCLE = 'bicycle';
export const VEHICLE_TYPE_ELECTRIC_BICYCLE = 'electric_bicycle'
export const VEHICLE_TYPE_MOTORCYCLE = 'motorcycle';
export const VEHICLE_TYPE_ELECTRIC_MOTORCYCLE = 'electric_motorcycle';
export const VEHICLE_TYPE_CAR = 'car';
export const VEHICLE_TYPE_ELECTRIC_CAR = 'electric_car';
export const VEHICLE_TYPE_TRUCK = 'truck';
export const VEHICLE_TYPE_OTHER = 'other';

export const INVOICE_STATUS_DRAFT = 'draft';
export const INVOICE_STATUS_ACCEPTED = 'accepted';

export const TRANSPORT_STATUS_WAITING = 'waiting';
export const TRANSPORT_STATUS_COMPLETED = 'completed';
export const TRANSPORT_STATUS_CANCELED = 'cancelled';

export const VIEW_TYPE_LIST = 'list';
export const VIEW_TYPE_MAP = 'map';
export const REAL_TIME_GPS_POINT = 'realtimeGpsPoint';
export const VEHICLE_STATUS_AVAILABLE = 'available';
export const VEHICLE_STATUS_MOVING = 'moving';
