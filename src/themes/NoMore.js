import {StyleSheet, Text, View} from 'react-native';
import {THEME_DARK} from '../utils/constants';
import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {
     DARK_2, LIGHT_2
} from '../utils/colors';
import {useTranslation} from 'react-i18next';

const NoMore = (props) => {
    const {

    } = props;
    const {
        theme
    } = useContext(AppContext);
    const {
        t
    } = useTranslation();
    return (
        <View style={styles.noMore}>
            <Text style={[
                styles.noMoreText,
                (theme === THEME_DARK ? styles.noMoreTextDark : {})
            ]}>
                {t('label.no_more')}
            </Text>
        </View>
    )
}

export default NoMore;
const styles = StyleSheet.create({
    noMore: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noMoreText: {
        color: DARK_2,
        fontWeight: '400',
        fontSize: 15,
    },
    noMoreTextDark: {
        color: LIGHT_2,
    }
})
