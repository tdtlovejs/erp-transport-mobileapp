import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import TabBarCustom from './TabBarCustom';
import {
    ROUTE_ACCOUNT_APP,
    ROUTE_ACCOUNT_ROOT,
    ROUTE_CLIENT_APP,
    ROUTE_CLIENT_ROOT,
    ROUTE_EMPLOYEE_APP,
    ROUTE_EMPLOYEE_ROOT,
    ROUTE_EQUIPMENT_APP,
    ROUTE_EQUIPMENT_ROOT, ROUTE_HOME_APP, ROUTE_HOME_ROOT,
    ROUTE_INVOICE_APP,
    ROUTE_INVOICE_ROOT,
    ROUTE_PRODUCT_APP,
    ROUTE_PRODUCT_ROOT,
    ROUTE_PROJECT_APP,
    ROUTE_PROJECT_ROOT, ROUTE_ROUTE_APP,
    ROUTE_ROUTE_ROOT,
    ROUTE_TRANSPORT_APP,
    ROUTE_TRANSPORT_ROOT,
    ROUTE_VEHICLE_APP,
    ROUTE_VEHICLE_ROOT,
} from '../utils/routes';
import {
    AccountScreenNavigator, ClientScreenNavigator,
    EmployeeScreenNavigator, EquipmentScreenNavigator, HomeScreenNavigator, InvoiceScreenNavigator,
    ProductScreenNavigator,
    ProjectScreenNavigator, RouteScreenNavigator, TransportScreenNavigator, VehicleScreenNavigator,
} from './CustomNavigation';
import {AppContext} from "../contexts/AppContext";
import {ROLE_ADMIN, ROLE_SUPERADMIN} from "../utils/constants";

const Tab = createBottomTabNavigator()

const CustomTabNavigation = (props) => {
    const {
        user
    } = useContext(AppContext);
    const role = user?.data?.role;
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={props => <TabBarCustom {...props} />}
        >
            <Tab.Screen
                name={ROUTE_HOME_ROOT}
                component={HomeScreenNavigator}
                options={({ route }) => ({
                    hiddenTabBar: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        return ![ROUTE_HOME_APP, ""].includes(routeName)
                    })(route),
                })}
            />
            <Tab.Screen
                name={ROUTE_ROUTE_ROOT}
                component={RouteScreenNavigator}
                options={({ route }) => ({
                    hiddenTabBar: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        return ![ROUTE_ROUTE_APP, ""].includes(routeName)
                    })(route),
                })}
            />
            {
                [ROLE_SUPERADMIN, ROLE_ADMIN].includes(role) &&
                <>
                    <Tab.Screen
                        name={ROUTE_EMPLOYEE_ROOT}
                        component={EmployeeScreenNavigator}
                        options={({route}) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_EMPLOYEE_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_TRANSPORT_ROOT}
                        component={TransportScreenNavigator}
                        options={({ route }) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_TRANSPORT_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_VEHICLE_ROOT}
                        component={VehicleScreenNavigator}
                        options={({ route }) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_VEHICLE_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_INVOICE_ROOT}
                        component={InvoiceScreenNavigator}
                        options={({ route }) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_INVOICE_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />

                    <Tab.Screen
                        name={ROUTE_CLIENT_ROOT}
                        component={ClientScreenNavigator}
                        options={({route}) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_CLIENT_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_EQUIPMENT_ROOT}
                        component={EquipmentScreenNavigator}
                        options={({route}) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_EQUIPMENT_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_PRODUCT_ROOT}
                        component={ProductScreenNavigator}
                        options={({route}) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_PRODUCT_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                    <Tab.Screen
                        name={ROUTE_PROJECT_ROOT}
                        component={ProjectScreenNavigator}
                        options={({route}) => ({
                            hiddenTabBar: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                                return ![ROUTE_PROJECT_APP, ""].includes(routeName)
                            })(route),
                        })}
                    />
                </>
            }
            <Tab.Screen
                name={ROUTE_ACCOUNT_ROOT}
                component={AccountScreenNavigator}
                options={({ route }) => ({
                    hiddenTabBar: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        return ![ROUTE_ACCOUNT_APP, ""].includes(routeName)
                    })(route),
                })}
            />

        </Tab.Navigator>
    )
}
export default CustomTabNavigation;
