import {ScrollView, StyleSheet, View} from 'react-native';
import {THEME_DARK} from '../utils/constants';
import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {DARK_1, LIGHT_1} from '../utils/colors';

const ContainerWrapper = (props) => {
    const {
        children,
        hasScrollView,
        isHome,
        style,
        displayBannerAd
    } = props;
    const {
        theme
    } = useContext(AppContext);
    if (hasScrollView) {
        return (
            <View style={[
                styles.container,
                (theme === THEME_DARK ? styles.containerDark : {}),
                style
            ]}>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
                {isHome && <View style={styles.boxBottom}/>}
            </View>
        )
    }
    return (
        <View style={[
            styles.container,
            (theme === THEME_DARK ? styles.containerDark : {}),
            style
        ]}>
            {children}
        </View>
    )
}

export default ContainerWrapper;
const styles = StyleSheet.create({
    container: {
        backgroundColor: LIGHT_1,
        height: '100%',
    },
    containerDark: {
        backgroundColor: DARK_1,
    },
    body: {
        paddingHorizontal: 20,
    },
    boxBottom: {
        height: 70,
    },
})
