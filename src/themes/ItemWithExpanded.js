import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DARK_2, LIGHT_2} from '../utils/colors';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';

const ItemWithExpanded = (props) => {
    const {
        renderItem,
        renderItemExpanded
    } = props;
    const {
        theme
    } = useContext(AppContext);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setIsExpanded(prev => !prev)
                }}
            >
                {renderItem}
            </TouchableOpacity>
            {isExpanded && <View style={[
                styles.expanded,
                (theme === THEME_DARK ? styles.expandedDark : {})
            ]}>
                {renderItemExpanded}
            </View>}
        </View>
    )
}
export default ItemWithExpanded;
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    expanded: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: LIGHT_2,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
    },
    expandedDark: {
        backgroundColor: DARK_2,
    }
})
