import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Header from './Header';
import HeaderStack from './HeaderStack';
import {
    ROUTE_ACCOUNT_APP,
    ROUTE_ACCOUNT_EDIT,
    ROUTE_ACCOUNT_ROOT,
    ROUTE_CLIENT_APP,
    ROUTE_CLIENT_EDIT,
    ROUTE_CLIENT_LIST,
    ROUTE_CLIENT_NEW,
    ROUTE_EMPLOYEE_APP,
    ROUTE_EMPLOYEE_EDIT,
    ROUTE_EMPLOYEE_LIST,
    ROUTE_EMPLOYEE_NEW,
    ROUTE_EMPLOYEE_ROOT,
    ROUTE_EQUIPMENT_APP,
    ROUTE_EQUIPMENT_EDIT,
    ROUTE_EQUIPMENT_LIST,
    ROUTE_EQUIPMENT_NEW,
    ROUTE_EQUIPMENT_ROOT,
    ROUTE_EQUIPMENT_TYPE_EDIT,
    ROUTE_EQUIPMENT_TYPE_LIST,
    ROUTE_EQUIPMENT_TYPE_NEW,
    ROUTE_HOME_APP,
    ROUTE_INVOICE_APP,
    ROUTE_INVOICE_EDIT,
    ROUTE_INVOICE_LIST,
    ROUTE_INVOICE_NEW,
    ROUTE_PRODUCT_APP,
    ROUTE_PRODUCT_EDIT,
    ROUTE_PRODUCT_LIST,
    ROUTE_PRODUCT_NEW,
    ROUTE_PRODUCT_ROOT,
    ROUTE_PRODUCT_TYPE_EDIT,
    ROUTE_PRODUCT_TYPE_LIST,
    ROUTE_PRODUCT_TYPE_NEW,
    ROUTE_PROJECT_APP,
    ROUTE_PROJECT_EDIT,
    ROUTE_PROJECT_LIST,
    ROUTE_PROJECT_NEW,
    ROUTE_PROJECT_ROOT,
    ROUTE_PROJECT_TYPE_EDIT,
    ROUTE_PROJECT_TYPE_LIST,
    ROUTE_PROJECT_TYPE_NEW,
    ROUTE_ROUTE_APP,
    ROUTE_ROUTE_LIST,
    ROUTE_ROUTE_NEW,
    ROUTE_ROUTE_TRACKING,
    ROUTE_ROUTE_VIEW,
    ROUTE_TRANSPORT_APP,
    ROUTE_TRANSPORT_EDIT,
    ROUTE_TRANSPORT_LIST,
    ROUTE_TRANSPORT_NEW,
    ROUTE_VEHICLE_APP,
    ROUTE_VEHICLE_EDIT,
    ROUTE_VEHICLE_LIST,
    ROUTE_VEHICLE_NEW,
} from '../utils/routes';
import ClientRoot from '../modules/client/ClientRoot';
import ProductRoot from '../modules/product/ProductRoot';
import ProjectRoot from '../modules/project/ProjectRoot';
import EquipmentRoot from '../modules/equipment/EquipmentRoot';
import EmployeeRoot from '../modules/employee/EmployeeRoot';
import AccountRoot from '../modules/account/AccountRoot';
import AccountEdit from '../modules/account/AccountEdit';
import EquipmentList from '../modules/equipment/EquipmentList';
import EquipmentEdit from '../modules/equipment/EquipmentEdit';
import EquipmentNew from '../modules/equipment/EquipmentNew';
import EquipmentTypeList from '../modules/equipment/EquipmentTypeList';
import EquipmentTypeEdit from '../modules/equipment/EquipmentTypeEdit';
import EquipmentTypeNew from '../modules/equipment/EquipmentTypeNew';
import ClientList from '../modules/client/ClientList';
import ClientEdit from '../modules/client/ClientEdit';
import ClientNew from '../modules/client/ClientNew';
import ProductList from '../modules/product/ProductList';
import ProductEdit from '../modules/product/ProductEdit';
import ProductNew from '../modules/product/ProductNew';
import ProductTypeEdit from '../modules/product/ProductTypeEdit';
import ProductTypeList from '../modules/product/ProductTypeList';
import ProductTypeNew from '../modules/product/ProductTypeNew';
import ProjectEdit from '../modules/project/ProjectEdit';
import ProjectNew from '../modules/project/ProjectNew';
import ProjectTypeList from '../modules/project/ProjectTypeList';
import ProjectTypeEdit from '../modules/project/ProjectTypeEdit';
import ProjectTypeNew from '../modules/project/ProjectTypeNew';
import ProjectList from '../modules/project/ProjectList';
import EmployeeEdit from '../modules/employee/EmployeeEdit';
import EmployeeList from '../modules/employee/EmployeeList';
import EmployeeNew from '../modules/employee/EmployeeNew';
import TransportRoot from "../modules/transport/TransportRoot";
import TransportNew from "../modules/transport/TransportNew";
import TransportEdit from "../modules/transport/TransportEdit";
import TransportList from "../modules/transport/TransportList";
import VehicleRoot from "../modules/vehicle/VehicleRoot";
import VehicleNew from "../modules/vehicle/VehicleNew";
import VehicleEdit from "../modules/vehicle/VehicleEdit";
import VehicleList from "../modules/vehicle/VehicleList";
import InvoiceRoot from "../modules/invoice/InvoiceRoot";
import InvoiceEdit from "../modules/invoice/InvoiceEdit";
import InvoiceNew from "../modules/invoice/InvoiceNew";
import InvoiceList from "../modules/invoice/InvoiceList";
import RouteRoot from "../modules/gpsRoute/RouteRoot";
import RouteNew from "../modules/gpsRoute/RouteNew";
import RouteList from "../modules/gpsRoute/RouteList";
import RouteView from "../modules/gpsRoute/RouteView";
import Tracking from "../modules/gpsRoute/Tracking";
import {useTranslation} from "react-i18next";
import HomeRoot from "../modules/home/HomeRoot";


const Stack = createStackNavigator()


const ClientScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_CLIENT_APP}
                component={ClientRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.client_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_CLIENT_LIST}
                component={ClientList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.client_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_CLIENT_EDIT}
                component={ClientEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.client_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_CLIENT_NEW}
                component={ClientNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.client_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {ClientScreenNavigator}
const ProductScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_PRODUCT_APP}
                component={ProductRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.product_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_LIST}
                component={ProductList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_EDIT}
                component={ProductEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_NEW}
                component={ProductNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_new')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_TYPE_LIST}
                component={ProductTypeList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_type_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_TYPE_EDIT}
                component={ProductTypeEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_type_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PRODUCT_TYPE_NEW}
                component={ProductTypeNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.product_type_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {ProductScreenNavigator}
const ProjectScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_PROJECT_APP}
                component={ProjectRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.project_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_LIST}
                component={ProjectList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_EDIT}
                component={ProjectEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_NEW}
                component={ProjectNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_new')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_TYPE_LIST}
                component={ProjectTypeList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_type_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_TYPE_EDIT}
                component={ProjectTypeEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_type_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_PROJECT_TYPE_NEW}
                component={ProjectTypeNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.project_type_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {ProjectScreenNavigator}
const EquipmentScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_EQUIPMENT_APP}
                component={EquipmentRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.equipment_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_LIST}
                component={EquipmentList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_EDIT}
                component={EquipmentEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_NEW}
                component={EquipmentNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_new')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_TYPE_LIST}
                component={EquipmentTypeList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_type_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_TYPE_EDIT}
                component={EquipmentTypeEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_type_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EQUIPMENT_TYPE_NEW}
                component={EquipmentTypeNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.equipment_type_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {EquipmentScreenNavigator}
const EmployeeScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_EMPLOYEE_APP}
                component={EmployeeRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.employee_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_EMPLOYEE_LIST}
                component={EmployeeList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.employee_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EMPLOYEE_EDIT}
                component={EmployeeEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.employee_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_EMPLOYEE_NEW}
                component={EmployeeNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.employee_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {EmployeeScreenNavigator}
const AccountScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_ACCOUNT_APP}
                component={AccountRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.account_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_ACCOUNT_EDIT}
                component={AccountEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.account_edit')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {AccountScreenNavigator}
const TransportScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_TRANSPORT_APP}
                component={TransportRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.transport_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_TRANSPORT_LIST}
                component={TransportList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.transport_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_TRANSPORT_EDIT}
                component={TransportEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.transport_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_TRANSPORT_NEW}
                component={TransportNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.transport_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {TransportScreenNavigator}
const VehicleScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_VEHICLE_APP}
                component={VehicleRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.vehicle_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_VEHICLE_LIST}
                component={VehicleList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.vehicle_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_VEHICLE_EDIT}
                component={VehicleEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.vehicle_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_VEHICLE_NEW}
                component={VehicleNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.vehicle_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {VehicleScreenNavigator}
const InvoiceScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_INVOICE_APP}
                component={InvoiceRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.invoice_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_INVOICE_LIST}
                component={InvoiceList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.invoice_list')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_INVOICE_EDIT}
                component={InvoiceEdit}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.invoice_edit')}/>
                        )
                    }
                }}
            />
            <Stack.Screen
                name={ROUTE_INVOICE_NEW}
                component={InvoiceNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.invoice_new')}/>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
export {InvoiceScreenNavigator}
const RouteScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_ROUTE_APP}
                component={RouteRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.gps_route_root')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_ROUTE_NEW}
                component={RouteNew}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.gps_route_new')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_ROUTE_LIST}
                component={RouteList}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.gps_route_list')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_ROUTE_VIEW}
                component={RouteView}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.gps_route_view')} />
                        )
                    },
                }}
            />
            <Stack.Screen
                name={ROUTE_ROUTE_TRACKING}
                component={Tracking}
                options={{
                    header: (props) => {
                        return (
                            <HeaderStack {...props} title={t('customNavigation.gps_route_tracking')} />
                        )
                    },
                }}
            />
        </Stack.Navigator>
    )
}
export {RouteScreenNavigator}
const HomeScreenNavigator = () => {
    const {t} = useTranslation();
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name={ROUTE_HOME_APP}
                component={HomeRoot}
                options={{
                    header: (props) => {
                        return (
                            <Header {...props} title={t('customNavigation.home_root')} />
                        )
                    },
                }}
            />
        </Stack.Navigator>
    )
}
export {HomeScreenNavigator}
