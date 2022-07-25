import React,{useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';

const LoadingAction = (props) => {
    const {
        loading
    } = useContext(AppContext);
    if (!loading) {
        return (
            <></>
        )
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default LoadingAction;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(4, 41, 58, 0.3)',
    },
})
