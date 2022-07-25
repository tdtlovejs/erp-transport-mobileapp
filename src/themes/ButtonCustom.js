import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ACTIVE_1, LIGHT_1, LIGHT_2} from '../utils/colors';
const ButtonCustom = (props) => {
    const {
        text,
        onPress
    } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonCustom;
const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: ACTIVE_1,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: LIGHT_1,
        fontWeight: '500',
        fontSize: 15,
        textTransform: 'uppercase'
    },
})
