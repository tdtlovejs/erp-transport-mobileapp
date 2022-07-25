import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {
    ROUTE_ROUTE_LIST, ROUTE_ROUTE_NEW, ROUTE_ROUTE_TRACKING,
} from '../../utils/routes';
import {ROLE_ADMIN, ROLE_SUPERADMIN, THEME_DARK} from '../../utils/constants';
import {AppContext} from '../../contexts/AppContext';
import {useTranslation} from 'react-i18next';
import {ACTIVE_1, DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import TouchAction from '../../themes/TouchAction';
import Loading from "../../themes/Loading";

const RouteRoot = (props) => {
    const {
        navigation
    } = props;
    const {
        theme,
        currentGpsRoute,
        location,
        getLocation,
        completeGpsRoute,
        getCurrentGpsRoute,
        user
    } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const isAdmin = [ROLE_ADMIN, ROLE_SUPERADMIN].includes(user?.data?.role);
    const isDriver = !!user?.data?.isDriver;
    const onLoad = () => {
        setLoading(true);
        getCurrentGpsRoute();
    }

    useEffect(() => {
        setLoading(false)
    }, [currentGpsRoute])


    const vehicleName = currentGpsRoute?.vehicle?.name ?? "";
    const vehicleCode = currentGpsRoute?.vehicle?.code ?? "";
    const fileVehicleId = currentGpsRoute?.vehicle?.logo?.fileId;
    const vehicleLogo = fileVehicleId ? `https://drive.google.com/uc?export=view&id=${fileVehicleId}` : null;

    const transportOrderTitle = currentGpsRoute?.transportOrder?.title ?? "";
    console.log(currentGpsRoute)
    const showStartGpsRoute = () => {
        if (loading) {
            return (
                <Loading/>
            )
        }
        if (isDriver) {
            return (
                <>
                    {
                        currentGpsRoute
                            ?
                            <>
                                <View style={[
                                    styles.currentGpsRoute,
                                    (theme === THEME_DARK ? styles.currentGpsRouteDark : {})
                                ]}>
                                    <Text style={[
                                        styles.vehicleTitle,
                                        (theme === THEME_DARK ? styles.vehicleTitleDark : {})
                                    ]}>
                                        {t('gpsRoute.field.vehicle')}
                                    </Text>
                                    <View style={styles.vehicle}>
                                        {vehicleLogo && <Image
                                            source={{
                                                uri: vehicleLogo
                                            }}
                                            style={styles.vehicleLogo}
                                        />}
                                        <View style={styles.vehicleInfo}>
                                            <Text style={[
                                                styles.vehicleInfoText,
                                                (theme === THEME_DARK ? styles.vehicleInfoTextDark : {})
                                            ]}>{vehicleName}</Text>
                                        </View>
                                    </View>
                                    <Text style={[
                                        styles.vehicleTitle,
                                        (theme === THEME_DARK ? styles.vehicleTitleDark : {})
                                    ]}>
                                        {t('gpsRoute.field.transportOrder')}
                                    </Text>
                                    <View style={styles.transportOrder}>
                                        <Text style={[
                                            styles.vehicleInfoText,
                                            (theme === THEME_DARK ? styles.vehicleInfoTextDark : {})
                                        ]}>{transportOrderTitle}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.completeRouteBtn,
                                            (theme === THEME_DARK ? styles.completeRouteBtnDark : {})
                                        ]}
                                        onPress={() => {
                                            completeGpsRoute();
                                        }}
                                    >
                                        <Image
                                            source={require('../../assets/images/route_completed.png')}
                                            style={styles.startRouteImage}
                                        />
                                        <Text style={[
                                            styles.completeRouteBtnText,
                                            (theme === THEME_DARK ? styles.completeRouteBtnDark : {})
                                        ]}>
                                            {t('gpsRoute.field.complete')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                            :
                            <View style={styles.gpsRouteWrapper}>
                                <TouchableOpacity
                                    style={[
                                        styles.startRouteBtn,
                                        (theme === THEME_DARK ? styles.startRouteBtnDark : {})
                                    ]}
                                    onPress={() => {
                                        navigation.navigate(ROUTE_ROUTE_NEW, {
                                            onLoad: onLoad
                                        })
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/start_route.png')}
                                        style={styles.startRouteImage}
                                    />
                                    <Text style={[
                                        styles.startRouteText,
                                        (theme === THEME_DARK ? styles.startRouteTextDark : {})
                                    ]}>
                                        {t('gpsRoute.field.start')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    }
                </>
            )
        }
        return (
            <></>
        )
    }

    if (isAdmin) {
        return (
            <ContainerWrapper
                hasScrollView={true}
                isHome={true}
            >
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/images/route.png')}
                        style={styles.headerImage}
                    />
                    <Text style={[
                        styles.headerText,
                        (theme === THEME_DARK ? styles.headerTextDark : {})
                    ]}>
                        {t('gpsRoute.label.title')}
                    </Text>
                </View>

                <View style={styles.body}>
                    <TouchAction
                        onPress={() => {
                            navigation.navigate(ROUTE_ROUTE_LIST)
                        }}
                        icon={require("./../../assets/images/list.png")}
                        text={t('gpsRoute.label.listRoute')}
                    />
                    <TouchAction
                        onPress={() => {
                            navigation.navigate(ROUTE_ROUTE_TRACKING)
                        }}
                        icon={require("./../../assets/images/tracking.png")}
                        text={t('gpsRoute.label.tracking')}
                    />
                    {showStartGpsRoute()}
                </View>
            </ContainerWrapper>
        )
    }
    return (
        <ContainerWrapper
            hasScrollView={true}
            isHome={true}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/route.png')}
                    style={styles.headerImage}
                />
                <Text style={[
                    styles.headerText,
                    (theme === THEME_DARK ? styles.headerTextDark : {})
                ]}>
                    {t('gpsRoute.label.title')}
                </Text>
            </View>

            <View style={styles.body}>
                <TouchAction
                    onPress={() => {
                        navigation.navigate(ROUTE_ROUTE_LIST)
                    }}
                    icon={require("./../../assets/images/list.png")}
                    text={t('gpsRoute.label.listRoute')}
                />
                {showStartGpsRoute()}
            </View>
        </ContainerWrapper>
    )
}
export default RouteRoot;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerImage: {
        height: 150,
        width: 150,
        marginBottom: 10,
    },
    headerText: {
        color: DARK_1,
        fontWeight: '500',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    headerTextDark: {
        color: LIGHT_1,
    },
    body: {
        // alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    startRouteBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_2,
        padding: 10,
        borderRadius: 60,
        width: 120,
        height: 120,
    },
    startRouteBtnDark: {
        backgroundColor: DARK_2
    },
    completeRouteBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: ACTIVE_1,
        padding: 5,
        borderRadius: 9,

        // width: 120,
        // height: 120,
    },
    completeRouteBtnDark: {

    },
    completeRouteBtnText: {
        color: LIGHT_1,
        textTransform: 'uppercase',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 5,
    },
    completeRouteBtnTextDark: {

    },
    currentGpsRoute: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_2,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        // flex: 1,
    },
    currentGpsRouteDark: {
        backgroundColor: DARK_2
    },
    startRouteImage: {
        height: 60,
        width: 60,
    },
    startRouteText: {
        color: DARK_1,
        textTransform: 'uppercase',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 5,
    },
    startRouteTextDark: {
        color: LIGHT_1,
    },
    boxBottom: {
        height: 70,
    },
    vehicleTitle: {
        color: DARK_1,
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    vehicleTitleDark: {
        color: LIGHT_1,
    },
    vehicleInfoText: {
        color: DARK_2,
        fontSize: 14,
        fontWeight: '400',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    vehicleInfoTextDark: {
        color: LIGHT_2,
    },
    vehicle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 10,
    },
    vehicleLogo: {
        height: 48,
        width: 48,
        borderRadius:24,
    },
    vehicleInfo: {
        padding: 5,
    },
    transportOrder: {
        paddingVertical: 5,
        marginBottom: 10,
    },
    gpsRouteWrapper: {
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
