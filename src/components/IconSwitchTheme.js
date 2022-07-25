import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK, THEME_LIGHT} from '../utils/constants';
import SwitchCustom from '../themes/SwitchCustom';
const listTheme = [
    {
        value: THEME_LIGHT,
        image: require('./../assets/images/light.png')
    },
    {
        value: THEME_DARK,
        image: require('./../assets/images/dark.png')
    }
]
const IconSwitchTheme = (props) => {
    const {
        theme,
        setTheme,
    } = useContext(AppContext);

    return (
        <SwitchCustom
            listOptions={listTheme}
            onChange={(value) => {
                setTheme(value);
            }}
            optionValueInit={theme}
        />
    )
}

export default IconSwitchTheme;
