import {StyleSheet, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {AppContext} from "../../contexts/AppContext";
import {
    THEME_DARK,
    VEHICLE_TYPE_BICYCLE, VEHICLE_TYPE_CAR,
    VEHICLE_TYPE_ELECTRIC_BICYCLE, VEHICLE_TYPE_ELECTRIC_CAR, VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
    VEHICLE_TYPE_MOTORCYCLE, VEHICLE_TYPE_OTHER, VEHICLE_TYPE_TRUCK
} from "../../utils/constants";
import {DARK_1, DARK_2, LIGHT_1} from "../../utils/colors";
import {LeafletView} from "react-native-leaflet-view";

const RouteViewTypeMap = (props) => {
    const {
        gpsPoints,
        vehicleType
    } = props;
    const {
        theme
    } = useContext(AppContext);

    const showIcon = (index) => {
        if (index === 0) {
            return '👨'
        }
        if (index === gpsPoints.length - 1) {
            return '📍';
        }
        switch (vehicleType) {
            case VEHICLE_TYPE_BICYCLE:
            case VEHICLE_TYPE_ELECTRIC_BICYCLE:
                return '🚲';
            case VEHICLE_TYPE_MOTORCYCLE:
            case VEHICLE_TYPE_ELECTRIC_MOTORCYCLE:
                return '🛵';
            case VEHICLE_TYPE_CAR:
            case VEHICLE_TYPE_ELECTRIC_CAR:
            case VEHICLE_TYPE_TRUCK:
                return '🚛';
            case VEHICLE_TYPE_OTHER:
                return '🛻';
        }
        return '🛻';
    }
    let totalDistance = 0;
    gpsPoints.forEach(item => {
        totalDistance += Number(item.distance) ?? 0;
    })
    return (
        <>
            <LeafletView
                mapLayers={[
                    {
                        baseLayerName: "MapTiler",
                        baseLayerIsChecked: "true",
                        baseLayer: "true",
                        url: "https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
                    },
                ]}
                mapMarkers={[
                    ...gpsPoints.map((item, index) => {
                        return ({
                            id: index,
                            position: {
                                lat: item.latitude,
                                lng: item.longitude
                            },
                            icon: showIcon(index)
                        })
                    }),
                ]}
                mapCenterPosition={{
                    lat: gpsPoints[0].latitude,
                    lng: gpsPoints[0].longitude,
                }}
            />
            <View style={styles.totalDistance}>
                <Text style={[
                    styles.totalDistanceText,
                    (theme === THEME_DARK ? styles.totalDistanceTextDark : {})
                ]}>{totalDistance/1000}km</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row'
    },
    cellView: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: "flex-end"
    },
    coorItem: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 2,
        alignItems: 'center'
    },
    coorItemImage: {
        width: 24,
        height: 24,
    },
    coorItemText: {
        fontWeight: '500',
        color: DARK_1,
        paddingLeft: 5,
    },
    coorItemTextDark: {
        color: LIGHT_1,
    },
    totalDistance: {
        alignItems: "flex-end",
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    totalDistanceText: {
        color: DARK_2,
        fontWeight: '500',
        fontSize: 16,
    },
    totalDistanceTextDark: {
        color: DARK_2,
    },
})

export default RouteViewTypeMap;
