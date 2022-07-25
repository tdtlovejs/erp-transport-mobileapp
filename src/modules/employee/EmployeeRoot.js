import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {ROUTE_CLIENT_LIST, ROUTE_EMPLOYEE_LIST} from '../../utils/routes';
import {DARK_1, LIGHT_1} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import {THEME_DARK, THEME_LIGHT} from '../../utils/constants';
import {useTranslation} from 'react-i18next';
import TouchAction from '../../themes/TouchAction';

const EmployeeRoot = (props) => {
    const {
        navigation
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const {t} = useTranslation();
    return (
        <ContainerWrapper
            hasScrollView={true}
            isHome={true}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/employee.png')}
                    style={styles.headerImage}
                />
                <Text style={[
                    styles.headerText,
                    (theme === THEME_DARK ? styles.headerTextDark : {})
                ]}>
                    {t('employee.label.title')}
                </Text>
            </View>
            <TouchAction
                onPress={() => {
                    navigation.navigate(ROUTE_EMPLOYEE_LIST)
                }}
                icon={require("./../../assets/images/list.png")}
                text={t('employee.label.listEmployee')}
            />
        </ContainerWrapper>
    )
}
export default EmployeeRoot;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerImage: {
        height: 150,
        width: 150,
        marginBottom: 10,
    },
    headerText: {
        color: DARK_1,
        fontWeight: '500',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    headerTextDark: {
        color: LIGHT_1,
    }
})
