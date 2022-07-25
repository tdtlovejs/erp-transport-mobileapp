import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import InvoiceForm from './InvoiceForm';

const InvoiceEdit = (props) => {
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
            <InvoiceForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default InvoiceEdit;
