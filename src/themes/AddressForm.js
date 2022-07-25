import React, {useContext, useEffect, useState} from "react";
import commonApi from "../api/commonApi";
import FormItem from "./FormItem";
import Input from "./Input";
import SelectCustom from "./SelectCustom";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text} from "react-native";
import {DARK_1, LIGHT_1} from "../utils/colors";
import {AppContext} from "../contexts/AppContext";
import {THEME_DARK} from "../utils/constants";
import addressApi from "../api/addressApi";
const AddressForm = (props) => {
    const {
        onChangeProvince,
        onChangeDistrict,
        onChangeWard,
        onChangeDescription,
        dataInitial
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const {t} = useTranslation();
    const [dataAddress, setDataAddress] = useState({
        province: dataInitial.province ?? "",
        district: dataInitial.district ?? "",
        ward: dataInitial.ward ?? "",
        description: dataInitial.description ?? ""
    })
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const {
        province,
        district,
        ward,
        description
    } = dataAddress;

    useEffect(() => {
        getListVnProvince();
    }, [])
    const getListVnProvince = async () => {
        const res = await addressApi.getListVnProvince();
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return ({
                    ...item,
                    value: item._id,
                    label: item.name
                });
            });
            setProvinces(resData)
        }
    }
    const getListVnDistrictByProvince = async (province) => {
        const res = await addressApi.getListVnDistrictByProvince(province);
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return ({
                    ...item,
                    value: item._id,
                    label: item.name
                });
            });
            setDistricts(resData)
        }
    }
    const getListVnWardByDistrict = async (district) => {
        const res = await addressApi.getListVnWardByDistrict(district);
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return ({
                    ...item,
                    value: item._id,
                    label: item.name
                });
            });
            setWards(resData)
        }
    }
    useEffect(() => {
        if (province) {
            getListVnDistrictByProvince(province)
        } else {
            if (districts.length > 0) {
                setDistricts([]);
            }
        }
    }, [province])

    useEffect(() => {
        if (district) {
            getListVnWardByDistrict(district)
        } else {
            if (wards.length > 0) {
                setWards([]);
            }
        }
    }, [district])

    useEffect(() => {
        if (dataInitial.province !== province) {
            onChangeProvince(province)
        }
    }, [province])

    useEffect(() => {
        if (dataInitial.district !== district) {
            onChangeDistrict(district);
        }
    }, [district])

    useEffect(() => {
        if (dataInitial.ward !== ward) {
            onChangeWard(ward);
        }
    }, [ward])

    useEffect(() => {
        if (dataInitial.description !== description) {
            onChangeDescription(description);
        }
    }, [description])



    return (
        <>
            <Text style={[
                styles.headerText,
                (theme === THEME_DARK ? styles.headerTextDark : {})
            ]}>
                {t('label.address_info')}
            </Text>
            <FormItem
                label={t('field.address_province')}
                input={
                    <SelectCustom
                        value={province}
                        options={provinces}
                        onChange={(value) => {
                            setDataAddress(prev => ({
                                ...prev,
                                province: value,
                                district: '',
                                ward: ''
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label={t('field.address_district')}
                input={
                    <SelectCustom
                        value={district}
                        options={districts}
                        onChange={(value) => {
                            setDataAddress(prev => ({
                                ...prev,
                                district: value,
                                ward: ''
                            }))
                        }}
                        enabled={province}
                    />
                }
            />
            <FormItem
                label={t('field.address_ward')}
                input={
                    <SelectCustom
                        value={ward}
                        options={wards}
                        onChange={(value) => {
                            setDataAddress(prev => ({
                                ...prev,
                                ward: value
                            }))
                        }}
                        enabled={province && district}
                    />
                }
            />
            <FormItem
                label={t('field.address_description')}
                input={
                    <Input
                        value={description}
                        onChangeText={(text) => {
                            setDataAddress(prev => ({
                                ...prev,
                                description: text
                            }))
                        }}
                        multiline={true}
                    />
                }
            />
        </>
    )
}

export default AddressForm;
const styles = StyleSheet.create({
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
    }
})
