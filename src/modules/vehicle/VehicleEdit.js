import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import VehicleForm from './VehicleForm';

const VehicleEdit = (props) => {
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
            <VehicleForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default VehicleEdit;
