import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EquipmentTypeForm from './EquipmentTypeForm';

const EquipmentTypeEdit = (props) => {
    const {
        navigation,
        route
    } = props;
    const {
        data,
        onLoad
    } = route.params;
    return (
        <ContainerWrapper
            hasScrollView={true}
        >
            <EquipmentTypeForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EquipmentTypeEdit;
