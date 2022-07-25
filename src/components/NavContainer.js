import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import Login from '../modules/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import CustomTabNavigation from './CustomTabNavigation';
import LoadingAction from '../themes/LoadingAction';
import ModalViewPdf from "../themes/ModalViewPdf";

const NavContainer = (props) => {
    const {
        user,
        loadingUser,
        loadingTheme,
        loadingLanguage,
        pdfLink
    } = useContext(AppContext);

    if (!loadingUser || !loadingTheme | !loadingLanguage) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!user) {
        return (
            <>
                <Login

                />
                <LoadingAction />
            </>
        )
    }
    return (
        <NavigationContainer>
            <CustomTabNavigation {...props}/>
            <LoadingAction />
            {pdfLink && <ModalViewPdf />}
        </NavigationContainer>
    )
}

export default NavContainer;

const styles = StyleSheet.create({
    loadingContainer: {
        height: '100%',
        backgroundColor: '#e6edfc',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 999
    },
    tabBarLabel: {
        color: '#646187',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    tabBarLabel_active: {
        fontWeight: 'bold',
        fontSize: 14
    },
    tabBarLabel_dark: {
        color: '#fff'
    }
})
