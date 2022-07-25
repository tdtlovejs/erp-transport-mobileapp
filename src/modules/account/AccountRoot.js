import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../contexts/AppContext';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
    GENDER_FEMALE,
    GENDER_MALE,
    GENDER_SECRET,
    ROLE_ADMIN, ROLE_EMPLOYEE,
    ROLE_SUPERADMIN,
    THEME_DARK
} from '../../utils/constants';
import {ACTIVE_1, ACTIVE_2, ACTIVE_3, DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ViewItem from '../../themes/ViewItem';
import {ROUTE_ACCOUNT_EDIT} from '../../utils/routes';
import {useTranslation} from "react-i18next";
import moment from "moment";

const AccountRoot = (props) => {
    const {
        navigation
    } = props;
    const {
        user,
        setUser,
        theme,

    } = useContext(AppContext);
    const {t} = useTranslation();
    const photo = user?.data?.person?.avatar?.fileId ? `https://drive.google.com/uc?export=view&id=${user?.data?.person?.avatar?.fileId}` : null;
    const username = user?.data?.username ?? "";
    const firstName = user?.data?.person?.firstName ?? "";
    const lastName = user?.data?.person?.lastName ?? "";
    const email = user?.data?.person?.email ?? "";
    const phoneNumber = user?.data?.person?.phoneNumber ?? "";
    const gender = user?.data?.person?.gender ?? GENDER_SECRET;

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

    const onLoad = () => {
        console.log('onLoad')
    }
    return (
        <ContainerWrapper>
            <View style={styles.profileBlock}>
                <Image
                    source={photo ? {
                        uri: photo
                    } : require('../../assets/images/user.png')}
                    style={styles.avatar}
                />
                <Text style={[
                    styles.usernameText,
                    (theme === THEME_DARK ? styles.usernameTextDark : {})
                ]}>{username}</Text>
                <Text style={[
                    styles.nameText,
                    (theme === THEME_DARK ? styles.nameTextDark : {})
                ]}>{firstName} {lastName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setUser(null)
                    }}
                    style={styles.logoutBtn}
                >
                    <IonIcon
                        name='md-power'
                        size={24}
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_ACCOUNT_EDIT, {
                            onLoad: onLoad
                        })
                    }}
                    style={styles.editIcon}
                >
                    <IonIcon
                        name='pencil'
                        size={24}
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.listBlock}>
                <View style={[
                    styles.blockWrapper,
                    (theme === THEME_DARK ? styles.blockWrapperDark : {})
                ]}>
                    <Text style={[
                        styles.blockTitleText,
                        (theme === THEME_DARK ? styles.blockTitleTextDark : {})
                    ]}>
                        Information
                    </Text>
                    <View style={styles.blockContent}>
                        <ViewItem
                            label={t('employee.field.username')}
                            view={username}
                        />
                        <ViewItem
                            label={t('employee.field.email')}
                            view={email}
                        />
                        <ViewItem
                            label={t('employee.field.firstName')}
                            view={firstName}
                        />
                        <ViewItem
                            label={t('employee.field.lastName')}
                            view={lastName}
                        />
                        <ViewItem
                            label={t('employee.field.phoneNumber')}
                            view={phoneNumber}
                        />
                        <ViewItem
                            label={t('employee.field.gender')}
                            isViewComponent={true}
                            view={renderViewGender(user?.data?.person?.gender)}
                        />
                        <ViewItem
                            label={t('employee.field.role')}
                            isViewComponent={true}
                            view={renderViewRole(user?.data?.role)}
                        />
                        <ViewItem
                            label={t('employee.field.birthday')}
                            view={user?.data?.person?.birthday ? moment(user?.data?.person?.birthday).format('LL') : ''}
                        />
                    </View>
                </View>
                <View style={[
                    styles.blockWrapper,
                    (theme === THEME_DARK ? styles.blockWrapperDark : {})
                ]}>
                    <Text style={[
                        styles.blockTitleText,
                        (theme === THEME_DARK ? styles.blockTitleTextDark : {})
                    ]}>
                        {t('label.address_info')}
                    </Text>
                    <View style={styles.blockContent}>
                        <ViewItem
                            label={t('field.address_province')}
                            view={user?.data?.person?.address?.province?.name ?? ""}
                        />
                        <ViewItem
                            label={t('field.address_district')}
                            view={user?.data?.person?.address?.district?.name ?? ""}
                        />
                        <ViewItem
                            label={t('field.address_ward')}
                            view={user?.data?.person?.address?.ward?.name ?? ""}
                        />
                        <ViewItem
                            label={t('field.address_description')}
                            view={user?.data?.person?.address?.description ?? ""}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.boxBottom}/>
        </ContainerWrapper>
    )
}
export default AccountRoot;
const styles = StyleSheet.create({
    inputDark: {

    },
    logoutBtn: {
        padding: 5,
        borderRadius: 5,
        // backgroundColor: 'red',
    },
    editIcon: {
        position: 'absolute',
        right: 10,
        top: 10,

    },
    profileBlock: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    usernameText: {
        color: DARK_1,
        fontSize: 16,
        fontWeight: '500'
    },
    usernameTextDark: {
        color: LIGHT_1,
    },
    nameText: {
        color: DARK_2,
        fontSize: 15,
        fontWeight: '400',
        textTransform: 'uppercase'
    },
    nameTextDark: {
        color: LIGHT_2
    },
    listBlock: {
        // paddingVertical: 10,
        paddingHorizontal: 10,
    },
    blockWrapper: {
        backgroundColor: LIGHT_2,
        borderRadius: 9,
        padding: 10,
        marginVertical: 15,
    },
    blockWrapperDark: {
        backgroundColor: DARK_2,
    },
    blockTitleText: {
        fontWeight: '500',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        color: DARK_1,
    },
    blockTitleTextDark: {
        color: LIGHT_1,
    },
    blockContent: {
        padding: 5,
        // borderTopWidth: 0.5,
        // borderRightColor: 'red'
    },
    boxBottom: {
        height: 70,
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
