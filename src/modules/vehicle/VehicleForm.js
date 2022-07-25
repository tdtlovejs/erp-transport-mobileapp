import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {
    ACTION_EDIT,
    ACTION_NEW,
    VEHICLE_TYPE_BICYCLE,
    VEHICLE_TYPE_CAR,
    VEHICLE_TYPE_ELECTRIC_BICYCLE, VEHICLE_TYPE_ELECTRIC_CAR,
    VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
    VEHICLE_TYPE_MOTORCYCLE, VEHICLE_TYPE_OTHER, VEHICLE_TYPE_TRUCK
} from '../../utils/constants';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import SelectCustom from "../../themes/SelectCustom";
import vehicleApi from "../../api/vehicleApi";
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: '',
    description: '',
    type: '',
    logo: '',
}
const VehicleForm = (props) => {
    const {
        setLoading
    } = useContext(AppContext);
    const {
        dataInit,
        navigation,
        onLoad
    } = props;
    const {t} = useTranslation();

    const listVehicle = [
        {
            value: VEHICLE_TYPE_BICYCLE,
            label: t('vehicle.label.bicycle')
        },
        {
            value: VEHICLE_TYPE_ELECTRIC_BICYCLE,
            label: t('vehicle.label.electric_bicycle')
        },
        {
            value: VEHICLE_TYPE_MOTORCYCLE,
            label: t('vehicle.label.motorcycle')
        },
        {
            value: VEHICLE_TYPE_ELECTRIC_MOTORCYCLE,
            label: t('vehicle.label.electric_motorcycle')
        },
        {
            value: VEHICLE_TYPE_CAR,
            label: t('vehicle.label.car')
        },
        {
            value: VEHICLE_TYPE_ELECTRIC_CAR,
            label: t('vehicle.label.electric_car')
        },
        {
            value: VEHICLE_TYPE_TRUCK,
            label: t('vehicle.label.truck')
        },
        {
            value: VEHICLE_TYPE_OTHER,
            label: t('vehicle.label.other')
        }
    ]

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
        formData.append('description', dataForm.description);
        formData.append('type', dataForm.type ?? "");
        formData.append('logo', dataForm.logo ? dataForm.logo : dataInit?.logo?._id ?? '');
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await vehicleApi.editVehicleById(editId, formData);
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
            const res = await vehicleApi.createVehicle(formData);
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
                label={t('vehicle.field.type')}
                input={
                    <SelectCustom
                        value={dataForm?.type ?? ''}
                        options={listVehicle}
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
export default VehicleForm;
const styles = StyleSheet.create({
    logoWrapper: {
        alignItems: 'center'
    },
})
