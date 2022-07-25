import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProductForm from './ProductForm';

const ProductNew = (props) => {
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
            <ProductForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProductNew;
