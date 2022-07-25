import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ClientForm from './ClientForm';

const ClientNew = (props) => {
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
            <ClientForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ClientNew;
