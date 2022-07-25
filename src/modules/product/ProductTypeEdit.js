import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProductTypeForm from './ProductTypeForm';

const ProductTypeEdit = (props) => {
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
            <ProductTypeForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProductTypeEdit;
