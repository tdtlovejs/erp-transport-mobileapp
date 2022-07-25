import React, {useContext, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DARK_1, LIGHT_1} from "../utils/colors";
import {THEME_DARK} from "../utils/constants";
import IonIcon from "react-native-vector-icons/Ionicons";
import IconSwitchTheme from "../components/IconSwitchTheme";
import IconSwitchLanguage from "../components/IconSwitchLanguage";
import {AppContext} from "../contexts/AppContext";

const ModalViewPdf = (props) => {
    const {
        pdfLink,
        setPdfLink,
        theme
    } = useContext(AppContext);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={!!pdfLink}
            onRequestClose={() => {
                setPdfLink(null);
            }}
        >
            <View style={[
                styles.modalWrapper,
                (theme === THEME_DARK ? styles.modalWrapperDark : {})
            ]}>
                <View style={[
                    styles.modalViewPdf,
                    (theme === THEME_DARK ? styles.modalViewPdfDark : {})
                ]}>
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => {
                            setPdfLink(null);
                        }}
                    >
                        <IonIcon
                            name='close'
                            size={24}
                            color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalViewPdf;
const styles = StyleSheet.create({
    modalWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(48, 71, 94, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalWrapperDark: {
        backgroundColor: 'rgba(214, 224, 240, 0.3)'
    },
    modalViewPdf: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: LIGHT_1,
        borderRadius: 9,
        padding: 10,
        width: '100%',
        height: '100%',
    },
    modalViewPdfDark: {
        backgroundColor: DARK_1,
    },
    closeModal: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    viewView: {
        height: '100%',
        backgroundColor: 'red'
    }
});
