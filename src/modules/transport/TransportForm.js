import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW, THEME_DARK} from '../../utils/constants';
import productApi from '../../api/productApi';
import SelectCustom from "../../themes/SelectCustom";
import moment from "moment";
import projectApi from "../../api/projectApi";
import clientApi from "../../api/clientApi";
import DatePickerCustom from "../../themes/DatePickerCustom";
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from "../../utils/colors";
import IonIcon from "react-native-vector-icons/Ionicons";
import AddressForm from "../../themes/AddressForm";
import CheckboxCustom from "../../themes/CheckboxCustom";
import transportApi from "../../api/transportApi";
import {useTranslation} from "react-i18next";

const dataInitial = {
    title: '',
    expectedDepartAt: null,
    expectedArrivalAt: null,
    departAt: null,
    arrivalAt: null,
    status: '',
    project: '',
    client: '',
    clientName: '',
    clientPhoneNumber: '',
    clientDescription: '',
    clientAddress_address_description: '',
    clientAddress_address_city: '',
    clientAddress_address_country: '',
    clientAddress_address_postalCode: '',
    clientAddress_address_province: '',
    clientAddress_address_district: '',
    clientAddress_address_ward: '',
    comment: '',
    products: [],
    addInfoClient: false,
}
const TransportForm = (props) => {
    const {
        setLoading,
        theme,
    } = useContext(AppContext);
    const {
        dataInit,
        navigation,
        onLoad
    } = props;
    const {t} = useTranslation();

    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getDataProjects();
        getDataClients();
        getDataProducts();
    }, [])
    const getDataProjects = async () => {
        let res = await projectApi.getAllProject();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setProjects(resData)
        }
    }
    const getDataClients = async () => {
        let res = await clientApi.getAllClient();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setClients(resData)
        }
    }
    const getDataProducts = async () => {
        let res = await productApi.getAllProduct();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setProducts(resData)
        }
    }


    const [dataForm, setDataForm] = useState(() => {
        if (dataInit) {
            return ({
                ...dataInitial,
                ...dataInit,
                client: dataInit.client?._id ?? '',
                project: dataInit.project?._id ?? '',
                clientAddress_address_description: dataInit.clientAddress?.description,
                clientAddress_address_city: dataInit.clientAddress?.city,
                clientAddress_address_country: dataInit.clientAddress?.country,
                clientAddress_address_postalCode: dataInit.clientAddress?.postalCode,
                clientAddress_address_province: dataInit.clientAddress?.province?._id ?? '',
                clientAddress_address_district: dataInit.clientAddress?.district?._id ?? '',
                clientAddress_address_ward: dataInit.clientAddress?.ward?._id ?? '',
                products: Array.isArray(dataInit.products) ? dataInit.products.map(item => ({
                    ...item,
                    product: item.product ? item.product._id: '',
                })) : []
            })
        }
        return ({...dataInitial})
    });
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;


    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', dataForm.title);
        formData.append('expectedDepartAt', dataForm.expectedDepartAt ? moment(dataForm.expectedDepartAt).toISOString() :'');
        formData.append('expectedArrivalAt', dataForm.expectedArrivalAt ? moment(dataForm.expectedArrivalAt).toISOString() :'');
        formData.append('departAt', dataForm.departAt ? moment(dataForm.departAt).toISOString() :'');
        formData.append('arrivalAt', dataForm.arrivalAt ? moment(dataForm.arrivalAt).toISOString() :'');
        formData.append('project', dataForm.project ?? "");
        formData.append('client', dataForm.client ?? "");
        formData.append('clientName', dataForm.clientName);
        formData.append('clientPhoneNumber', dataForm.clientPhoneNumber);
        formData.append('clientDescription', dataForm.clientDescription);
        formData.append('clientAddress_address_description', dataForm.clientAddress_address_description);
        formData.append('clientAddress_address_city', dataForm.clientAddress_address_city);
        formData.append('clientAddress_address_country', dataForm.clientAddress_address_country);
        formData.append('clientAddress_address_postalCode', dataForm.clientAddress_address_postalCode);
        formData.append('addInfoClient', !!dataForm.addInfoClient);
        formData.append('clientAddress_address_province', dataForm.clientAddress_address_province ?? "");
        formData.append('clientAddress_address_district', dataForm.clientAddress_address_district ?? "");
        formData.append('clientAddress_address_ward', dataForm.clientAddress_address_ward ?? "");
        formData.append('comment', dataForm.comment);

        if (Array.isArray(dataForm.products)) {
            formData.append('products', JSON.stringify(dataForm.products));
        }
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await transportApi.editTransportById(editId, formData);
            if (res.status === 200) {
                ToastAndroid.showWithGravity(
                    t('label.edit_success'),
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                onLoad();
                navigation.goBack();
            }
        } else {
            const res = await transportApi.createTransport(formData);
            if (res.status === 200) {
                ToastAndroid.showWithGravity(
                    t('label.new_success'),
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                onLoad();
                navigation.goBack();
            }
        }
        setLoading(false);
    }


    let amountTotal = 0;
    if (Array.isArray(dataForm.products)) {
        dataForm.products.forEach((itemP, indexP) => {
            amountTotal += Number((itemP.price ?? 0)) * Number(itemP.amount);
        })
    }
    return (
        <View
            style={styles.container}
        >
            <FormItem
                label={t('transportOrder.field.title')}
                input={
                    <Input
                        value={dataForm?.title}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                title: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.expectedDepartAt')}
                input={
                    <DatePickerCustom
                        date={dataForm?.expectedDepartAt ? new Date(dataForm?.expectedDepartAt) : null}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                expectedDepartAt: date
                            }))
                        }}
                        mode="datetime"
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.expectedArrivalAt')}
                input={
                    <DatePickerCustom
                        date={dataForm?.expectedArrivalAt ? new Date(dataForm?.expectedArrivalAt) : null}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                expectedArrivalAt: date
                            }))
                        }}
                        mode="datetime"
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.departAt')}
                input={
                    <DatePickerCustom
                        date={dataForm?.departAt ? new Date(dataForm?.departAt) : null}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                departAt: date
                            }))
                        }}
                        mode="datetime"
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.arrivalAt')}
                input={
                    <DatePickerCustom
                        date={dataForm?.arrivalAt ? new Date(dataForm?.arrivalAt) : null}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                arrivalAt: date
                            }))
                        }}
                        mode="datetime"
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.project')}
                input={
                    <SelectCustom
                        value={dataForm?.project ?? ''}
                        options={projects.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.name
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                project: value
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('transportOrder.field.client')}
                input={
                    <SelectCustom
                        value={dataForm?.client ?? ''}
                        options={clients.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.name
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                client: value
                            }))
                        }}
                    />
                }
            />
            <CheckboxCustom
                value={!!dataForm?.addInfoClient}
                onChange={(checked) => {
                    setDataForm(prev => ({
                        ...prev,
                        addInfoClient: checked
                    }))
                }}
                label={t('transportOrder.field.addInfoClient')}
            />
            {
                dataForm?.addInfoClient &&
                <>
                    <FormItem
                        label={t('transportOrder.field.clientName')}
                        input={
                            <Input
                                value={dataForm?.clientName}
                                onChangeText={(text) => {
                                    setDataForm(prev => ({
                                        ...prev,
                                        clientName: text
                                    }))
                                }}
                            />
                        }
                    />
                    <FormItem
                        label={t('invoice.field.clientPhoneNumber')}
                        input={
                            <Input
                                value={dataForm?.clientPhoneNumber}
                                onChangeText={(text) => {
                                    setDataForm(prev => ({
                                        ...prev,
                                        clientPhoneNumber: text
                                    }))
                                }}
                            />
                        }
                    />
                    <FormItem
                        label={t('transportOrder.field.clientDescription')}
                        input={
                            <Input
                                value={dataForm?.clientDescription}
                                onChangeText={(text) => {
                                    setDataForm(prev => ({
                                        ...prev,
                                        clientDescription: text
                                    }))
                                }}
                                multiline={true}
                            />
                        }
                    />
                    <AddressForm
                        dataInitial={{
                            province: dataForm?.clientAddress_address_province ?? null,
                            district: dataForm?.clientAddress_address_district ?? null,
                            ward: dataForm?.clientAddress_address_ward ?? null,
                            description: dataForm?.clientAddress_address_description ?? "",
                        }}
                        onChangeProvince={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                clientAddress_address_province: value
                            }))
                        }}
                        onChangeDistrict={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                clientAddress_address_district: value
                            }))
                        }}
                        onChangeWard={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                clientAddress_address_ward: value
                            }))
                        }}
                        onChangeDescription={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                clientAddress_address_description: value
                            }))
                        }}
                    />
                </>
            }
            <FormItem
                label={t('transportOrder.field.comment')}
                input={
                    <Input
                        value={dataForm?.comment}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                comment: text
                            }))
                        }}
                        multiline={true}
                    />
                }
            />
            <View style={styles.listProductWrapper}>
                <Text style={[
                    styles.listProductTitle,
                    (theme === THEME_DARK ? styles.listProductTitleDark : {}),
                ]}>
                    {t('transportOrder.label.listProduct')}
                </Text>
                <FlatList
                    style={styles.listProduct}
                    data={Array.isArray(dataForm.products) ? dataForm.products : []}
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.itemProduct}>
                                <View style={styles.itemCellView}>
                                    <View style={styles.itemCell1}>
                                        <SelectCustom
                                            value={item.product ?? ''}
                                            options={products.map((item, index) => {
                                                return ({
                                                    value: item._id,
                                                    label: item.name
                                                })
                                            })}
                                            onChange={(value) => {
                                                setDataForm(prev => ({
                                                    ...prev,
                                                    products: prev.products.map((itemP, indexP) => {
                                                        if (index === indexP) {
                                                            const dataPro = products.find(itemA => itemA._id === value);
                                                            return ({
                                                                ...itemP,
                                                                product: value,
                                                                ...(dataPro ? {
                                                                    price: dataPro.price
                                                                } : {})
                                                            })
                                                        } else {
                                                            return itemP;
                                                        }
                                                    })
                                                }))
                                            }}
                                        />
                                    </View>
                                    <View style={styles.itemCell2}>
                                        <Input
                                            value={(item.price ?? "").toString()}
                                            keyboardType='numeric'
                                            editable={false}
                                            placeholder={t('transportOrder.field.price')}
                                        />
                                    </View>
                                    <View style={styles.itemCell2}>
                                        <Input
                                            value={(item.amount ?? "").toString()}
                                            onChangeText={(text) => {
                                                setDataForm(prev => ({
                                                    ...prev,
                                                    products: prev.products.map((itemP, indexP) => {
                                                        if (index === indexP) {
                                                            return ({
                                                                ...itemP,
                                                                amount: text
                                                            })
                                                        } else {
                                                            return itemP;
                                                        }
                                                    })
                                                }))
                                            }}
                                            keyboardType='numeric'
                                            placeholder={t('transportOrder.field.amount')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.itemCellAction}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDataForm(prev => ({
                                                ...prev,
                                                products: prev.products.filter((itemP, indexP) => {
                                                    return !(index === indexP)
                                                })
                                            }))
                                        }}
                                    >
                                        <IonIcon
                                            name="close"
                                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        setDataForm(prev => ({
                            ...prev,
                            products: [
                                ...(Array.isArray(prev.products) ? prev.products : []),
                                {
                                    product: '',
                                    amount: '',
                                    price: '',
                                }
                            ]
                        }))
                    }}
                >
                    <IonIcon
                        name="add-circle"
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        size={30}
                    />
                </TouchableOpacity>
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
            <ButtonCustom
                text={t('label.save')}
                onPress={() => {
                    onSave();
                }}
            />
        </View>
    )
}
export default TransportForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    logoWrapper: {
        alignItems: 'center'
    },
    listProductWrapper: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    listProduct: {
        paddingVertical: 5,
        width: '100%',
    },
    listProductTitle: {
        color: DARK_1,
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    listProductTitleDark: {
        color: LIGHT_1,
    },
    itemProduct: {
        flexDirection: 'row',
        width: '100%',
    },
    itemCellView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    itemCell1: {
        width: '100%',
        padding: 5,
    },
    itemCell2: {
        width: '50%',
        padding: 5,
    },
    itemCellAction: {
        paddingHorizontal: 5,
        justifyContent: 'center',
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
