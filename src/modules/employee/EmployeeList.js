import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {
    ROUTE_EMPLOYEE_EDIT, ROUTE_EMPLOYEE_NEW,
} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    GENDER_FEMALE,
    GENDER_MALE,
    ROLE_ADMIN,
    ROLE_EMPLOYEE,
    ROLE_SUPERADMIN,
    THEME_DARK
} from '../../utils/constants';
import {ACTIVE_1, ACTIVE_2, ACTIVE_3, DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import moment from 'moment';
import FlatListApp from '../../themes/FlatListApp';
import personApi from '../../api/personApi';
import {useTranslation} from "react-i18next";
import CheckboxCustom from "../../themes/CheckboxCustom";

const EmployeeList = (props) => {
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
        const res = await personApi.deletePersonById(id);
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
            t('label.alert'),
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

    const renderViewGender = (gender) => {
        switch (gender) {
            case GENDER_MALE:
                return (
                    <View style={ styles.genderView}>
                        <IonIcon
                            name='male'
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                        <Text style={[
                            styles.genderText,
                            (theme === THEME_DARK ? styles.genderTextDark : {})
                        ]}>{t('employee.field.male')}</Text>
                    </View>
                )
            case GENDER_FEMALE:
                return (
                    <View style={ styles.genderView}>
                        <IonIcon
                            name='female'
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                        <Text style={[
                            styles.genderText,
                            (theme === THEME_DARK ? styles.genderTextDark : {})
                        ]}>{t('employee.field.female')}</Text>
                    </View>
                )
        }
        return (
            <View style={ styles.genderView}>
                <Text style={[
                    styles.genderText,
                    (theme === THEME_DARK ? styles.genderTextDark : {})
                ]}>{t('employee.field.secret')}</Text>
            </View>
        )
    }

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_EMPLOYEE_NEW, {
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
                apiNameList={"api/v1/person/list"}
                renderItem={({item, index}) => {
                    const fileId = item?.avatar?.fileId;
                    const linkImage = fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;

                    return (
                        <ItemWithExpanded
                            renderItem={
                                <View style={styles.rowView}>
                                    <View style={styles.cellImageWrapper}>
                                        {linkImage ? <Image
                                            source={{
                                                uri: linkImage
                                            }}
                                            style={styles.cellImage}
                                        /> : <View style={{
                                            height: 48,
                                            width: 48,
                                        }}/>}
                                    </View>
                                    <View style={styles.cellView}>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {})
                                        ]}>
                                            {item.firstName + " "+ item.lastName}
                                        </Text>
                                    </View>
                                    <View style={[
                                        styles.cellView,
                                        {alignItems: 'center'}
                                    ]}>
                                        {renderViewRole(item.user?.role)}
                                    </View>
                                    <View style={styles.cellAction}>
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                navigation.navigate(ROUTE_EMPLOYEE_EDIT, {
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
                                        {/*<TouchableOpacity*/}
                                        {/*    style={styles.cellBtn}*/}
                                        {/*    onPress={() => {*/}
                                        {/*        showConfirmDelete(item)*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    <IonIcon*/}
                                        {/*        name='trash'*/}
                                        {/*        size={18}*/}
                                        {/*        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}*/}
                                        {/*    />*/}
                                        {/*</TouchableOpacity>*/}
                                    </View>
                                </View>
                            }
                            renderItemExpanded={
                                <>
                                    <ViewItem
                                        label={t('employee.field.fullName')}
                                        view={item.firstName + " "+ item.lastName}
                                    />
                                    <ViewItem
                                        label={t('employee.field.username')}
                                        view={item.user?.username ?? ""}
                                    />
                                    <ViewItem
                                        label={t('employee.field.isDriver')}
                                        isViewComponent={true}
                                        view={
                                            <CheckboxCustom
                                                value={item.user?.isDriver}
                                            />
                                        }
                                    />
                                    <ViewItem
                                        label={t('employee.field.email')}
                                        view={item.email}
                                    />
                                    <ViewItem
                                        label={t('employee.field.phoneNumber')}
                                        view={item.phoneNumber}
                                    />
                                    <ViewItem
                                        label={t('employee.field.gender')}
                                        isViewComponent={true}
                                        view={renderViewGender(item.gender)}
                                    />
                                    <ViewItem
                                        label={t('employee.field.role')}
                                        isViewComponent={true}
                                        view={renderViewRole(item.user?.role)}
                                    />
                                    <ViewItem
                                        label={t('employee.field.birthday')}
                                        view={item.birthday ? moment(item.birthday).format('LL') : ''}
                                    />
                                    <Text style={[
                                        styles.headerText,
                                        (theme === THEME_DARK ? styles.headerTextDark : {})
                                    ]}>
                                        {t('label.address_info')}
                                    </Text>
                                    <ViewItem
                                        label={t('field.address_province')}
                                        view={item.address?.province?.name ?? ""}
                                    />
                                    <ViewItem
                                        label={t('field.address_district')}
                                        view={item.address?.district?.name ?? ""}
                                    />
                                    <ViewItem
                                        label={t('field.address_ward')}
                                        view={item.address?.ward?.name ?? ""}
                                    />
                                    <ViewItem
                                        label={t('field.address_description')}
                                        view={item.address?.description ?? ""}
                                    />
                                </>
                            }
                        />
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default EmployeeList;
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
        alignItems: 'flex-start'
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

    headerText: {
        textAlign: 'center',
        fontSize: 16,
        color: DARK_1,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginTop: 20,
    },
    headerTextDark: {
        color: LIGHT_1,
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
    genderView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    genderText: {
        color: DARK_2,
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '500',
    },
    genderTextDark: {
        color: LIGHT_2,
    }
})
