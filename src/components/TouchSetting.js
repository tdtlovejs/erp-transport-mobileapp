import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, LIGHT_1} from '../utils/colors';
import IconSwitchTheme from './IconSwitchTheme';
import IconSwitchLanguage from './IconSwitchLanguage';
import React, {useContext, useState} from 'react';
import {AppContext} from '../contexts/AppContext';
import {useTranslation} from 'react-i18next';

const TouchSetting = (props) => {
    const {
        theme,
        lookupWord,
        setLookupWord,
    } = useContext(AppContext);
    const {t} = useTranslation();
    const [visibleSetting, setVisibleSetting] = useState(false);
    return (
        <>
            <TouchableOpacity
                style={styles.settingBtn}
                onPress={() => {
                    setVisibleSetting(true);
                }}
            >
                <IonIcon
                    name='settings'
                    size={24}
                    color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleSetting}
                onRequestClose={() => {
                    setVisibleSetting(false);
                }}
            >
                <View style={[
                    styles.modalWrapper,
                    (theme === THEME_DARK ? styles.modalWrapperDark : {})
                ]}>
                    <View style={[
                        styles.modalSetting,
                        (theme === THEME_DARK ? styles.modalSettingDark : {})
                    ]}>
                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => {
                                setVisibleSetting(false);
                            }}
                        >
                            <IonIcon
                                name='close'
                                size={24}
                                color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                            />
                        </TouchableOpacity>
                        <Text style={[
                            styles.labelSetting,
                            (theme === THEME_DARK ? styles.labelSettingDark : {})
                        ]}>
                            {t('modal_setting.settings')}
                        </Text>
                        <View style={styles.bodySetting}>
                            <View style={styles.itemSetting}>
                                <View style={styles.title}>
                                    <Text style={[
                                        styles.titleText,
                                        (theme === THEME_DARK ? styles.titleTextDark : {})
                                    ]}>
                                        {t('modal_setting.theme')}
                                    </Text>
                                </View>
                                <View style={styles.label}>
                                    <IconSwitchTheme />
                                </View>
                            </View>
                            <View style={styles.itemSetting}>
                                <View style={styles.title}>
                                    <Text style={[
                                        styles.titleText,
                                        (theme === THEME_DARK ? styles.titleTextDark : {})
                                    ]}>
                                        {t('modal_setting.language')}
                                    </Text>
                                </View>
                                <View style={styles.label}>
                                    <IconSwitchLanguage />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default TouchSetting;
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_1,
    },
    headerDark: {
        backgroundColor: DARK_1,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 18,
        color: DARK_1,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    headerTextDark: {
        color: LIGHT_1,
    },
    icon: {
        position: 'absolute',
        left: 16,
    },
    settingBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 999,
        elevation: 999,
        padding: 10,
    },
    modalWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(48, 71, 94, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalWrapperDark: {
        backgroundColor: 'rgba(214, 224, 240, 0.3)'
    },
    modalSetting: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: LIGHT_1,
        borderRadius: 9,
        padding: 10,
        width: '100%',
    },
    modalSettingDark: {
        backgroundColor: DARK_1,
    },
    closeModal: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    labelSetting: {
        color: DARK_1,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    labelSettingDark: {
        color: LIGHT_1,
    },
    bodySetting: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    itemSetting: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    title: {
        flex: 1,
        paddingHorizontal: 10,
    },
    titleText: {
        fontWeight: '500',
        fontSize: 16,
        color: DARK_1,
        textTransform: 'lowercase'
    },
    titleTextDark: {
        color: LIGHT_1,
    },
    label: {
        flex: 1,
        alignItems: 'center'
    }
});
