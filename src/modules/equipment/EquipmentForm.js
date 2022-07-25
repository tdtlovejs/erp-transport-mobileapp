import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW} from '../../utils/constants';
import equipmentTypeApi from '../../api/equipmentTypeApi';
import equipmentApi from '../../api/equipmentApi';
import DatePickerCustom from '../../themes/DatePickerCustom';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import moment from 'moment';
import SelectCustom from "../../themes/SelectCustom";
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: '',
    description: '',
    serialNumber: '',
    mark: '',
    model: '',
    version: '',
    purchaseDate: null,
    transferDate: null,
    lossDate: null,
    maintenanceDate: null,
    type: '',
    logo: null,
}
const EquipmentForm = (props) => {
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
                type: dataInit?.type?._id ?? "",
                logo: '',
            })
        }
        return ({...dataInitial})
    });
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    useEffect(() => {
        getEquipmentTypes();
    }, [])
    const getEquipmentTypes = async () => {
        let res = await equipmentTypeApi.getAllEquipmentType();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setEquipmentTypes(resData)
        }
    }
    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('code', dataForm.code);
        formData.append('description', dataForm.description);
        formData.append('serialNumber', dataForm.serialNumber);
        formData.append('mark', dataForm.mark);
        formData.append('unit', dataForm.unit);
        formData.append('model', dataForm.model);
        formData.append('version', dataForm.version);
        formData.append('purchaseDate', dataForm.purchaseDate ? moment(dataForm.purchaseDate).format('YYYY-MM-DD') :'');
        formData.append('transferDate', dataForm.transferDate ? moment(dataForm.transferDate).format('YYYY-MM-DD') :'');
        formData.append('lossDate', dataForm.lossDate ? moment(dataForm.lossDate).format('YYYY-MM-DD') :'');
        formData.append('maintenanceDate', dataForm.maintenanceDate ? moment(dataForm.maintenanceDate).format('YYYY-MM-DD') :'');
        formData.append('type', dataForm.type ?? "");
        formData.append('logo', dataForm.logo ? dataForm.logo : dataInit?.logo?._id ?? '');
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await equipmentApi.editEquipmentById(editId, formData);
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
            const res = await equipmentApi.createEquipment(formData);
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
    console.log(dataForm)
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
                label={t('field.description')}
                input={
                    <Input
                        value={dataForm?.description}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                description: text
                            }))
                        }}
                        multiline={true}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.serialNumber')}
                input={
                    <Input
                        value={dataForm?.serialNumber}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                serialNumber: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.mark')}
                input={
                    <Input
                        value={dataForm?.mark}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                mark: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.model')}
                input={
                    <Input
                        value={dataForm?.model}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                model: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.version')}
                input={
                    <Input
                        value={dataForm?.version}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                version: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.purchaseDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.purchaseDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                purchaseDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.transferDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.transferDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                transferDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.lossDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.lossDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                lossDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.maintenanceDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.maintenanceDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                maintenanceDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('equipment.field.type')}
                input={
                    <SelectCustom
                        // notSelectLabel={true}
                        value={dataForm?.type ?? ''}
                        options={equipmentTypes.map((item, index) => {
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
        </View>
    )
}
export default EquipmentForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    logoWrapper: {
        alignItems: 'center'
    },
})
