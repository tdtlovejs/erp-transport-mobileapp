import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';

const Input = (props) => {
    const {
        style,
        editable,
        secureTextEntry,
        inputType,
        multiline,
        keyboardType
    } = props;
    const {
        theme,
    } = useContext(AppContext);
    const [secureTextEntryState, setSecureTextEntryState] = useState(secureTextEntry);

    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                placeholderTextColor={theme === THEME_DARK ? LIGHT_2 : DARK_2}
                style={[
                    styles.input,
                    (theme === THEME_DARK ? styles.inputDark : {}),
                    (inputType === "password" ? styles.inputPassword : {}),
                    (multiline ? styles.multiline : {}),
                    (keyboardType === "numeric" ? styles.inputNumber : {}),
                    style,
                ]}
                editable={editable === undefined ? true : editable}
                secureTextEntry={secureTextEntryState}
                textAlign={keyboardType === "numeric" ? 'right' : undefined}
            />
            {inputType === "password" && <TouchableOpacity
                onPress={() => {
                    setSecureTextEntryState(prev => !prev)
                }}
                style={styles.eyeIcon}
            >
                <IonIcon
                    name={secureTextEntryState ? 'eye-off' : 'eye'}
                    size={24}
                    color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                />
            </TouchableOpacity>}
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: LIGHT_2,
        color: DARK_1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginVertical: 5,
        width: '100%',
        fontSize: 14,
        height: 50,
    },
    inputDark: {
        backgroundColor: DARK_2,
        color: LIGHT_1,
    },
    inputPassword: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 5,
    },
    multiline: {
        height: 100,
    },
    inputNumber: {
        textAlign: 'right'
    }
})
