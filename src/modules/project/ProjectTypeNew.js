import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProjectTypeForm from './ProjectTypeForm';

const ProjectTypeNew = (props) => {
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
            <ProjectTypeForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProjectTypeNew;
