import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {THEME_DARK} from '../../utils/constants';
import {AppContext} from '../../contexts/AppContext';
import {ROUTE_PRODUCT_TYPE_EDIT, ROUTE_PRODUCT_TYPE_NEW,} from '../../utils/routes';
import productTypeApi from '../../api/productTypeApi';
import {useTranslation} from "react-i18next";
import FlatListApp from "../../themes/FlatListApp";

const ProductTypeList = (props) => {
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
        const res = await productTypeApi.deleteProductTypeById(id);
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
                        navigation.navigate(ROUTE_PRODUCT_TYPE_NEW, {
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
                apiNameList={"api/v1/productType/list"}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.rowView}>
                            <View style={styles.cellView}>
                                <Text style={[
                                    styles.cellText,
                                    (theme === THEME_DARK ? styles.cellTextDark : {})
                                ]}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={styles.cellView}>
                                <Text style={[
                                    styles.cellText,
                                    (theme === THEME_DARK ? styles.cellTextDark : {})
                                ]}>
                                    {item.code}
                                </Text>
                            </View>
                            <View style={styles.cellAction}>
                                <TouchableOpacity
                                    style={styles.cellBtn}
                                    onPress={() => {
                                        navigation.navigate(ROUTE_PRODUCT_TYPE_EDIT, {
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
                    )
                }}
            />
        </ContainerWrapper>
    )
}
export default ProductTypeList;
const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center'
    },
    rowView: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
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
