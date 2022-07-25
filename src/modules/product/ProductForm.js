import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW} from '../../utils/constants';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import productTypeApi from '../../api/productTypeApi';
import productApi from '../../api/productApi';
import SelectCustom from "../../themes/SelectCustom";
import moment from "moment";
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: '',
    price: '',
    vat: '',
    type: '',
    unit: '',
    logo: '',
}
const ProductForm = (props) => {
    const {
        setLoading
    } = useContext(AppContext);
    const {
        dataInit,
        navigation,
        onLoad
    } = props;
    const {t} = useTranslation();
    const [logoUrl, setLogoUrl] = useState(() => {
        if (dataInit) {
            const fileId = dataInit?.logo?.fileId;
            return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
        }
        return null;
    });
    const [dataForm, setDataForm] = useState(() => {
        if (dataInit) {
            return ({
                ...dataInitial,
                ...dataInit,
                logo: '',
                type: dataInit.type?._id ?? '',
            })
        }
        return ({...dataInitial})
    });
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;
    const [productTypes, setProductTypes] = useState([]);
    useEffect(() => {
        getProductTypes();
    }, [])
    const getProductTypes = async () => {
        let res = await productTypeApi.getAllProductType();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setProductTypes(resData)
        }
    }
    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('code', dataForm.code);
        formData.append('price', dataForm.price);
        // formData.append('vat', dataForm.vat);
        formData.append('type', dataForm.type ?? "");
        formData.append('unit', dataForm.unit);
        formData.append('logo', dataForm.logo ? dataForm.logo : dataInit?.logo?._id ?? null);
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await productApi.editProductById(editId, formData);
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
            const res = await productApi.createProduct(formData);
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
    return (
        <>
            <View style={styles.logoWrapper}>
                <ImagePickerCustom
                    uri={dataForm?.logo?.uri || logoUrl}
                    onChangeImage={(image) => {
                        setDataForm(prev => ({
                            ...prev,
                            logo: image
                        }))
                    }}
                />
            </View>
            <FormItem
                label={t('field.name')}
                input={
                    <Input
                        value={dataForm?.name}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                name: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('field.code')}
                input={
                    <Input
                        value={dataForm?.code}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                code: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('product.field.price') + " (VND)"}
                input={
                    <Input
                        value={(dataForm?.price ?? "").toString()}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                price: text
                            }))
                        }}
                        keyboardType='numeric'
                    />
                }
            />
            <FormItem
                label={t('product.field.unit')}
                input={
                    <Input
                        value={dataForm?.unit}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                unit: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('product.field.type')}
                input={
                    <SelectCustom
                        value={dataForm?.type ?? ''}
                        options={productTypes.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.name
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                type: value
                            }))
                        }}
                    />
                }
            />
            <ButtonCustom
                text={t('label.save')}
                onPress={() => {
                    onSave();
                }}
            />
        </>
    )
}
export default ProductForm;
const styles = StyleSheet.create({
    logoWrapper: {
        alignItems: 'center'
    },
})
