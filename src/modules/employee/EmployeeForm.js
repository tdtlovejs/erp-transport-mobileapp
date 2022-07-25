import React, {useContext, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {
    ACTION_EDIT,
    ACTION_NEW,
    GENDER_FEMALE,
    GENDER_MALE, GENDER_SECRET, ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_SUPERADMIN,
} from '../../utils/constants';
import DatePickerCustom from '../../themes/DatePickerCustom';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import moment from 'moment';
import personApi from '../../api/personApi';
import ViewItem from '../../themes/ViewItem';
import CheckboxCustom from '../../themes/CheckboxCustom';
import SelectCustom from '../../themes/SelectCustom';
import AddressForm from "../../themes/AddressForm";
import {useTranslation} from "react-i18next";
import authApi from "../../api/authApi";
import {ACTIVE_1, ACTIVE_2, ACTIVE_3, DARK_1} from "../../utils/colors";

const dataInitial = {
    isUser: true,
    isDriver: false,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    birthday: '',
    gender: '',
    address_description: '',
    address_city: '',
    address_country: '',
    address_postalCode: '',
    address_province: '',
    address_district: '',
    address_ward: '',
    username: '',
    password: '',
    confirmPassword: '',
    changePassword: false,
    role: '',
    avatar: null,
}
const EmployeeForm = (props) => {
    const {
        setLoading,
        user,
        setUser
    } = useContext(AppContext);
    const {
        dataInit,
        navigation,
        onLoad
    } = props;
    const {t} = useTranslation();

    const [logoUrl, setLogoUrl] = useState(() => {
        if (dataInit) {
            const fileId = dataInit?.avatar?.fileId;
            return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
        }
        return null;
    });
    const role = user?.data?.role ?? "";

    const [dataForm, setDataForm] = useState(() => {
        if (dataInit) {
            return ({
                ...dataInitial,
                ...dataInit,
                avatar: null,
                isUser: !!dataInit.user && dataInit.user?.enabled,
                isDriver: !!dataInit.user?.isDriver,
                username: dataInit.user?.username ?? "",
                role: dataInit.user?.role ?? "",
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
        formData.append('email', dataForm.email);
        formData.append('firstName', dataForm.firstName);
        formData.append('lastName', dataForm.lastName);
        formData.append('phoneNumber', dataForm.phoneNumber);
        formData.append('birthday', dataForm.birthday ? moment(dataForm.birthday).format('YYYY-MM-DD') :'');
        formData.append('gender', dataForm.gender);
        formData.append('address_description', dataForm.address_description);
        formData.append('address_city', dataForm.address_city);
        formData.append('address_country', dataForm.address_country);
        formData.append('address_postalCode', dataForm.address_postalCode);
        formData.append('address_province', dataForm.address_province ?? "");
        formData.append('address_district', dataForm.address_district ?? "");
        formData.append('address_ward', dataForm.address_ward ?? "");
        formData.append('avatar', dataForm.avatar ? dataForm.avatar : dataInit?.avatar?._id ?? '');
        if (dataForm.isUser) {
            formData.append('isUser', 1);
            formData.append('username', dataForm.username);
            formData.append('password', dataForm.password);
            formData.append('confirmPassword', dataForm.confirmPassword);
            formData.append('changePassword', dataForm.changePassword ? 1 : 0);
            formData.append('isDriver', !!dataForm.isDriver);
            formData.append('role', dataForm.role);
        } else {
            formData.append('disabledUser', 1);
        }
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await personApi.editPersonById(editId, formData);
            if (res.status === 200) {
                if (user?.data?._id === dataForm.user?._id) {
                    const res1 = await authApi.showCurrentUser();
                    if (res1.status === 200) {
                        setUser(prev => ({
                            ...prev,
                            ...res1.data
                        }))
                    }
                }
                ToastAndroid.showWithGravity(
                    t('label.edit_success'),
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                onLoad();
                navigation.goBack();
            }
        } else {
            const res = await personApi.createPerson(formData);
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
    const renderViewRole = (role) => {
        switch (role) {
            case ROLE_SUPERADMIN:
                return (
                    <View style={[
                        styles.roleView,
                        styles.roleSuperAdmin,
                    ]}>
                        <Text style={styles.roleText}>{t('employee.field.superadmin')}</Text>
                    </View>
                )
            case ROLE_ADMIN:
                return (
                    <View style={[
                        styles.roleView,
                        styles.roleAdmin,
                    ]}>
                        <Text style={styles.roleText}>{t('employee.field.admin')}</Text>
                    </View>
                )
            case ROLE_EMPLOYEE:
                return (
                    <View style={[
                        styles.roleView,
                        styles.roleEmployee,
                    ]}>
                        <Text style={styles.roleText}>{t('employee.field.employee')}</Text>
                    </View>
                )
        }
        return (
            <></>
        )
    }


    return (
        <View
            style={styles.container}
        >
            <View style={styles.logoWrapper}>
                <ImagePickerCustom
                    uri={dataForm?.avatar?.uri || logoUrl}
                    onChangeImage={(image) => {
                        setDataForm(prev => ({
                            ...prev,
                            avatar: image
                        }))
                    }}
                />
            </View>
            <View style={{
                alignItems: 'center',
                paddingVertical: 10,
            }}>
                <CheckboxCustom
                    value={!!dataForm?.isUser}
                    onChange={(checked) => {
                        setDataForm(prev => ({
                            ...prev,
                            isUser: checked
                        }))
                    }}
                    disabled={action === ACTION_EDIT && user?.data?._id === dataForm.user?._id}
                    label="isUser"
                />
            </View>
            {
                dataForm?.isUser &&
                <>
                    <FormItem
                        label={t('employee.field.username')}
                        input={
                            <Input
                                value={dataForm?.username}
                                onChangeText={(text) => {
                                    setDataForm(prev => ({
                                        ...prev,
                                        username: text
                                    }))
                                }}
                            />
                        }
                    />
                    {(
                        user?.data?.person?._id === dataForm._id
                        || dataForm?.role === ROLE_SUPERADMIN
                    ) ?
                        <ViewItem
                            label={t('employee.field.role')}
                            isViewComponent={true}
                            // view={dataForm.user?.role}
                            view={renderViewRole(dataForm?.role)}
                        />
                        :
                        <FormItem
                            label={t('employee.field.role')}
                            input={
                                <SelectCustom
                                    value={dataForm?.role ?? ''}
                                    options={[
                                        ...(role === ROLE_SUPERADMIN ? [{
                                            value: ROLE_ADMIN,
                                            label: 'admin'
                                        }] : []),
                                        {
                                            value: ROLE_EMPLOYEE,
                                            label: 'employee'
                                        }
                                    ]}
                                    onChange={(value) => {
                                        setDataForm(prev => ({
                                            ...prev,
                                            role: value
                                        }))
                                    }}
                                />
                            }
                        />
                    }
                    {
                        (action === ACTION_NEW || !dataForm.user)
                            ?
                            <FormItem
                                label={t('employee.field.password')}
                                input={
                                    <Input
                                        value={dataForm?.password}
                                        onChangeText={(text) => {
                                            setDataForm(prev => ({
                                                ...prev,
                                                password: text
                                            }))
                                        }}
                                        inputType="password"
                                        secureTextEntry={true}
                                    />
                                }
                            />
                            :
                            <>
                                <FormItem
                                    input={
                                        <CheckboxCustom
                                            value={!!dataForm?.changePassword}
                                            onChange={(checked) => {
                                                setDataForm(prev => ({
                                                    ...prev,
                                                    changePassword: checked
                                                }))
                                            }}
                                            label={t('employee.field.changePassword')}
                                        />
                                    }
                                />
                                {
                                    dataForm.changePassword && <>
                                        {
                                            <>
                                                <FormItem
                                                    label={t('employee.field.confirmPassword')}
                                                    input={
                                                        <Input
                                                            value={dataForm?.confirmPassword}
                                                            onChangeText={(text) => {
                                                                setDataForm(prev => ({
                                                                    ...prev,
                                                                    confirmPassword: text
                                                                }))
                                                            }}
                                                            inputType="password"
                                                            secureTextEntry={true}
                                                        />
                                                    }
                                                />
                                                <FormItem
                                                    label={t('employee.field.newPassword')}
                                                    input={
                                                        <Input
                                                            value={dataForm?.password}
                                                            onChangeText={(text) => {
                                                                setDataForm(prev => ({
                                                                    ...prev,
                                                                    password: text
                                                                }))
                                                            }}
                                                            inputType="password"
                                                            secureTextEntry={true}
                                                        />
                                                    }
                                                />
                                            </>
                                        }
                                    </>
                                }
                            </>
                    }
                    <CheckboxCustom
                        value={!!dataForm?.isDriver}
                        onChange={(checked) => {
                            setDataForm(prev => ({
                                ...prev,
                                isDriver: checked
                            }))
                        }}
                        label={t('employee.field.isDriver')}
                    />
                </>
            }
            <FormItem
                label={t('employee.field.email')}
                input={
                    <Input
                        value={dataForm?.email}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                email: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('employee.field.firstName')}
                input={
                    <Input
                        value={dataForm?.firstName}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                firstName: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('employee.field.lastName')}
                input={
                    <Input
                        value={dataForm?.lastName}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                lastName: text
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('employee.field.phoneNumber')}
                input={
                    <Input
                        value={dataForm?.phoneNumber}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                phoneNumber: text
                            }))
                        }}
                        keyboardType='numeric'
                    />
                }
            />
            <FormItem
                label={t('employee.field.birthday')}
                input={
                    <DatePickerCustom
                        date={dataForm?.birthday ? new Date(dataForm?.birthday) : null}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                birthday: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('employee.field.gender')}
                input={
                    <SelectCustom
                        value={dataForm?.gender}
                        options={[
                            {
                                value: GENDER_MALE,
                                label: t('employee.field.male')
                            },
                            {
                                value: GENDER_FEMALE,
                                label: t('employee.field.female')
                            },
                            {
                                value: GENDER_SECRET,
                                label: t('employee.field.secret')
                            }
                        ]}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                gender: value
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
export default EmployeeForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    logoWrapper: {
        alignItems: 'center'
    },
    roleView: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    roleSuperAdmin: {
        backgroundColor: ACTIVE_1,
    },
    roleAdmin: {
        backgroundColor: ACTIVE_2,
    },
    roleEmployee: {
        backgroundColor: ACTIVE_3
    },
    roleText: {
        fontSize: 11,
        textTransform: 'uppercase',
        fontWeight: '400',
        color: DARK_1,
    },
})
