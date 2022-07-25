import React, {useContext, useState} from 'react';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW} from '../../utils/constants';
import projectTypeApi from '../../api/projectTypeApi';
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: ''
}
const ProjectTypeForm = (props) => {
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
    const [action, setAction] = useState(dataInit ? ACTION_EDIT : ACTION_NEW)

    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm?.name ?? "");
        formData.append('code', dataForm?.code ?? "");
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            await projectTypeApi.editProjectTypeById(editId, formData);
        } else {
            await projectTypeApi.createProjectType(formData);
        }
        onLoad();
        setLoading(false);
        navigation.goBack();
    }
    return (
        <>
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
        </>
    )
}
export default ProjectTypeForm;
