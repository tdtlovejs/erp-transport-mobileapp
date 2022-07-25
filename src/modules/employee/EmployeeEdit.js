import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EmployeeForm from './EmployeeForm';

const EmployeeEdit = (props) => {
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
            <EmployeeForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EmployeeEdit;
