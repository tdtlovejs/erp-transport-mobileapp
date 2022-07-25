import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProductForm from './ProductForm';

const ProductEdit = (props) => {
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
            <ProductForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProductEdit;
