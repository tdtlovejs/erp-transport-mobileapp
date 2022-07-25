import React, {useContext, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW} from '../../utils/constants';
import equipmentTypeApi from '../../api/equipmentTypeApi';
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: ''
}
const EquipmentTypeForm = (props) => {
    const {
        setLoading
    } = useContext(AppContext);
    const {
        dataInit,
        navigation,
        onLoad
    } = props;
    const {t} = useTranslation();
    const [dataForm, setDataForm] = useState(dataInit ? {...dataInitial, ...dataInit} : {...dataInitial});
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;

    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm?.name ?? "");
        formData.append('code', dataForm?.code ?? "");
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await equipmentTypeApi.editEquipmentTypeById(editId, formData);
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
            const res = await equipmentTypeApi.createEquipmentType(formData);
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
            <ButtonCustom
                text={t('label.save')}
                onPress={() => {
                    onSave();
                }}
            />
        </View>
    )
}
export default EquipmentTypeForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
})
