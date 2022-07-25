import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW, CLIENT_TYPE_ORGANIZATION, CLIENT_TYPE_PERSONAL} from '../../utils/constants';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import personApi from '../../api/personApi';
import clientApi from '../../api/clientApi';
import SelectCustom from '../../themes/SelectCustom';
import {useTranslation} from 'react-i18next';
import CheckboxCustom from "../../themes/CheckboxCustom";
import moment from "moment";
import AddressForm from "../../themes/AddressForm";

const dataInitial = {
    name: '',
    code: '',
    prospective: true,
    manager: '',
    address_description: '',
    address_city: '',
    address_country: '',
    address_postalCode: '',
    address_province: '',
    address_district: '',
    address_ward: '',
    type: CLIENT_TYPE_ORGANIZATION,
    logo: '',
}
const ClientForm = (props) => {
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
    const [managers, setManagers] = useState([]);
    useEffect(() => {
        getManagers();
    }, [])
    const getManagers = async () => {
        let res = await personApi.getAllPerson({all: 1});
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            });
            setManagers(resData)
        }
    }
    const [dataForm, setDataForm] = useState(() => {
        if (dataInit) {
            const fileId = dataInit?.logo?.fileId;
            return ({
                ...dataInitial,
                ...dataInit,
                logo: '',
                manager: dataInit.manager?._id ?? '',
                address_description: dataInit.address?.description,
                address_city: dataInit.address?.city,
                address_country: dataInit.address?.country,
                address_postalCode: dataInit.address?.postalCode,
                address_province: dataInit.address?.province?._id ?? "",
                address_district: dataInit.address?.district?._id ?? "",
                address_ward: dataInit.address?.ward?._id ?? "",
            })
        }
        return ({...dataInitial})
    });
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;

    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('code', dataForm.code);
        formData.append('phoneNumber', dataForm.phoneNumber);
        formData.append('prospective', !!dataForm.prospective);
        formData.append('manager', dataForm.manager ?? "");
        formData.append('type', dataForm.type ?? "");
        formData.append('address_description', dataForm.address_description);
        formData.append('address_city', dataForm.address_city);
        formData.append('address_country', dataForm.address_country);
        formData.append('address_postalCode', dataForm.address_postalCode);
        formData.append('address_province', dataForm.address_province ?? "");
        formData.append('address_district', dataForm.address_district ?? "");
        formData.append('address_ward', dataForm.address_ward ?? "");
        formData.append('logo', dataForm.logo ? dataForm.logo : dataInit?.logo?._id ?? '');
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await clientApi.editClientById(editId, formData);
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
            const res = await clientApi.createClient(formData)
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
        <View
            style={styles.container}
        >
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
                label={t('client.field.phoneNumber')}
                input={
                    <Input
                        value={dataForm?.phoneNumber}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                phoneNumber: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                icon={require('../../assets/images/prospective.png')}
                input={
                    <CheckboxCustom
                        value={!!dataForm?.prospective}
                        onChange={(checked) => {
                            setDataForm(prev => ({
                                ...prev,
                                prospective: checked
                            }))
                        }}
                        label={t('client.field.prospective')}
                    />
                }
            />
            <FormItem
                label={t('client.field.manager')}
                input={
                    <SelectCustom
                        value={dataForm?.manager ?? ''}
                        options={managers.map((item, index) => ({
                            value: item._id,
                            label: item.firstName + " " + item.lastName
                        }))}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                manager: value
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('client.field.type')}
                input={
                    <SelectCustom
                        notSelectLabel={true}
                        value={dataForm?.type ?? null}
                        options={[
                            {
                                value: CLIENT_TYPE_PERSONAL,
                                label: t('client.field.type_personal')
                            },
                            {
                                value: CLIENT_TYPE_ORGANIZATION,
                                label: t('client.field.type_organization')
                            }
                        ]}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                type: value
                            }))
                        }}
                    />
                }
            />
            <AddressForm
                dataInitial={{
                    province: dataForm?.address_province ? dataForm?.address_province  :  "",
                    district: dataForm?.address_district ? dataForm?.address_district :  "",
                    ward: dataForm?.address_ward ? dataForm?.address_ward :  "",
                    description: dataForm?.address_description ?? "",
                }}
                onChangeProvince={(value) => {
                    setDataForm(prev => ({
                        ...prev,
                        address_province: value
                    }))
                }}
                onChangeDistrict={(value) => {
                    setDataForm(prev => ({
                        ...prev,
                        address_district: value
                    }))
                }}
                onChangeWard={(value) => {
                    setDataForm(prev => ({
                        ...prev,
                        address_ward: value
                    }))
                }}
                onChangeDescription={(value) => {
                    setDataForm(prev => ({
                        ...prev,
                        address_description: value
                    }))
                }}
            />
            <ButtonCustom
                text={t('label.save')}
                onPress={() => {
                    onSave();
                }}
            />
        </View>
    )
}
export default ClientForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    logoWrapper: {
        alignItems: 'center'
    },
})
