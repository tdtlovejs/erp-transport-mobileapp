import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, LIGHT_1} from '../utils/colors';
import {AppContext} from '../contexts/AppContext';
const FormItem = (props) => {
    const {
        label,
        input,
        icon
    } = props;
    const {
        theme,
    } = useContext(AppContext);
    return (
        <View style={styles.container}>
            {(label || icon) && <View style={styles.title}>
                {
                    icon && <Image
                        source={icon}
                        style={styles.titleImage}
                    />
                }
                {label && <Text style={[
                    styles.titleText,
                    (theme === THEME_DARK ? styles.titleTextDark : {})
                ]}>
                    {label}
                </Text>}
            </View>}
            <View style={styles.input}>
                {input}
            </View>
        </View>
    )
}

export default FormItem;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleImage: {
        height: 36,
        width: 36,
        marginRight: 10,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: DARK_1
    },
    titleTextDark: {
        color: LIGHT_1
    },
    input: {
        paddingVertical: 2,
    }
})
