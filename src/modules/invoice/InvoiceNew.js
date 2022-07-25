import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import InvoiceForm from './InvoiceForm';

const InvoiceNew = (props) => {
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
            <InvoiceForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default InvoiceNew;
