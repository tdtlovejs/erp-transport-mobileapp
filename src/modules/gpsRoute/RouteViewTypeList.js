import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, {useContext} from "react";
import moment from "moment";
import {AppContext} from "../../contexts/AppContext";
import {THEME_DARK} from "../../utils/constants";
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from "../../utils/colors";

const RouteViewTypeList = (props) => {
    const {
        gpsPoints
    } = props;
    const {
        theme
    } = useContext(AppContext);
    let totalDistance = 0;
    gpsPoints.forEach(item => {
        totalDistance += Number(item.distance) ?? 0;
    })
    return (
        <>
            <FlatList
                data={gpsPoints}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemView}>
                            <View style={styles.cellView}>
                                <View style={styles.coorItem}>
                                    <Image
                                        style={styles.coorItemImage}
                                        source={require('../../assets/images/latitude.png')}
                                    />
                                    <Text style={[
                                        styles.coorItemText,
                                        (theme === THEME_DARK ? styles.coorItemTextDark : {})
                                    ]}>{item.latitude}</Text>
                                </View>
                                <View style={styles.coorItem}>
                                    <Image
                                        style={styles.coorItemImage}
                                        source={require('../../assets/images/longitude.png')}
                                    />
                                    <Text style={[
                                        styles.coorItemText,
                                        (theme === THEME_DARK ? styles.coorItemTextDark : {})
                                    ]}>{item.longitude}</Text>
                                </View>
                            </View>
                            <View style={styles.cellView}>
                                <Text style={[
                                    styles.cellText,
                                    (theme === THEME_DARK ? styles.cellTextDark : {})
                                ]}>{moment(item.time).format('LL')}</Text>
                                <Text style={[
                                    styles.cellText,
                                    (theme === THEME_DARK ? styles.cellTextDark : {})
                                ]}>{moment(item.time).format('LT')}</Text>
                            </View>
                            <View style={styles.cellView}>
                                <Text style={[
                                    styles.cellText,
                                    (theme === THEME_DARK ? styles.cellTextDark : {})
                                ]}>{item.distance}m</Text>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={item => item._id}
            />
            <View style={styles.footer}>
                <View style={styles.totalDistance}>
                    <Text style={[
                        styles.totalDistanceText,
                        (theme === THEME_DARK ? styles.totalDistanceTextDark : {})
                    ]}>{totalDistance/1000}km</Text>
                </View>
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
    footer: {
        alignItems: 'flex-end',
        padding: 5,
    },
    totalDistance: {
        alignItems: "flex-end",
        paddingHorizontal: 10,
    },
    totalDistanceText: {
        color: DARK_2,
        fontWeight: '500',
        fontSize: 16,
    },
    totalDistanceTextDark: {
        color: LIGHT_2,
    },
    cellText: {
        color: DARK_1,
    },
    cellTextDark: {
        color: LIGHT_1,
    },
})

export default RouteViewTypeList;
