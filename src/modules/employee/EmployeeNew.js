import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import EmployeeForm from './EmployeeForm';

const EmployeeNew = (props) => {
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
            <EmployeeForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default EmployeeNew;
