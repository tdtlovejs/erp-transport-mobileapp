import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EquipmentForm from './EquipmentForm';

const EquipmentEdit = (props) => {
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
            <EquipmentForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EquipmentEdit;
