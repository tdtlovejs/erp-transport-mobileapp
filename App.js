import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppContextProvider from './src/contexts/AppContext';
import NavContainer from './src/components/NavContainer';

const App = (props) => {
    return (
        <View style={styles.container}>
            <AppContextProvider>
                <NavContainer />
            </AppContextProvider>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
})
