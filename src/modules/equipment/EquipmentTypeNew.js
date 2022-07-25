import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EquipmentTypeForm from './EquipmentTypeForm';

const EquipmentTypeNew = (props) => {
    const {
        navigation,
        route
    } = props;
    const {
        onLoad
    } = route.params;
    return (
        <ContainerWrapper
            hasScrollView={true}
            // isHome={true}
        >
            <EquipmentTypeForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EquipmentTypeNew;
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    inputDark: {

    },
})
