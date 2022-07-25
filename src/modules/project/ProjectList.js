import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {
    ROUTE_PROJECT_EDIT, ROUTE_PROJECT_NEW,
} from '../../utils/routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {THEME_DARK} from '../../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import ItemWithExpanded from '../../themes/ItemWithExpanded';
import ViewItem from '../../themes/ViewItem';
import moment from 'moment';
import projectApi from '../../api/projectApi';
import FlatListApp from '../../themes/FlatListApp';
import {useTranslation} from "react-i18next";

const ProjectList = (props) => {
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
        const res = await projectApi.deleteProjectById(id);
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
            t('label.alert').toUpperCase(),
            t('label.confirm_delete'),
            [
                {
                    text: t('label.ok'),
                    onPress: () => {
                        if (item._id) {
                            onDelete(item._id);
                        }
                    }
                },
                {
                    text: t('label.cancel')
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
                        navigation.navigate(ROUTE_PROJECT_NEW, {
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
                apiNameList={"api/v1/project/list"}
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
                                                navigation.navigate(ROUTE_PROJECT_EDIT, {
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
                                        label={t('field.name')}
                                        view={item.name}
                                    />
                                    <ViewItem
                                        label={t('field.code')}
                                        view={item.code}
                                    />
                                    <ViewItem
                                        label={t('field.description')}
                                        view={item.description}
                                    />
                                    <ViewItem
                                        label={t('project.field.startDate')}
                                        view={item.startDate ? moment(item.startDate).format('LL') : ''}
                                    />
                                    <ViewItem
                                        label={t('project.field.endDate')}
                                        view={item.endDate ? moment(item.endDate).format('LL') : ''}
                                    />
                                    <ViewItem
                                        label={t('project.field.days')}
                                        view={item.days}
                                    />
                                    <ViewItem
                                        label={t('project.field.amount')}
                                        view={item.amount}
                                    />
                                    <ViewItem
                                        label={t('project.field.type')}
                                        view={item.type?.name ?? ''}
                                    />
                                    <ViewItem
                                        label={t('project.field.client')}
                                        view={item.client?.name ?? ''}
                                    />
                                    <View style={styles.listEquipmentWrapper}>
                                        <Text style={[
                                            styles.listEquipmentTitle,
                                            (theme === THEME_DARK ? styles.listEquipmentTitleDark : {})
                                        ]}>
                                            {t('project.label.listEquipment')}
                                        </Text>
                                        {Array.isArray(item.equipments) && <View style={styles.listEquipment}>
                                            {
                                                item.equipments.map((item, index) => {
                                                    const fileEId = item?.equipment?.logo?.fileId;
                                                    const linkImageE = fileEId ? `https://drive.google.com/uc?export=view&id=${fileEId}` : null;
                                                    return (
                                                        <View style={[
                                                            styles.itemEquipment,
                                                            (theme === THEME_DARK ? styles.itemEquipmentDark : {})
                                                        ]}>
                                                            {linkImageE && <Image
                                                                source={{
                                                                    uri: linkImageE
                                                                }}
                                                                style={styles.eImage}
                                                            />}
                                                            <View style={styles.itemEcell}>
                                                                <Text style={[
                                                                    styles.itemEcellText,
                                                                    (theme === THEME_DARK ? styles.itemEcellTextDark : {})
                                                                ]}>
                                                                    {item.equipment?.name}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.itemEcell}>
                                                                <Text style={[
                                                                    styles.itemEcellText,
                                                                    (theme === THEME_DARK ? styles.itemEcellTextDark : {})
                                                                ]}>
                                                                    {item.amount}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>}
                                    </View>
                                </>
                            }
                        />
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default ProjectList;
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
    },
    listEquipmentWrapper: {

    },
    listEquipmentTitle: {
        color: DARK_1,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    listEquipmentTitleDark: {
        color: LIGHT_1,
    },
    listEquipment: {

    },
    itemEquipment: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: DARK_2,
        borderStyle: 'dashed'
    },
    itemEquipmentDark: {
        borderBottomColor: LIGHT_2,
    },
    eImage: {
        width: 40,borderRadius: 20,
        height: 40,
    },
    itemEcell: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemEcellText: {
        color: DARK_1,
    },
    itemEcellTextDark: {
        color: LIGHT_1,
    }
})
