import React, {useContext} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK, WINDOW_WIDTH} from '../utils/constants';
import {ACTIVE_1, DARK_2, LIGHT_2, WHITE} from '../utils/colors';
import {
    ROUTE_ACCOUNT_ROOT,
    ROUTE_CLIENT_ROOT,
    ROUTE_EMPLOYEE_ROOT,
    ROUTE_EQUIPMENT_ROOT, ROUTE_HOME_ROOT, ROUTE_INVOICE_ROOT,
    ROUTE_PRODUCT_ROOT,
    ROUTE_PROJECT_ROOT, ROUTE_ROUTE_ROOT, ROUTE_TRANSPORT_ROOT, ROUTE_VEHICLE_ROOT,
} from '../utils/routes';
import {useTranslation} from 'react-i18next';
import icon from "../assets/images/employee.png";
const TabBarCustom = ({ state, descriptors, navigation }) => {
    const {
        theme
    } = useContext(AppContext)
    const {t} = useTranslation();
    let hiddenTabBar = false;
    try {
        hiddenTabBar = descriptors[state.routes[state.index].key].options?.hiddenTabBar;
    } catch (e) {

    }
    if (hiddenTabBar) {
        return null;
    }
    const routesLength = state.routes.length;
    return (
        <View style={[
            styles.tabBar,
            (theme === THEME_DARK ? styles.tabBarDark : {})
        ]}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={state.routes}
                renderItem={({item, index}) => {
                    const route = item;
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    let icon = require('./../assets/images/employee.png')
                    let name = ''
                    switch (route.name) {
                        case ROUTE_EMPLOYEE_ROOT:
                            icon = require('./../assets/images/employee.png')
                            name = t('tabBar.employee')
                            break;
                        case ROUTE_CLIENT_ROOT:
                            icon = require('./../assets/images/client.png')
                            name = t('tabBar.client')
                            break;
                        case ROUTE_PRODUCT_ROOT:
                            icon = require('./../assets/images/product.png')
                            name = t('tabBar.product')
                            break;
                        case ROUTE_EQUIPMENT_ROOT:
                            icon = require('./../assets/images/equipment.png')
                            name = t('tabBar.equipment')
                            break;
                        case ROUTE_PROJECT_ROOT:
                            icon = require('./../assets/images/project.png')
                            name = t('tabBar.project')
                            break;
                        case ROUTE_ACCOUNT_ROOT:
                            icon = require('./../assets/images/account.png')
                            name = t('tabBar.account')
                            break;
                        case ROUTE_TRANSPORT_ROOT:
                            icon = require('./../assets/images/transport.png')
                            name = t('tabBar.transport')
                            break;
                        case ROUTE_VEHICLE_ROOT:
                            icon = require('./../assets/images/vehicle.png')
                            name = t('tabBar.vehicle')
                            break;
                        case ROUTE_INVOICE_ROOT:
                            icon = require('./../assets/images/invoice.png')
                            name = t('tabBar.invoice')
                            break;
                        case ROUTE_ROUTE_ROOT:
                            icon = require('./../assets/images/route.png')
                            name = t('tabBar.gps_route')
                            break;
                        case ROUTE_HOME_ROOT:
                            icon = require('./../assets/images/home.png')
                            name = t('tabBar.home')
                            break;
                    }
                    return (
                        <View style={[
                            styles.tabBarItemWrapper,
                            (routesLength === 1 ? {width: WINDOW_WIDTH-15} : routesLength === 2 ? {width: WINDOW_WIDTH/2-10} : routesLength === 3 ? {width: WINDOW_WIDTH/3-5} : {})
                        ]}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={[
                                    styles.tabBarItem,
                                    (isFocused ? theme === THEME_DARK ? styles.tabBarItemActiveDark : styles.tabBarItemActive : {}),
                                ]}
                            >
                                <Image
                                    source={icon}
                                    style={[styles.tabBarItemIcon, (isFocused ? styles.tabBarItemIconActive : {})]}
                                />
                                {isFocused ? <Text style={[
                                    styles.tabBarItemText,
                                    (theme === THEME_DARK ? styles.tabBarItemTextDark : {})
                                ]}>{name}</Text> : null}
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item => item.key)}
                horizontal={true}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        height: 60,
        backgroundColor: LIGHT_2,
        borderRadius: 9,
        padding: 5,
        elevation: 999,
        zIndex: 999,
    },
    tabBarDark: {
        backgroundColor: DARK_2,
    },
    tabBarItemWrapper: {
        width: WINDOW_WIDTH/4-5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarItem: {
        width: '100%',
        height: '100%',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarItemIcon: {
        height: 36,
        width: 36
    },
    tabBarItemIconActive: {
        height: 24,
        width: 24
    },
    tabBarItemText: {
        fontSize: 9,
        color: WHITE,
        fontWeight: '400',
        textTransform: 'uppercase'
    },
    tabBarItemTextDark: {
        color: WHITE,
    },
    tabBarItemActive: {
        backgroundColor: ACTIVE_1
    },
    tabBarItemActiveDark: {
        backgroundColor: ACTIVE_1
    }
})

export default TabBarCustom;
