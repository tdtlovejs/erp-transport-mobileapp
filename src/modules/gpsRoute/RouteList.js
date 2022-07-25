import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_ROUTE_VIEW,} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    THEME_DARK,
    VEHICLE_TYPE_BICYCLE, VEHICLE_TYPE_CAR,
    VEHICLE_TYPE_ELECTRIC_BICYCLE, VEHICLE_TYPE_ELECTRIC_CAR, VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
    VEHICLE_TYPE_MOTORCYCLE, VEHICLE_TYPE_OTHER, VEHICLE_TYPE_TRUCK
} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import clientApi from '../../api/clientApi';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";


const RouteList = (props) => {
    const {
        theme,
        setLoading
    } = useContext(AppContext);
    const {
        navigation
    } = props;
    const {t} = useTranslation();
    const [forceUpdate, setForceUpdate] = useState(false);
    useEffect(() => {
        if (forceUpdate) {
            setForceUpdate(false)
        }
    }, [forceUpdate])
    const onLoad = () => {
        setForceUpdate(true)
    }
    const onDelete = async (id) => {
        setLoading(true);
        const res = await clientApi.deleteClientById(id);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                  t('label.delete_success'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            onLoad();
        }
        setLoading(false);
    }

    const showConfirmDelete = (item) => {
        Alert.alert(
            t('label.alert'),
            t('label.confirm_delete'),
            [
                {
                    text: t('label.ok'),
                    onPress: () => {
                        if (item._id) {
                            onDelete(item._id);
                        }
                    },
                    style: "ok",
                },
                {
                    text: t('label.cancel'),
                    onPress: () => {

                    },
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    }

    const imageVehicleType = (vehicleType) => {
        switch (vehicleType) {
            case VEHICLE_TYPE_BICYCLE:
                return require('../../assets/images/bicycle.png');
            case VEHICLE_TYPE_ELECTRIC_BICYCLE:
                return require('../../assets/images/electric_bicycle.png');
            case VEHICLE_TYPE_MOTORCYCLE:
                return require('../../assets/images/motorcycle.png');
            case VEHICLE_TYPE_ELECTRIC_MOTORCYCLE:
                return require('../../assets/images/electric_motorcycle.png');
            case VEHICLE_TYPE_CAR:
                return require('../../assets/images/car.png');
            case VEHICLE_TYPE_ELECTRIC_CAR:
                return require('../../assets/images/electric_car.png');
            case VEHICLE_TYPE_TRUCK:
                return require('../../assets/images/truck.png');
            case VEHICLE_TYPE_OTHER:
        }
        return require('../../assets/images/other.png');
    }

    const textVehicleType = (vehicleType) => {
        switch (vehicleType) {
            case VEHICLE_TYPE_BICYCLE:
                return t('vehicle.label.bicycle');
            case VEHICLE_TYPE_ELECTRIC_BICYCLE:
                return t('vehicle.label.electric_bicycle');
            case VEHICLE_TYPE_MOTORCYCLE:
                return t('vehicle.label.motorcycle');
            case VEHICLE_TYPE_ELECTRIC_MOTORCYCLE:
                return t('vehicle.label.electric_motorcycle');
            case VEHICLE_TYPE_CAR:
                return t('vehicle.label.car');
            case VEHICLE_TYPE_TRUCK:
                return t('vehicle.label.truck');
            case VEHICLE_TYPE_OTHER:
        }
        return t('vehicle.label.other');
    }
    return (
        <ContainerWrapper>
            <FlatListApp
                forceUpdate={forceUpdate}
                apiNameList={"api/v1/gpsRoute/list"}
                renderItem={({item, index}) => {
                    const fileVehicleLogoId = item?.vehicle?.logo?.fileId;
                    const linkVehicleLogo = fileVehicleLogoId ? `https://drive.google.com/uc?export=view&id=${fileVehicleLogoId}` : null;

                    const fileDriverAvatarId = item?.driver?.avatar?.fileId;
                    const linkDriverAvatar = fileDriverAvatarId ? `https://drive.google.com/uc?export=view&id=${fileDriverAvatarId}` : null;
                    return (
                        <ItemWithExpanded
                            renderItem={
                                <View style={[
                                    styles.rowView,
                                    (theme === THEME_DARK ? styles.rowViewDark : {})
                                ]}>
                                    <View style={styles.cellView}>
                                        <MaterialCommunityIcon
                                            name="clock-start"
                                            color={theme === THEME_DARK ? LIGHT_2 : DARK_2}
                                            size={24}
                                        />
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {}),
                                            styles.cellDateText
                                        ]}>
                                            {item.startAt ? moment(item.startAt).format('LL') : ''}
                                        </Text>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {}),
                                            styles.cellDateText
                                        ]}>
                                            {item.startAt ? moment(item.startAt).format('LT') : ''}
                                        </Text>
                                    </View>
                                    <View style={[
                                        styles.cellView,
                                        {flex: 1}
                                    ]}>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {})
                                        ]}>
                                            {item.transportOrder?.title}
                                        </Text>
                                    </View>
                                    <View style={styles.cellView}>
                                        <MaterialCommunityIcon
                                            name="clock-end"
                                            color={theme === THEME_DARK ? LIGHT_2 : DARK_2}
                                            size={24}
                                        />
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {}),
                                            styles.cellDateText
                                        ]}>
                                            {item.endAt ? moment(item.endAt).format('LL') : ''}
                                        </Text>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {}),
                                            styles.cellDateText
                                        ]}>
                                            {item.endAt ? moment(item.endAt).format('LT') : ''}
                                        </Text>
                                    </View>
                                    <View style={styles.cellAction}>
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                navigation.navigate(ROUTE_ROUTE_VIEW, {
                                                    data: item,
                                                })
                                            }}
                                        >
                                            <IonIcon
                                                name='eye'
                                                size={18}
                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            renderItemExpanded={
                                <>
                                    <Text style={[
                                        styles.headerText,
                                        (theme === THEME_DARK ? styles.headerTextDark : {})
                                    ]}>
                                        {t('gpsRoute.label.transportOrder_info')}
                                    </Text>
                                    <ViewItem
                                        label={t('transportOrder.field.title')}
                                        view={item.transportOrder?.title}
                                    />
                                    <Text style={[
                                        styles.headerText,
                                        (theme === THEME_DARK ? styles.headerTextDark : {})
                                    ]}>
                                        {t('gpsRoute.label.vehicle_info')}
                                    </Text>
                                    {linkVehicleLogo && <Image
                                        source={{
                                            uri: linkVehicleLogo
                                        }}
                                        style={styles.cellImage}
                                    />}
                                    <ViewItem
                                        label={t('field.name')}
                                        view={item.vehicle?.name}
                                    />
                                    <ViewItem
                                        label={t('field.code')}
                                        view={item.vehicle?.code}
                                    />
                                    <ViewItem
                                        label={t('field.description')}
                                        view={item.vehicle?.description}
                                    />
                                    <ViewItem
                                        label={t('vehicle.field.type')}
                                        isViewComponent={true}
                                        view={
                                            <View style={styles.vehicleTypeView}>
                                                <Image
                                                    source={imageVehicleType(item.vehicle?.type)}
                                                    style={styles.vehicleTypeImage}
                                                />
                                                <Text style={[
                                                    styles.vehicleTypeText,
                                                    (theme === THEME_DARK ? styles.vehicleTypeTextDark : {})
                                                ]}>
                                                    {textVehicleType(item.vehicle?.type)}
                                                </Text>
                                            </View>
                                        }
                                    />
                                    <Text style={[
                                        styles.headerText,
                                        (theme === THEME_DARK ? styles.headerTextDark : {})
                                    ]}>
                                        {t('gpsRoute.label.driver_info')}
                                    </Text>
                                    {linkDriverAvatar && <Image
                                        source={{
                                            uri: linkDriverAvatar
                                        }}
                                        style={styles.cellImage}
                                    />}
                                    <ViewItem
                                        label={t('employee.field.fullName')}
                                        view={(item?.driver?.firstName ?? "") + " "+ (item?.driver?.lastName ?? "")}
                                    />
                                    <ViewItem
                                        label={t('employee.field.email')}
                                        view={item?.driver?.email}
                                    />
                                    <ViewItem
                                        label={t('employee.field.phoneNumber')}
                                        view={item?.driver?.phoneNumber}
                                    />
                                </>
                            }
                        />
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default RouteList;
const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center'
    },
    rowView: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: DARK_2,
        alignItems: 'center'
    },
    rowViewDark: {
        borderBottomColor: LIGHT_2,
    },
    cellView: {
        // flex: 1,
    },
    cellImageWrapper: {
        padding: 5,
    },
    cellImage: {
        height: 48,
        width: 48,
        borderRadius: 24,
    },
    vehicleTypeView: {
      flexDirection: 'row',
    },
    vehicleTypeImage: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    vehicleTypeText: {
        color: DARK_2,
    },
    vehicleTypeTextDark: {
        color: LIGHT_2,
    },
    cellDateText: {
        fontSize: 11,
        width: 80,
    },
    cellText: {
        color: DARK_1,
    },
    cellTextDark: {
        color: LIGHT_1,
    },
    cellAction: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cellBtn: {
        margin: 5,
        padding: 5,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        color: DARK_1,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginTop: 20,
    },
    headerTextDark: {
        color: LIGHT_1,
    },
})
