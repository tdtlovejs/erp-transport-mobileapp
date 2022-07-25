import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import FormItem from '../../themes/FormItem';
import Input from '../../themes/Input';
import ButtonCustom from '../../themes/ButtonCustom';
import {AppContext} from '../../contexts/AppContext';
import {ACTION_EDIT, ACTION_NEW, THEME_DARK} from '../../utils/constants';
import DatePickerCustom from '../../themes/DatePickerCustom';
import ImagePickerCustom from '../../themes/ImagePickerCustom';
import moment from 'moment';
import projectApi from '../../api/projectApi';
import SelectCustom from "../../themes/SelectCustom";
import projectTypeApi from "../../api/projectTypeApi";
import equipmentApi from "../../api/equipmentApi";
import clientApi from "../../api/clientApi";
import IonIcon from "react-native-vector-icons/Ionicons";
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from "../../utils/colors";
import {useTranslation} from "react-i18next";

const dataInitial = {
    name: '',
    code: '',
    description: '',
    startDate: null,
    endDate: null,
    days: '',
    amount: '',
    type: '',
    logo: '',
    client: '',
    equipments: []
}
const ProjectForm = (props) => {
    const {
        setLoading,
        theme
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
                logo: '',
                type: dataInit.type?._id ?? '',
                client: dataInit.client?._id ?? '',
                equipments: Array.isArray(dataInit.equipments) ? dataInit.equipments.map(item => ({
                    ...item,
                    equipment: item.equipment ? item.equipment._id: '',
                })) : []
            })
        }
        return ({...dataInitial})
    });
    const action = dataInit ? ACTION_EDIT : ACTION_NEW;
    const [projectTypes, setProjectTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        getProjectTypes();
        getEquipments();
        getClients();
    }, [])
    const getProjectTypes = async () => {
        let res = await projectTypeApi.getAllProjectType();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setProjectTypes(resData)
        }
    }
    const getEquipments = async () => {
        let res = await equipmentApi.getAllEquipment();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setEquipments(resData)
        }
    }
    const getClients = async () => {
        let res = await clientApi.getAllClient();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setClients(resData)
        }
    }

    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('code', dataForm.code);
        formData.append('description', dataForm.description);
        formData.append('startDate', dataForm.startDate ? moment(dataForm.startDate).format('YYYY-MM-DD') :'');
        formData.append('endDate', dataForm.endDate ? moment(dataForm.endDate).format('YYYY-MM-DD') :'');
        formData.append('days', dataForm.days ?? "");
        formData.append('amount', dataForm.amount ?? "");
        formData.append('type', dataForm.type ?? '');
        formData.append('client', dataForm.client ?? '');
        formData.append('logo', dataForm.logo ? dataForm.logo : dataInit?.logo?._id ?? '');
        if (Array.isArray(dataForm.equipments)) {
            formData.append('equipments', JSON.stringify(dataForm.equipments));
        }
        if (action === ACTION_EDIT) {
            const editId = dataForm._id;
            const res = await projectApi.editProjectById(editId, formData);
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
            const res = await projectApi.createProject(formData);
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
                label={t('project.field.startDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.startDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                startDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('project.field.endDate')}
                input={
                    <DatePickerCustom
                        date={dataForm?.endDate}
                        onChange={(date) => {
                            setDataForm(prev => ({
                                ...prev,
                                endDate: date
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('project.field.days')}
                input={
                    <Input
                        value={(dataForm?.days ?? "").toString()}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                days: text
                            }))
                        }}
                        keyboardType='numeric'
                    />
                }
            />
            <FormItem
                label={t('project.field.amount')}
                input={
                    <Input
                        value={(dataForm?.amount ?? "").toString()}
                        onChangeText={(text) => {
                            setDataForm(prev => ({
                                ...prev,
                                amount: text
                            }))
                        }}
                        keyboardType='numeric'
                    />
                }
            />
            <FormItem
                label={t('project.field.type')}
                input={
                    <SelectCustom
                        value={dataForm?.type ?? ''}
                        options={projectTypes.map((item, index) => {
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
            <FormItem
                label={t('project.field.client')}
                input={
                    <SelectCustom
                        value={dataForm?.client ?? ''}
                        options={clients.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.name
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                client: value
                            }))
                        }}
                    />
                }
            />
            <View style={styles.listProductWrapper}>
                <Text style={[
                    styles.listProductTitle,
                    (theme === THEME_DARK ? styles.listProductTitleDark : {}),
                ]}>
                    {t('project.label.listEquipment')}
                </Text>
                <FlatList
                    style={styles.listProduct}
                    data={Array.isArray(dataForm.equipments) ? dataForm.equipments : []}
                    renderItem={({item, index}) => {
                        return (
                            <View style={[
                                styles.itemProduct,
                                (theme === THEME_DARK ? styles.itemProductDark : {})
                            ]}>
                                <View style={styles.itemCellView}>
                                    <View style={styles.itemCell}>
                                        <SelectCustom
                                            value={item.equipment ?? ''}
                                            options={equipments.map((item, index) => {
                                                return ({
                                                    value: item._id,
                                                    label: item.name
                                                })
                                            })}
                                            onChange={(value) => {
                                                setDataForm(prev => ({
                                                    ...prev,
                                                    equipments: prev.equipments.map((itemP, indexP) => {
                                                        if (index === indexP) {
                                                            return ({
                                                                ...itemP,
                                                                equipment: value,
                                                            })
                                                        } else {
                                                            return itemP;
                                                        }
                                                    })
                                                }))
                                            }}
                                        />
                                    </View>
                                    <View style={styles.itemCell}>
                                        <Input
                                            value={(item.amount ?? "").toString()}
                                            onChangeText={(text) => {
                                                setDataForm(prev => ({
                                                    ...prev,
                                                    equipments: prev.equipments.map((itemP, indexP) => {
                                                        if (index === indexP) {
                                                            return ({
                                                                ...itemP,
                                                                amount: text
                                                            })
                                                        } else {
                                                            return itemP;
                                                        }
                                                    })
                                                }))
                                            }}
                                            keyboardType='numeric'
                                            placeholder={t('project.field.amount')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.itemCellAction}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDataForm(prev => ({
                                                ...prev,
                                                equipments: prev.equipments.filter((itemP, indexP) => {
                                                    return !(index === indexP)
                                                })
                                            }))
                                        }}
                                    >
                                        <IonIcon
                                            name="close"
                                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        setDataForm(prev => ({
                            ...prev,
                            equipments: [
                                ...(Array.isArray(prev.equipments) ? prev.equipments : []),
                                {
                                    equipment: '',
                                    amount: '',
                                }
                            ]
                        }))
                    }}
                >
                    <IonIcon
                        name="add-circle"
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <ButtonCustom
                text={t('label.save')}
                onPress={() => {
                    onSave();
                }}
            />
        </View>
    )
}
export default ProjectForm;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    logoWrapper: {
        alignItems: 'center'
    },
    listProductWrapper: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    listProduct: {
        paddingVertical: 5,
        width: '100%',
    },
    listProductTitle: {
        color: DARK_1,
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    listProductTitleDark: {
        color: LIGHT_1,
    },
    itemProduct: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomColor: DARK_2,
    },
    itemProductDark: {
        borderBottomColor: LIGHT_2
    },
    itemCell: {
        width: '100%',
        padding: 5,
    },
    // itemCell1: {
    //     // flex: 1,
    //     minWidth: 120,
    //     padding: 5,
    // },
    itemCellView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemCellAction: {
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    amountTotal: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: DARK_2,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    amountTotalDark: {
        borderTopColor: LIGHT_2,
    },
    amountTotalText: {
        color: DARK_1,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    amountTotalTextDark: {
        color: LIGHT_1,
    }
})
