import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProjectForm from './ProjectForm';

const ProjectNew = (props) => {
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
            <ProjectForm navigation={navigation} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProjectNew;
