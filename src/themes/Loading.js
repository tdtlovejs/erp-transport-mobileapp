import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, LIGHT_1} from '../utils/colors';
const Loading = (props) => {
    const {
        theme
    } = useContext(AppContext);
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                size="large"
                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
            />
        </View>
    )
}

export default Loading;
const styles = StyleSheet.create({
    loadingContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

