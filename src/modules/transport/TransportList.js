import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_TRANSPORT_EDIT, ROUTE_TRANSPORT_NEW,} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    THEME_DARK,
    TRANSPORT_STATUS_CANCELED, TRANSPORT_STATUS_COMPLETED,
    TRANSPORT_STATUS_WAITING
} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import productApi from '../../api/productApi';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from "react-i18next";
import moment from "moment";
import CheckboxCustom from "../../themes/CheckboxCustom";
import transportApi from "../../api/transportApi";

const TransportList = (props) => {
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
        const res = await productApi.deleteProductById( id);
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

    const onChangeStatus = async (id, status) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('status', status);
        const res = await transportApi.changeStatusTransportById(id,  formData);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                t('transportOrder.label.change_status_success'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            onLoad();
        }
        setLoading(false);
    }

    const showConfirmChangeStatus = (item, status) => {
        Alert.alert(
            t('label.alert').toUpperCase(),
            t('transportOrder.label.confirm_change_status'),
            [
                {
                    text: t('label.ok'),
                    onPress: () => {
                        if (item._id) {
                            onChangeStatus(item._id, status);
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

    const onCreateInvoice = async (id) => {
        setLoading(true);
        const res = await transportApi.createInvoiceById(id);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                t('transportOrder.label.create_invoice_success'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            onLoad();
        }
        setLoading(false);
    }
    const showConfirmCreateInvoice = (item) => {
        Alert.alert(
            t('label.alert').toUpperCase(),
            t('transportOrder.label.confirm_create_invoice'),
            [
                {
                    text: t('label.ok'),
                    onPress: () => {
                        if (item._id) {
                            onCreateInvoice(item._id);
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

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_TRANSPORT_NEW, {
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
                apiNameList={"api/v1/transportOrder/list"}
                renderItem={({item, index}) => {
                    const filePdfId = item?.pdf?.fileId;
                    const linkPdf = filePdfId ? `https://drive.google.com/uc?export=view&id=${filePdfId}` : null;
                    const imageStatus = ['', null, undefined, TRANSPORT_STATUS_WAITING].includes(item.status)
                        ?
                        require('../../assets/images/transport_waiting.png')
                        :
                        item.status === TRANSPORT_STATUS_COMPLETED
                    ?
                        require('../../assets/images/transport_completed.png')
                            :
                            require('../../assets/images/transport_canceled.png');

                    const addressDescription = item.clientAddress?.description ?? '';

                    let amountTotal = 0;
                    if (Array.isArray(item.products)) {
                        item.products.forEach((itemP, indexP) => {
                            amountTotal += Number((itemP.price ?? 0)) * Number(itemP.amount);
                        })
                    }
                    return (
                        <ItemWithExpanded
                            renderItem={
                                <View style={[
                                    styles.rowView,
                                    (theme === THEME_DARK ? styles.rowViewDark : {})
                                ]}>
                                    <View style={styles.imageStatusCell}>
                                        <Image
                                            source={imageStatus}
                                            style={styles.imageStatus}
                                        />
                                    </View>
                                    <View style={styles.cellView}>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {})
                                        ]}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    <View style={styles.cellAction}>
                                        {
                                            item.invoice &&
                                                    <TouchableOpacity
                                                    style={styles.changeStatus}
                                                    onPress={() => {
                                                        // showConfirmChangeStatus(item, INVOICE_STATUS_ACCEPTED)
                                                    }}
                                                >
                                                    <Image
                                                        source={require('../../assets/images/invoice.png')}
                                                        style={styles.changeStatusImage}
                                                    />
                                                </TouchableOpacity>
                                        }
                                        {
                                            item.status !== TRANSPORT_STATUS_COMPLETED &&
                                            <>
                                                <TouchableOpacity
                                                    style={styles.cellBtn}
                                                    onPress={() => {
                                                        navigation.navigate(ROUTE_TRANSPORT_EDIT, {
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
                                            </>
                                        }
                                    </View>
                                </View>
                            }
                            renderItemExpanded={
                                <>
                                    <ViewItem
                                        label={t('transportOrder.field.title')}
                                        view={item.title}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.expectedDepartAt')}
                                        view={item.expectedDepartAt ? moment(item.expectedDepartAt).format('LLL') : ''}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.expectedArrivalAt')}
                                        view={item.expectedArrivalAt ? moment(item.expectedArrivalAt).format('LLL') : ''}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.departAt')}
                                        view={item.departAt ? moment(item.departAt).format('LLL') : ''}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.arrivalAt')}
                                        view={item.arrivalAt ? moment(item.arrivalAt).format('LLL') : ''}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.status')}
                                        view={
                                            <Image
                                                source={imageStatus}
                                                style={styles.imageStatus}
                                            />
                                        }
                                        isViewComponent={true}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.project')}
                                        view={item.project?.name ?? ''}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.client')}
                                        view={item.client?.name ?? ''}
                                    />
                                    <CheckboxCustom
                                        value={!!item?.addInfoClient}
                                        label={t('transportOrder.field.addInfoClient')}
                                        disabled={true}
                                    />
                                    <ViewItem
                                        label={t('transportOrder.field.invoice')}
                                        view={item.invoice?.title ?? ""}
                                    />
                                    {
                                        item?.addInfoClient &&
                                        <>
                                            <ViewItem
                                                label={t('transportOrder.field.clientName')}
                                                view={item.clientName}
                                            />
                                            <ViewItem
                                                label={t('transportOrder.field.clientDescription')}
                                                view={item.clientDescription}
                                            />
                                            <ViewItem
                                                label={t('invoice.field.clientDescription')}
                                                view={item.clientDescription}
                                            />
                                            <ViewItem
                                                label={t('field.address_province')}
                                                view={item.clientAddress?.province?.name ?? ""}
                                            />
                                            <ViewItem
                                                label={t('field.address_district')}
                                                view={item.clientAddress?.district?.name ?? ""}
                                            />
                                            <ViewItem
                                                label={t('field.address_ward')}
                                                view={item.clientAddress?.ward?.name ?? ""}
                                            />
                                            <ViewItem
                                                label={t('field.address_description')}
                                                view={addressDescription}
                                            />
                                        </>
                                    }
                                    <ViewItem
                                        label={t('transportOrder.field.comment')}
                                        view={item.comment}
                                    />
                                    <View style={styles.listEquipmentWrapper}>
                                        <Text style={[
                                            styles.listEquipmentTitle,
                                            (theme === THEME_DARK ? styles.listEquipmentTitleDark : {})
                                        ]}>
                                            {t('transportOrder.label.listProduct')}
                                        </Text>
                                        {Array.isArray(item.products) && <View style={styles.listEquipment}>
                                            {
                                                item.products.map((item, index) => {
                                                    const fileEId = item?.product?.logo?.fileId;
                                                    const linkImageE = fileEId ? `https://drive.google.com/uc?export=view&id=${fileEId}` : null;
                                                    return (
                                                        <View style={[
                                                            styles.itemEquipment,
                                                            (theme === THEME_DARK ? styles.itemEquipmentDark : {})
                                                        ]}>
                                                            {linkImageE && <Image
                                                                source={{
                                                                    uri: linkImageE
                                                                }}
                                                                style={styles.eImage}
                                                            />}
                                                            <View style={styles.itemEcell}>
                                                                <Text style={[
                                                                    styles.itemEcellText,
                                                                    (theme === THEME_DARK ? styles.itemEcellTextDark : {})
                                                                ]}>
                                                                    {item.product?.name}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.itemEcell}>
                                                                <Text style={[
                                                                    styles.itemEcellText,
                                                                    (theme === THEME_DARK ? styles.itemEcellTextDark : {})
                                                                ]}>
                                                                    {item.price}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.itemEcell}>
                                                                <Text style={[
                                                                    styles.itemEcellText,
                                                                    (theme === THEME_DARK ? styles.itemEcellTextDark : {})
                                                                ]}>
                                                                    {item.amount}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>}
                                        <View style={[
                                            styles.amountTotal,
                                            (theme === THEME_DARK ? styles.amountTotalDark : {}),
                                        ]}>
                                            <Text style={[
                                                styles.amountTotalText,
                                                (theme === THEME_DARK ? styles.amountTotalTextDark : {}),
                                            ]}>
                                                {amountTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.changeStatusAction}>
                                        {
                                            item.status
                                            ?
                                                item.status === TRANSPORT_STATUS_COMPLETED
                                                ?
                                                    <>
                                                    {!item.invoice && <TouchableOpacity
                                                            style={styles.changeStatusWithText}
                                                            onPress={() => {
                                                                showConfirmCreateInvoice(item)
                                                            }}
                                                        >
                                                            <View
                                                                style={styles.changeStatus}
                                                            >
                                                                <IonIcon
                                                                    name='ios-arrow-forward'
                                                                    size={18}
                                                                    color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                                                />
                                                                <Image
                                                                    source={require('../../assets/images/invoice.png')}
                                                                    style={styles.changeStatusImage}
                                                                />
                                                            </View>
                                                            <Text style={[
                                                                styles.changeStatusText,
                                                                (theme === THEME_DARK ? styles.changeStatusTextDark : {})
                                                            ]}>
                                                                {t('transportOrder.label.createInvoice')}
                                                            </Text>
                                                        </TouchableOpacity>}
                                                    </>
                                                    :
                                                <>
                                                {
                                                    item.status !== TRANSPORT_STATUS_COMPLETED &&
                                                    <TouchableOpacity
                                                        style={styles.changeStatus}
                                                        onPress={() => {
                                                            showConfirmChangeStatus(item, TRANSPORT_STATUS_COMPLETED)
                                                        }}
                                                    >
                                                        <IonIcon
                                                            name='ios-arrow-forward'
                                                            size={18}
                                                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                                        />
                                                        <Image
                                                            source={require('../../assets/images/transport_completed.png')}
                                                            style={styles.changeStatusImage}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                                    {/*{*/}
                                                    {/*    item.status !== TRANSPORT_STATUS_CANCELED &&*/}
                                                    {/*    <TouchableOpacity*/}
                                                    {/*        style={styles.changeStatus}*/}
                                                    {/*        onPress={() => {*/}
                                                    {/*            showConfirmChangeStatus(item, TRANSPORT_STATUS_CANCELED)*/}
                                                    {/*        }}*/}
                                                    {/*    >*/}
                                                    {/*        <IonIcon*/}
                                                    {/*            name='ios-arrow-forward'*/}
                                                    {/*            size={18}*/}
                                                    {/*            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}*/}
                                                    {/*        />*/}
                                                    {/*        <Image*/}
                                                    {/*            source={require('../../assets/images/transport_canceled.png')}*/}
                                                    {/*            style={styles.changeStatusImage}*/}
                                                    {/*        />*/}
                                                    {/*    </TouchableOpacity>*/}
                                                    {/*}*/}
                                                    {
                                                        item.status !== TRANSPORT_STATUS_WAITING &&
                                                        <TouchableOpacity
                                                            style={styles.changeStatus}
                                                            onPress={() => {
                                                                showConfirmChangeStatus(item, TRANSPORT_STATUS_WAITING)
                                                            }}
                                                        >
                                                            <IonIcon
                                                                name='ios-arrow-forward'
                                                                size={18}
                                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                                            />
                                                            <Image
                                                                source={require('../../assets/images/transport_waiting.png')}
                                                                style={styles.changeStatusImage}
                                                            />
                                                        </TouchableOpacity>
                                                    }
                                                </>
                                                :
                                                <>
                                                </>
                                        }
                                    </View>
                                </>
                            }
                        />
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default TransportList;
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
        padding: 5,
    },
    changeStatusWithText: {
        alignItems: 'center'
    },
    changeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    changeStatusImage: {
        height: 30,
        width: 30,
    },
    changeStatusText: {
        color: DARK_2,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    changeStatusTextDark: {
        color: LIGHT_2
    },
    imageStatusCell: {

    },
    imageStatus: {
        height: 30,
        width: 30,
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
    listEquipmentWrapper: {

    },
    listEquipmentTitle: {
        color: DARK_1,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    listEquipmentTitleDark: {
        color: LIGHT_1,
    },
    listEquipment: {

    },
    itemEquipment: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: DARK_2,
        borderStyle: 'dashed'
    },
    itemEquipmentDark: {
        borderBottomColor: LIGHT_2,
    },
    eImage: {
        width: 40,borderRadius: 20,
        height: 40,
    },
    itemEcell: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemEcellText: {
        color: DARK_1,
    },
    itemEcellTextDark: {
        color: LIGHT_1,
    },
    amountTotal: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: DARK_2,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    amountTotalDark: {
        borderTopColor: LIGHT_2,
    },
    amountTotalText: {
        color: DARK_1,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    amountTotalTextDark: {
        color: LIGHT_1,
    },
    changeStatusAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})
