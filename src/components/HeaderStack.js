import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, LIGHT_1} from '../utils/colors';
import TouchSetting from "./TouchSetting";

const HeaderStack = (props) => {
    const {
        theme,
    } = useContext(AppContext);
    const {
        title,
        navigation
    } = props;

    return (
        <View style={[
            styles.header,
            (theme === THEME_DARK ? styles.headerDark : {})
        ]}>
            <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <IonIcon
                    name='arrow-back'
                    size={24}
                    color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                />
            </TouchableOpacity>
            <Text
                style={[
                    styles.headerText,
                    (theme === THEME_DARK ? styles.headerTextDark : {})
                ]}
                numberOfLines={1}
            >
                {title ?? (props.options?.title ?? "")}
            </Text>
            {/*<TouchSetting />*/}
        </View>
    );
}
export default HeaderStack;
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_1,
        paddingHorizontal: 50,
    },
    headerDark: {
        backgroundColor: DARK_1,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 15,
        color: DARK_1,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    headerTextDark: {
        color: LIGHT_1,
    },
    iconBtn: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
