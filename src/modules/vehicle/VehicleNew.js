import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import VehicleForm from './VehicleForm';

const VehicleNew = (props) => {
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
            <VehicleForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default VehicleNew;
