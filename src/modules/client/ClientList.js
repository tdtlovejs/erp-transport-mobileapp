import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_CLIENT_EDIT, ROUTE_CLIENT_NEW,} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {THEME_DARK} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import clientApi from '../../api/clientApi';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from 'react-i18next';
import CheckboxCustom from '../../themes/CheckboxCustom';

const ClientList = (props) => {
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
        const res = await clientApi.deleteClientById(id);
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

    return (
        <ContainerWrapper>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ROUTE_CLIENT_NEW, {
                            onLoad: onLoad
                        })
                    }}
                >
                    <IonIcon
                        name='add-circle'
                        size={36}
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                    />
                </TouchableOpacity>
            </View>
            <FlatListApp
                forceUpdate={forceUpdate}
                apiNameList={"api/v1/client/list"}
                renderItem={({item, index}) => {
                    const fileId = item?.logo?.fileId;
                    const linkImage = fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
                    return (
                        <ItemWithExpanded
                            renderItem={
                                <View style={[
                                    styles.rowView,
                                    (theme === THEME_DARK ? styles.rowViewDark : {})
                                ]}>
                                    <View style={styles.cellImageWrapper}>
                                        {linkImage && <Image
                                            source={{
                                                uri: linkImage
                                            }}
                                            style={styles.cellImage}
                                        />}
                                    </View>
                                    <View style={styles.cellView}>
                                        <Text style={[
                                            styles.cellText,
                                            (theme === THEME_DARK ? styles.cellTextDark : {})
                                        ]}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.cellAction}>
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                navigation.navigate(ROUTE_CLIENT_EDIT, {
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
                                        <TouchableOpacity
                                            style={styles.cellBtn}
                                            onPress={() => {
                                                showConfirmDelete(item)
                                            }}
                                        >
                                            <IonIcon
                                                name='trash'
                                                size={18}
                                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            renderItemExpanded={
                                <>
                                    <ViewItem
                                        label={t('client.field.name')}
                                        view={item.name}
                                    />
                                    <ViewItem
                                        label={t('client.field.code')}
                                        view={item.code}
                                    />
                                    <ViewItem
                                        label={t('client.field.phoneNumber')}
                                        view={item.phoneNumber}
                                    />
                                    <ViewItem
                                        label={t('client.field.prospective')}
                                        icon={require('../../assets/images/prospective.png')}
                                        isViewComponent={true}
                                        view={
                                            <CheckboxCustom
                                                value={item.prospective}
                                            />
                                        }
                                    />
                                    <ViewItem
                                        label={t('client.field.manager')}
                                        view={item.manager ? ((item.manager.firstName ?? "") + " " + (item.manager.lastName ?? "")) : ''}
                                    />
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
export default ClientList;
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
    }
})
