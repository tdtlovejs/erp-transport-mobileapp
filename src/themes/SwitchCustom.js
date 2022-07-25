import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {THEME_DARK} from '../utils/constants';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../contexts/AppContext';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SwitchCustom = (props) => {
    const {
        listOptions,
        optionValueInit,
        onChange,
        conditionCanNotChange,
        valueCanNotChange,
        handleCanNotChange
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const [optionValue, setOptionValue] = useState(optionValueInit);

    useEffect(() => {
        if (optionValue !== optionValueInit) {
            onChange(optionValue)
        }
    }, [optionValue])

    return (
        <TouchableOpacity style={[
            styles.switchMode,
            (theme === THEME_DARK ? styles.switchModeDark : {}),
        ]}>
            {
                listOptions.map((itemOption, index) => {
                    return (
                        <Pressable
                            style={[
                                styles.optionMode,
                                (theme === THEME_DARK ? styles.optionModeDark : {}),
                                (optionValue === itemOption.value ? (theme === THEME_DARK ? styles.optionModeActiveDark : styles.optionModeActive) : {})
                            ]}
                            key={index}
                            onPress={() => {

                                if (optionValue !== itemOption.value) {
                                    if (conditionCanNotChange && valueCanNotChange === itemOption.value) {
                                        if (typeof handleCanNotChange === 'function') {
                                            handleCanNotChange()
                                        }
                                    } else {
                                        setOptionValue(itemOption.value)
                                    }
                                }
                            }}
                        >
                            {
                                itemOption.hasOwnProperty('label') && <Text
                                    style={[
                                        styles.optionModeText,
                                        (theme === THEME_DARK ? styles.optionModeTextDark : {}),
                                        (optionValue === itemOption.value ? (theme === THEME_DARK ? styles.optionModeTextActiveDark : styles.optionModeTextActive) : {})
                                    ]}
                                >
                                    {itemOption.label}
                                </Text>

                            }
                            {
                                itemOption.hasOwnProperty('icon') && <IonIcon
                                    name={itemOption.icon}
                                    size={18}
                                    color={optionValue === itemOption.value ? (theme === THEME_DARK ? DARK_1 : LIGHT_1) : (theme === THEME_DARK ? LIGHT_1 : DARK_1)}
                                />
                            }
                            {
                                itemOption.hasOwnProperty('image') &&  <Image
                                    source={itemOption.image}
                                    style={styles.image}
                                />
                            }
                        </Pressable>
                    )
                })
            }

        </TouchableOpacity>
    )
}

export default SwitchCustom;
const styles = StyleSheet.create({
    switchMode: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: DARK_1,
        backgroundColor: LIGHT_2,
        borderRadius: 21,
    },
    switchModeDark: {
        borderColor: LIGHT_1,
        backgroundColor: DARK_2,
    },
    optionMode: {
        width: 'auto',
        borderRadius: 21,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    optionModeDark: {
        backgroundColor: DARK_2,
    },
    optionModeActive: {
        backgroundColor: DARK_2,
    },
    optionModeActiveDark: {
        backgroundColor: LIGHT_2,
    },
    optionModeText: {
        textAlign: 'center',
        color: DARK_1,
        fontWeight: '500'
    },
    optionModeTextDark: {
        color: LIGHT_1,
    },
    optionModeTextActive: {
        color: LIGHT_1,
    },
    optionModeTextActiveDark: {
        color: DARK_1,
    },
    image: {
        height: 18,
        width: 18,
    }
})
