import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import TransportForm from './TransportForm';

const TransportNew = (props) => {
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
            <TransportForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default TransportNew;
