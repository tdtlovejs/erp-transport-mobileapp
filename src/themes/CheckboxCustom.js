import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const CheckboxCustom = (props) => {
    const {
        label,
        value,
        onChange,
        disabled
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const [checked, setChecked] = useState(!!value);
    return (
        <View style={styles.container}>
            {
                disabled
                    ?
                    <IonIcon
                        name={checked ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                    />
                    :
                    <TouchableOpacity
                        onPress={() => {
                            setChecked(prev => !prev)
                            onChange(!checked)
                        }}
                        style={styles.logoutBtn}
                    >
                        <IonIcon
                            name={checked ? 'checkbox' : 'square-outline'}
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                    </TouchableOpacity>
            }
            <Text style={[
                styles.labelText,
                (theme === THEME_DARK ? styles.labelTextDark : {})
            ]}>
                {label}
            </Text>
        </View>
    )
}

export default CheckboxCustom;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelText: {
        color: DARK_2,
        paddingLeft: 5,
    },
    labelTextDark: {
        color: LIGHT_2,
    }
})
