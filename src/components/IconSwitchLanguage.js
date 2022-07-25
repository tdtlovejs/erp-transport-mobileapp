import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {LANGUAGE_EN, LANGUAGE_VI} from '../utils/constants';
import SwitchCustom from '../themes/SwitchCustom';
const listLanguage = [
    {
        value: LANGUAGE_EN,
        image: require('./../assets/images/en.png')
    },
    {
        value: LANGUAGE_VI,
        image: require('./../assets/images/vi.png')
    }
]
const IconSwitchLanguage = (props) => {
    const {
        language,
        setLanguage,
    } = useContext(AppContext);

    return (
        <SwitchCustom
            listOptions={listLanguage}
            onChange={(value) => {
                setLanguage(value);
            }}
            optionValueInit={language}
        />
    )
}

export default IconSwitchLanguage;
