import React, {useContext, useEffect, useRef, useState} from "react";
import {Text, View} from "react-native";
import {AppContext} from "../../contexts/AppContext";
import ContainerWrapper from "../../themes/ContainerWrapper";
import socketIOClient from "socket.io-client";
import vehicleApi from "../../api/vehicleApi";
import {
    BASE_API,
    REAL_TIME_GPS_POINT,
    VEHICLE_STATUS_MOVING,
    VEHICLE_TYPE_BICYCLE,
    VEHICLE_TYPE_CAR,
    VEHICLE_TYPE_ELECTRIC_BICYCLE,
    VEHICLE_TYPE_ELECTRIC_CAR, VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
    VEHICLE_TYPE_MOTORCYCLE,
    VEHICLE_TYPE_OTHER,
    VEHICLE_TYPE_TRUCK
} from "../../utils/constants";
import {LeafletView} from "react-native-leaflet-view";

const Tracking = (props) => {
    const {
        navigation
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const socketRef = useRef();
    const [vehicles, setVehicles] = useState([]);
    const [dataGpsPoint, setDataGpsPoint] = useState({});
    useEffect(() => {
        getVehicles();
    }, [])
    const getVehicles = async () => {
        let res = await vehicleApi.getAllVehicle({
            showLastPoint: true
        });
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            });
            setDataGpsPoint(res.data.dataGpsPoint)
            setVehicles(resData)
        }
    }
    useEffect(() => {
        socketRef.current = socketIOClient.connect(BASE_API)

        socketRef.current.on(REAL_TIME_GPS_POINT, dataGot => {
            const vehicle = dataGot.vehicle;
            const gpsPoint = dataGot.gpsPoint;
            if (vehicle && gpsPoint) {
                setDataGpsPoint(prev => ({
                    ...prev,
                    [vehicle._id] : gpsPoint
                }))
                setVehicles(prev => prev.map(item => {
                    if (item._id === vehicle._id) {
                        return {
                            ...item,
                            status: vehicle.status
                        }
                    }
                    return item;
                }))
            }
        })
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const showIcon = (item) => {
        switch (item.type) {
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
        return '👨'
    }

    let latitude = 21.007025;
    let longitude = 105.843136;
    Object.entries(dataGpsPoint).forEach(([key, value]) => {
        if (!latitude || !longitude) {
            latitude = value.latitude;
            longitude = value.longitude;
        }
    })
    return (
        <ContainerWrapper>
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
                    ...vehicles.filter(item => item.status === VEHICLE_STATUS_MOVING && dataGpsPoint.hasOwnProperty(item._id)).map((item, index) => {
                        const latitude = dataGpsPoint[item._id]?.latitude;
                        const longitude = dataGpsPoint[item._id]?.longitude;
                        return ({
                            id: index,
                            position: {
                                lat: latitude,
                                lng: longitude
                            },
                            icon: showIcon(item)
                        })
                    }),
                ]}
                mapCenterPosition={{
                    lat: latitude,
                    lng: longitude,
                }}
            />
        </ContainerWrapper>
    )
}

export default Tracking;
