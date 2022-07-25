import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {THEME_DARK} from '../utils/constants';
import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';

const TouchAction = (props) => {
    const {
        onPress,
        icon,
        text,
        renderExtend
    } = props;
    const {
        theme
    } = useContext(AppContext);

    const styleButton = [
        styles.button,
        (theme === THEME_DARK ? styles.buttonDark : {})
    ]

    const styleButtonText = [
        styles.buttonText,
        (theme === THEME_DARK ? styles.buttonTextDark : {})
    ]

    return (
        <TouchableOpacity
            style={styleButton}
            onPress={() => {
                onPress();
            }}
        >
            {icon && <Image
                source={icon}
                style={styles.buttonImage}
            />}
            <Text style={styleButtonText}>
                {text}
            </Text>
            {renderExtend && <>{renderExtend}</>}
        </TouchableOpacity>
    )
}

export default TouchAction;
const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        backgroundColor: LIGHT_2,
        padding: 10,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDark: {
        backgroundColor: DARK_2,
    },
    buttonImage: {
        height: 40,
        width: 40,
    },
    buttonText: {
        color: DARK_1,
        fontWeight: '400',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    buttonTextDark: {
        color: LIGHT_1
    }
})
