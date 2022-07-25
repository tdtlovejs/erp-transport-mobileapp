import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import TransportForm from './TransportForm';

const TransportEdit = (props) => {
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
            <TransportForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default TransportEdit;
