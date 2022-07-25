import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext} from '../../contexts/AppContext';
import {LIGHT_2} from '../../utils/colors';
import ContainerWrapper from '../../themes/ContainerWrapper';
import personApi from '../../api/personApi';
import EmployeeForm from '../employee/EmployeeForm';
import Loading from '../../themes/Loading';

const AccountEdit = (props) => {
    const {
        navigation,
        route
    } = props;
    const {
        onLoad
    } = route.params;
    const {
        user,
        setUser,
        theme
    } = useContext(AppContext);
    const [data, setData] = useState(null);
    const personId = user?.data?.person?._id;


    useEffect(() => {
        personApi.showPerson(personId)
            .then(res => {
                const data = res.data.item;
                setData(data)
            })
            .catch(err => {
            })
    }, [])
    return (
        <ContainerWrapper
            hasScrollView={true}
        >
            {
                data
                    ?
                    <EmployeeForm navigation={navigation} dataInit={data} onLoad={onLoad}/>
                    :
                    <Loading/>
            }
        </ContainerWrapper>
    )
}
export default AccountEdit;
