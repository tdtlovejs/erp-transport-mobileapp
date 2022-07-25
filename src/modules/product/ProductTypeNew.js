import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProductTypeForm from './ProductTypeForm';

const ProductTypeNew = (props) => {
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
            <ProductTypeForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProductTypeNew;
