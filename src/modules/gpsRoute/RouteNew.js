import React, {useContext, useEffect, useState} from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {Text, ToastAndroid} from "react-native";
import projectTypeApi from "../../api/projectTypeApi";
import moment from "moment";
import vehicleApi from "../../api/vehicleApi";
import SelectCustom from "../../themes/SelectCustom";
import FormItem from "../../themes/FormItem";
import transportApi from "../../api/transportApi";
import {TRANSPORT_STATUS_WAITING} from "../../utils/constants";
import ButtonCustom from "../../themes/ButtonCustom";
import {AppContext} from "../../contexts/AppContext";
import equipmentApi from "../../api/equipmentApi";
import gpsRouteApi from "../../api/gpsRouteApi";
import {useTranslation} from "react-i18next";
const dataInitial = {
    vehicle: '',
    transportOrder: ''
}
const RouteNew = (props) => {
    const {
        setLoading
    } = useContext(AppContext);
    const {
        navigation,
        route,
    } = props;
    const {
        onLoad
    } = route.params;
    const {t} = useTranslation();
    const [dataForm, setDataForm] = useState({
        ...dataInitial,
    });
    const [vehicles, setVehicles] = useState([]);
    const [transportOrders, setTransportOrders] = useState([]);
    useEffect(() => {
        getVehicles();
        getTransportOrders();
    }, [])
    const getVehicles = async () => {
        let res = await vehicleApi.getAllVehicle({
            removeMoving: 1
        });
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setVehicles(resData)
        }
    }
    const getTransportOrders = async () => {
        let res = await transportApi.getAllTransport({
            status: TRANSPORT_STATUS_WAITING
        });
        if (res.status === 200 && Array.isArray(res.data.items)) {
            let resData = res.data.items.map((item, index) => {
                return {...item, key: index};
            }).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt));
            setTransportOrders(resData)
        }
    }


    const onSave = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('vehicle', dataForm.vehicle ?? "");
        formData.append('transportOrder', dataForm.transportOrder ?? "");
        const res = await gpsRouteApi.createRoute(formData);
        if (res.status === 200) {
            ToastAndroid.showWithGravity(
                t('label.new_success'),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            onLoad();
            navigation.goBack()

            // onLoad();
        }
        setLoading(false);
    }

    return (
        <ContainerWrapper
            hasScrollView={true}
        >
            <FormItem
                label="vehicle"
                input={
                    <SelectCustom
                        value={dataForm?.vehicle ?? ''}
                        options={vehicles.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.name
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                vehicle: value
                            }))
                        }}
                    />
                }
            />
            <FormItem
                label="transportOrder"
                input={
                    <SelectCustom
                        value={dataForm?.transportOrder ?? ''}
                        options={transportOrders.map((item, index) => {
                            return ({
                                value: item._id,
                                label: item.title
                            })
                        })}
                        onChange={(value) => {
                            setDataForm(prev => ({
                                ...prev,
                                transportOrder: value
                            }))
                        }}
                    />
                }
            />
            <ButtonCustom
                text={"Start gpsRoute"}
                onPress={() => {
                    onSave();
                }}
            />
        </ContainerWrapper>
    )
}
export default RouteNew;
