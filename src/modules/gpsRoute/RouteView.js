import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import ContainerWrapper from "../../themes/ContainerWrapper";
import gpsPointApi from "../../api/gpsPointApi";
import {VIEW_TYPE_LIST, VIEW_TYPE_MAP} from "../../utils/constants";
import SwitchCustom from "../../themes/SwitchCustom";
import RouteViewTypeList from "./RouteViewTypeList";
import RouteViewTypeMap from "./RouteViewTypeMap";
const listViewType = [
    {
        value: VIEW_TYPE_LIST,
        image: require('./../../assets/images/list_view.png')
    },
    {
        value: VIEW_TYPE_MAP,
        image: require('./../../assets/images/map_view.png')
    }
]
const RouteView = (props) => {
    const {
        navigation,
        route
    } = props;
    const {
        data,
    } = route.params;
    const [viewType, setViewType] = useState(VIEW_TYPE_MAP)
    const [gpsPoints, setGpsPoints] = useState([]);

    useEffect(() => {
        getGpsPoints();
    }, [])

    const getGpsPoints = async () => {
        const res = await gpsPointApi.getAllGpsPoint({
            gpsRouteId: data._id
        })
        if (res.status === 200 && Array.isArray(res.data.items)) {
            setGpsPoints(res.data.items.filter((item, index) => {
                if (Number(item.distance) < 20 && index !== 0) {
                    return false
                }
                return true;
            }));
        }
    }

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <SwitchCustom
                    listOptions={listViewType}
                    onChange={(value) => {
                        setViewType(value);
                    }}
                    optionValueInit={viewType}
                />
            </View>
            {
                gpsPoints.length > 0
                ?
                    <>
                        {
                            viewType === VIEW_TYPE_LIST
                                ?
                                <RouteViewTypeList
                                    gpsPoints={gpsPoints}
                                    vehicleType={data.vehicle?.type}
                                />
                                :
                                <>
                                    <RouteViewTypeMap
                                        gpsPoints={gpsPoints}
                                        vehicleType={data.vehicle?.type}
                                    />
                                </>
                        }
                    </>
                    :
                    <>
                    </>
            }
        </ContainerWrapper>
    )
}

export default RouteView;
const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center',
        zIndex: 999,
        elevation:999
    },
})
