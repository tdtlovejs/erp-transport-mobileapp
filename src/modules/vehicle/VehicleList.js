import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_VEHICLE_EDIT,ROUTE_VEHICLE_NEW,} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    THEME_DARK,
    VEHICLE_TYPE_BICYCLE, VEHICLE_TYPE_CAR,
    VEHICLE_TYPE_ELECTRIC_BICYCLE, VEHICLE_TYPE_ELECTRIC_CAR, VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
    VEHICLE_TYPE_MOTORCYCLE, VEHICLE_TYPE_TRUCK
} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from "react-i18next";
import vehicleApi from "../../api/vehicleApi";

const VehicleList = (props) => {
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
        const res = await vehicleApi.deleteVehicleById( id);
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
            t('label.alert').toUpperCase(),
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

    const imageVehicleType = (type) => {
        switch (type) {
            case VEHICLE_TYPE_BICYCLE:
                return require("../../assets/images/bicycle.png");
            case VEHICLE_TYPE_ELECTRIC_BICYCLE:
                return require("../../assets/images/electric_bicycle.png");
            case VEHICLE_TYPE_MOTORCYCLE:
                return require("../../assets/images/motorcycle.png");
            case VEHICLE_TYPE_ELECTRIC_MOTORCYCLE:
                return require("../../assets/images/electric_motorcycle.png");
            case VEHICLE_TYPE_CAR:
                return require("../../assets/images/car.png");
            case VEHICLE_TYPE_ELECTRIC_CAR:
                return require("../../assets/images/electric_car.png");
            case VEHICLE_TYPE_TRUCK:
                return require("../../assets/images/truck.png");
        }
        return require("../../assets/images/other.png");
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
            case VEHICLE_TYPE_ELECTRIC_CAR:
                return t('vehicle.label.electric_car');
            case VEHICLE_TYPE_TRUCK:
                return t('vehicle.label.truck');
        }
        return t('vehicle.label.other');
    }

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_VEHICLE_NEW, {
                            onLoad: onLoad
                        })
                    }}
                >
                    <IonIcon
                        name='add-circle'
                        size={24}
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                    />
                </TouchableOpacity>
            </View>
            <FlatListApp
                forceUpdate={forceUpdate}
                apiNameList={"api/v1/vehicle/list"}
                renderItem={({item, index}) => {
                    const fileId = item?.logo?.fileId;
                    const linkImage = fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
                    return (
                        <ItemWithExpanded
                            renderItem={
                                <View style={[
                                    styles.rowView,
                                    (theme === THEME_DARK ? styles.rowViewDark : {})
                                ]}>
                                    <View style={styles.cellImageWrapper}>
                                        {linkImage && <Image
                                            source={{
                                                uri: linkImage
                                            }}
                                            style={styles.cellImage}
                                        />}
                                    </View>
                                    <View style={styles.cellView}>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {})
                                        ]}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.cellAction}>
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                navigation.navigate(ROUTE_VEHICLE_EDIT, {
                                                    data: item,
                                                    onLoad: onLoad
                                                })
                                            }}
                                        >
                                            <IonIcon
                                                name='pencil'
                                                size={18}
                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                showConfirmDelete(item)
                                            }}
                                        >
                                            <IonIcon
                                                name='trash'
                                                size={18}
                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            renderItemExpanded={
                                <>
                                    <ViewItem
                                        label={t('field.name')}
                                        view={item.name}
                                    />
                                    <ViewItem
                                        label={t('field.code')}
                                        view={item.code}
                                    />
                                    <ViewItem
                                        label={t('field.description')}
                                        view={item.description}
                                    />
                                    <ViewItem
                                        label={t('vehicle.field.type')}
                                        view={
                                            <View style={styles.vehicleType}>
                                                <Image
                                                    style={styles.vehicleTypeImage}
                                                    source={imageVehicleType(item?.type ?? "")}
                                                />
                                                <Text
                                                    style={[
                                                        styles.vehicleTypeText,
                                                        (theme === THEME_DARK ? styles.vehicleTypeTextDark : {})
                                                    ]}
                                                >
                                                    {textVehicleType(item?.type ?? "")}
                                                </Text>
                                            </View>
                                        }
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
export default VehicleList;
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
        flex: 1,
    },
    cellImageWrapper: {
        padding: 5,
    },
    cellImage: {
        height: 48,
        width: 48,
        borderRadius: 24,
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
    vehicleType: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vehicleTypeImage: {
        width: 36,
        height: 36,
    },
    vehicleTypeText: {
        color: DARK_2,
        marginLeft: 5,
    },
    vehicleTypeTextDark: {
        color: LIGHT_2
    }
})
