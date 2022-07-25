import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProjectForm from './ProjectForm';

const ProjectEdit = (props) => {
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
            <ProjectForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProjectEdit;
