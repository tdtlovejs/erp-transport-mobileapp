import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
const ViewItem = (props) => {
    const {
        icon,
        label,
        view,
        isViewComponent
    } = props;
    const {
        theme,
    } = useContext(AppContext);
    return (
        <View style={styles.container}>
            {(label || icon) && <View style={styles.title}>
                {
                    icon && <Image
                        source={icon}
                        style={styles.titleImage}
                    />
                }
                {label && <Text style={[
                    styles.titleText,
                    (theme === THEME_DARK ? styles.titleTextDark : {})
                ]}>
                    {label}
                </Text>}
            </View>}
            <View style={styles.view}>
                {
                    isViewComponent
                        ?
                        <>{view}</>
                        :
                        <Text style={[
                            styles.viewText,
                            (theme === THEME_DARK ? styles.viewTextDark : {})
                        ]}>
                            {view}
                        </Text>
                }
            </View>
        </View>
    )
}

export default ViewItem;
const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleImage: {
        height: 36,
        width: 36,
        marginRight: 10,
    },
    titleText: {
        fontSize: 15,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: DARK_1
    },
    titleTextDark: {
        color: LIGHT_1
    },
    view: {
        paddingVertical: 2,
        alignItems: 'flex-start'
    },
    viewText: {
        color: DARK_2,
        fontSize: 14,
        fontWeight: '300',

    },
    viewTextDark: {
        color: LIGHT_2,
    }
})
