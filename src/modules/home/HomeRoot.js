import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_VEHICLE_LIST,} from '../../utils/routes';
import {ROLE_ADMIN, ROLE_SUPERADMIN, THEME_DARK, WINDOW_WIDTH} from '../../utils/constants';
import TouchAction from '../../themes/TouchAction';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import {useTranslation} from 'react-i18next';
import {BarChart, LineChart} from "react-native-chart-kit";
import moment from "moment";
import commonApi from "../../api/commonApi";
import invoiceApi from "../../api/invoiceApi";
import EquipmentIcon from "../../assets/images/equipment.png";
import DatePicker from "react-native-date-picker";
import IonIcon from 'react-native-vector-icons/Ionicons';

const listMonths = [0,1,2,3,4,5,6,7,8,9,10,11];
const dataInitStatisCount = {
    vehicle: null,
    productType: null,
    product: null,
    projectType: null,
    project: null,
    equipmentType: null,
    equipment: null,
    client: null,
    invoice: null,
    transportOrder: null,
    person: null,
    gpsRoute: null
}
const HomeRoot = (props) => {
    const {
        navigation
    } = props;
    const {
        theme,
        user
    } = useContext(AppContext);

    const role = user?.data?.role;
    const {t} = useTranslation();

    const [year, setYear] = useState(Number(moment().format('YYYY')));
    const [loading, setLoading] = useState(false);
    const [dataTotalAmount, setDataTotalAmount] = useState(listMonths.map(item => 0));
    const isAdmin = [ROLE_ADMIN, ROLE_SUPERADMIN].includes(role);
    const [statisCount, setStatisCount] = useState({...dataInitStatisCount})

    useEffect(() => {
        getDataStatis();
    }, [])

    useEffect(() => {
        getTotalAmountByYear(year);
    }, [year])
    const getDataStatis = async () => {
        const res = await commonApi.showStatis();
        if (res.status === 200) {
            setStatisCount(prev => ({
                ...prev,
                ...res.data?.count
            }))
        }
    }

    const getTotalAmountByYear = async (year) => {
        setLoading(true);
        const res = await invoiceApi.getTotalAmountByYear(year);
        if (res.status === 200) {
            if (res.data.total) {
                setDataTotalAmount(listMonths.map(item => Number((res.data.total[item] ?? 0))))
            }
        }
        setLoading(false)
    }

    const showEquipmentBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/equipment.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.equipment')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.equipment === null ? "" : statisCount?.equipment ?? ""}
                    </Text>
                </View>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.equipmentType')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.equipmentType === null ? "" : statisCount?.equipmentType ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showProjectBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/project.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.project')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.project === null ? "" : statisCount?.project ?? ""}
                    </Text>
                </View>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.projectType')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.projectType === null ? "" : statisCount?.projectType ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showProductBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/product.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.product')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.product === null ? "" : statisCount?.product ?? ""}
                    </Text>
                </View>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.productType')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.productType === null ? "" : statisCount?.productType ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showClientBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/client.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.client')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.client === null ? "" : statisCount?.client ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showEmployeeBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/employee.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.employee')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.person === null ? "" : statisCount?.person ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showInvoiceBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/invoice.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.invoice')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.invoice === null ? "" : statisCount?.invoice ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showTransportOrderBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/transport.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.transportOrder')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.transportOrder === null ? "" : statisCount?.transportOrder ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showGpsRouteBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/route.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.gpsRoute')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.gpsRoute === null ? "" : statisCount?.gpsRoute ?? ""}
                    </Text>
                </View>
            </View>
        )
    }
    const showVehicleBlock = () => {
        return (
            <View style={[
                styles.blockWrapper,
                (theme === THEME_DARK ? styles.blockWrapperDark : {})
            ]}>
                <View style={styles.itemModule}>
                    <View style={styles.itemModuleTitle}>
                        <Image
                            source={require("../../assets/images/vehicle.png")}
                            style={styles.itemModuleTitleImage}
                        />
                        <Text style={[
                            styles.itemModuleTitleText,
                            (theme === THEME_DARK ? styles.itemModuleTitleTextDark : {})
                        ]}>
                            {t('module.vehicle')}
                        </Text>
                    </View>
                    <Text style={[
                        styles.itemModuleCount,
                        (theme === THEME_DARK ? styles.itemModuleCountDark : {})
                    ]}>
                        {statisCount?.vehicle === null ? "" : statisCount?.vehicle ?? ""}
                    </Text>
                </View>
            </View>
        )
    }


    const labels = [
        t('label.month.m_1'),
        t('label.month.m_2'),
        t('label.month.m_3'),
        t('label.month.m_4'),
        t('label.month.m_5'),
        t('label.month.m_6'),
        t('label.month.m_7'),
        t('label.month.m_8'),
        t('label.month.m_9'),
        t('label.month.m_10'),
        t('label.month.m_11'),
        t('label.month.m_12'),
    ];
    const data = {
        labels,
        datasets: [
            {
                label: t('home.label.revenue'),
                data: dataTotalAmount.map(item => Math.round(Number(item/1000))),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <ContainerWrapper
            hasScrollView={true}
            isHome={true}
        >
            <View>
                <Text style={[
                    styles.revenueTitleText,
                    (theme === THEME_DARK ? styles.revenueTitleTextDark : {})
                ]}>
                    {t('home.label.revenue_statistics')}
                </Text>
                <View style={styles.selectYear}>
                    <TouchableOpacity
                        style={styles.settingBtn}
                        onPress={() => {
                            setYear(prev => prev - 1)
                        }}
                    >
                        <IonIcon
                            name='md-arrow-back'
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                    </TouchableOpacity>
                    <Text style={[
                        styles.yearText,
                        (theme === THEME_DARK ? styles.yearTextDark : {})
                    ]}>
                        {year}
                    </Text>
                    <TouchableOpacity
                        style={styles.settingBtn}
                        onPress={() => {
                            setYear(prev => prev + 1)
                        }}
                    >
                        <IonIcon
                            name='md-arrow-forward'
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <LineChart
                verticalLabelRotation={30}
                xLabelsOffset={10}
                yLabelsOffset={10}
                data={data}
                width={WINDOW_WIDTH - 40}
                height={240}
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#e8ebfc",
                    backgroundGradientFrom: "#5d4bae",
                    backgroundGradientTo: "#5d4bae",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: "3",
                        strokeWidth: "1",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 9
                }}
            />
            {showEquipmentBlock()}
            {showProjectBlock()}
            {showProductBlock()}
            {showClientBlock()}
            {showEmployeeBlock()}
            {showInvoiceBlock()}
            {showTransportOrderBlock()}
            {showGpsRouteBlock()}
            {showVehicleBlock()}
        </ContainerWrapper>
    )
}
export default HomeRoot;
const styles = StyleSheet.create({
    revenueTitleText: {
        color: DARK_1,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: '500',
        marginBottom:10,
    },
    revenueTitleTextDark: {
        color: LIGHT_1,
    },
    yearText: {
        color: DARK_2,
        fontSize: 18,
        marginHorizontal: 20,
        fontWeight: '600',
    },
    yearTextDark: {
        color: LIGHT_2
    },
    selectYear: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockWrapper: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: LIGHT_2,
        marginVertical: 10,
    },
    blockWrapperDark: {
        backgroundColor: DARK_2,
    },
    itemModule: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    itemModuleTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.
    },
    itemModuleTitleImage: {
        width: 60,
        height: 60
    },
    itemModuleTitleText: {
        fontSize: 14,
        color: DARK_2,
        paddingLeft: 5,
        textTransform: 'uppercase'
    },
    itemModuleTitleTextDark: {
        color: LIGHT_2,
    },
    itemModuleCount: {
        color: DARK_1,
        fontWeight: '500',
        fontSize: 16,
    },
    itemModuleCountDark: {
        color: LIGHT_1
    }
})
