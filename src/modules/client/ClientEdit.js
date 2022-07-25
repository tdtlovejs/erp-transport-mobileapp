import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ClientForm from './ClientForm';
import Loading from "../../themes/Loading";

const ClientEdit = (props) => {
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
            {data ? <ClientForm navigation={navigation} dataInit={data} onLoad={onLoad}/> : <Loading />}
        </ContainerWrapper>
    )
}
export default ClientEdit;
