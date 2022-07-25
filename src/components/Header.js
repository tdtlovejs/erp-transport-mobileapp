import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import {DARK_1, LIGHT_1} from '../utils/colors';
import {THEME_DARK} from '../utils/constants';
import TouchSetting from './TouchSetting';

export default function Header(props) {
    const {
        theme,
    } = useContext(AppContext);
    const {
        title
    } = props;

    return (
        <View style={[
            styles.header,
            (theme === THEME_DARK ? styles.headerDark : {})
        ]}>
            <Text
                style={[
                styles.headerText,
                (theme === THEME_DARK ? styles.headerTextDark : {})
            ]}>{title}</Text>
            <TouchSetting />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_1,
    },
    headerDark: {
        backgroundColor: DARK_1,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 18,
        color: DARK_1,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    headerTextDark: {
        color: LIGHT_1,
    }
});
