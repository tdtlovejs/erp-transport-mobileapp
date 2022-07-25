import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ContainerWrapper from '../../themes/ContainerWrapper';
import {
    ROUTE_PROJECT_LIST,
    ROUTE_PROJECT_TYPE_LIST,
} from '../../utils/routes';
import {THEME_DARK} from '../../utils/constants';
import {AppContext} from '../../contexts/AppContext';
import {useTranslation} from 'react-i18next';
import {DARK_1, LIGHT_1} from '../../utils/colors';
import TouchAction from '../../themes/TouchAction';

const ProjectRoot = (props) => {
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
                    source={require('../../assets/images/project.png')}
                    style={styles.headerImage}
                />
                <Text style={[
                    styles.headerText,
                    (theme === THEME_DARK ? styles.headerTextDark : {})
                ]}>
                    {t('project.label.title')}
                </Text>
            </View>
            <TouchAction
                onPress={() => {
                    navigation.navigate(ROUTE_PROJECT_LIST)
                }}
                icon={require("./../../assets/images/list.png")}
                text={t('project.label.listProject')}
            />
            <TouchAction
                onPress={() => {
                    navigation.navigate(ROUTE_PROJECT_TYPE_LIST)
                }}
                icon={require("./../../assets/images/list.png")}
                text={t('project.label.listProjectType')}
            />
        </ContainerWrapper>
    )
}
export default ProjectRoot;
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
