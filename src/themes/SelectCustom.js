import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
import {Picker} from '@react-native-picker/picker';
import {GENDER_FEMALE, GENDER_MALE, GENDER_SECRET, THEME_DARK} from '../utils/constants';
import {AppContext} from '../contexts/AppContext';
import {useTranslation} from 'react-i18next';
const SelectCustom = (props) => {
    const {
        value,
        options,
        onChange,
        notSelectLabel,
        enabled
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const {t} = useTranslation();
    const [select, setSelect] = useState(value);
    useEffect(() => {
        if (select !== value) {
            if (typeof onChange === 'function') {
                onChange(select);
            }
        }
    }, [select])
    return (
        <View style={[
            styles.container,
            (theme === THEME_DARK ? styles.containerDark : {})

        ]}>
            <Picker
                selectedValue={select}
                onValueChange={(itemValue, itemIndex) => {
                    console.log(itemValue)
                    setSelect(itemValue);
                }}
                style={[
                    styles.select,
                    (theme === THEME_DARK ? styles.selectDark : {})
                ]}
                mode="dialog"
                dropdownIconColor={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                enabled={enabled !== undefined ? !!enabled : true}
            >
                {!notSelectLabel && <Picker.Item label={t('label.select')} value='' />}
                {/*{!notSelectLabel && <Picker.Item label={t('label.select')} value={null} />}*/}
                {
                    options.map((itemOption, indexOption) => {
                        return (
                            <Picker.Item label={itemOption.label} value={itemOption.value} key={indexOption}/>
                        )
                    })
                }
            </Picker>
        </View>
    )
}

export default SelectCustom;
const styles = StyleSheet.create({
    container: {
        backgroundColor: LIGHT_2,
        borderRadius: 5,
        overflow: 'hidden',
        height: 50,
        justifyContent: 'center'
    },
    containerDark: {
        backgroundColor: DARK_2,
    },
    select: {
        backgroundColor: LIGHT_2,
        color: DARK_1,
    },
    selectDark: {
        backgroundColor: DARK_2,
        color: LIGHT_1,
    },
    itemSelect: {
        color: DARK_2,
    }
})
