import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EquipmentForm from './EquipmentForm';

const EquipmentNew = (props) => {
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
        >
            <EquipmentForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EquipmentNew;
