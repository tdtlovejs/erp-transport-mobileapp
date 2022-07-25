import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_INVOICE_EDIT, ROUTE_INVOICE_NEW} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {INVOICE_STATUS_ACCEPTED, THEME_DARK} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import moment from 'moment';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from "react-i18next";
import CheckboxCustom from "../../themes/CheckboxCustom";
import invoiceApi from "../../api/invoiceApi";
import RNFetchBlob from "rn-fetch-blob";

const InvoiceList = (props) => {
    const {
        theme,
        setLoading,
        setPdfLink,
    } = useContext(AppContext);
    const {
        navigation,
        pdfLink,
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
        const res = await invoiceApi.deleteInvoiceById( id);
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
        const res = await invoiceApi.changeStatusInvoiceById(id,  formData);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                t('invoice.label.change_status_success'),
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
            t('invoice.label.confirm_change_status'),
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

    const onExportPdf = async (id) => {
        setLoading(true);
        const res = await invoiceApi.exportPdfInvoiceById(id);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                t('invoice.label.export_pdf_success'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            onLoad();
        }
        setLoading(false);
    }
    const showConfirmExportPdf = (item) => {
        Alert.alert(
            t('label.alert').toUpperCase(),
            t('invoice.label.confirm_export_pdf'),
            [
                {
                    text: t('label.ok'),
                    onPress: () => {
                        if (item._id) {
                            onExportPdf(item._id);
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

    const downloadInvoicePdf = async (linkPdf, fileName) => {
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: RNFetchBlob.fs.dirs.DCIMDir + "/transportapp/" + fileName,
                description: 'Đang tải hóa đơn'
            }
        }
        try {
            await RNFetchBlob.config(options).fetch('GET', linkPdf)
        } catch (e) {
        }
    }

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_INVOICE_NEW, {
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
                apiNameList={"api/v1/invoice/list"}
                renderItem={({item, index}) => {
                    const filePdfId = item?.pdf?.fileId;
                    const linkPdf = filePdfId ? `https://drive.google.com/uc?export=view&id=${filePdfId}` : null;
                    const imageStatus = item.status === INVOICE_STATUS_ACCEPTED ? require('../../assets/images/invoice_validated.png') : require('../../assets/images/invoice_draft.png')

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
                                        {item.status !== INVOICE_STATUS_ACCEPTED ?
                                            <>
                                                <TouchableOpacity
                                                    style={styles.changeStatus}
                                                    onPress={() => {
                                                        showConfirmChangeStatus(item, INVOICE_STATUS_ACCEPTED)
                                                    }}
                                                >
                                                    <IonIcon
                                                        name='ios-arrow-forward'
                                                        size={18}
                                                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                                    />
                                                    <Image
                                                        source={require('../../assets/images/invoice_validated.png')}
                                                        style={styles.changeStatusImage}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.cellBtn}
                                                    onPress={() => {
                                                        navigation.navigate(ROUTE_INVOICE_EDIT, {
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
                                            </>
                                            :
                                            <>
                                                {
                                                    linkPdf
                                                        ?
                                                        <TouchableOpacity
                                                            style={styles.changeStatus}
                                                            onPress={() => {
                                                                // setPdfLink(linkPdf)
                                                                downloadInvoicePdf(linkPdf, "invoice_"+ item._id + ".pdf")
                                                            }}
                                                        >
                                                            <Image
                                                                source={require('../../assets/images/download_pdf.png')}
                                                                style={styles.changeStatusImage}
                                                            />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            style={styles.changeStatus}
                                                            onPress={() => {
                                                                showConfirmExportPdf(item)
                                                            }}
                                                        >
                                                            <IonIcon
                                                                name='ios-arrow-forward'
                                                                size={18}
                                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                                            />
                                                            <Image
                                                                source={require('../../assets/images/pdf.png')}
                                                                style={styles.changeStatusImage}
                                                            />
                                                        </TouchableOpacity>
                                                }
                                            </>
                                        }
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
                                        label={t('invoice.field.title')}
                                        view={item.title}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.note')}
                                        view={item.note}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.exportDate')}
                                        view={item.exportDate ? moment(item.exportDate).format('LL') : ''}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.expiryDate')}
                                        view={item.expiryDate ? moment(item.expiryDate).format('LL') : ''}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.status')}
                                        view={
                                            <Image
                                                source={imageStatus}
                                                style={styles.imageStatus}
                                            />
                                        }
                                        isViewComponent={true}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.project')}
                                        view={item.project?.name ?? ''}
                                    />
                                    <ViewItem
                                        label={t('invoice.field.client')}
                                        view={item.client?.name ?? ''}
                                    />
                                    <CheckboxCustom
                                        value={!!item?.addInfoClient}
                                        label={t('invoice.field.addInfoClient')}
                                        disabled={true}
                                    />
                                    {
                                        item?.addInfoClient &&
                                        <>
                                            <ViewItem
                                                label={t('invoice.field.clientName')}
                                                view={item.clientName}
                                            />
                                            <ViewItem
                                                label={t('invoice.field.clientPhoneNumber')}
                                                view={item.clientPhoneNumber}
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
                                        label="comment"
                                        view={item.comment}
                                    />
                                    <View style={styles.listEquipmentWrapper}>
                                        <Text style={[
                                            styles.listEquipmentTitle,
                                            (theme === THEME_DARK ? styles.listEquipmentTitleDark : {})
                                        ]}>
                                            {t('invoice.label.listProduct')}
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
                                </>
                            }
                        />
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default InvoiceList;
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
    changeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeStatusImage: {
        height: 30,
        width: 30,
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
    }
})
