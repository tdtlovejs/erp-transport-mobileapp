import React from 'react';
import ContainerWrapper from '../../themes/ContainerWrapper';
import ProjectTypeForm from './ProjectTypeForm';

const ProjectTypeEdit = (props) => {
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
            <ProjectTypeForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
        </ContainerWrapper>
    )
}
export default ProjectTypeEdit;
