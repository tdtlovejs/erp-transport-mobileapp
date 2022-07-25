import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {DARK_1, DARK_2, LIGHT_1, LIGHT_2} from '../utils/colors';
import {AppContext} from '../contexts/AppContext';
import {THEME_DARK} from '../utils/constants';
import IonIcon from 'react-native-vector-icons/Ionicons';

const DatePickerCustom = (props) => {
    const {
        onChange,
        mode
    } = props;
    const {
        theme,
    } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(props.date ?? null);

    const viewDate = (date) => {
        switch (mode) {
            case "datetime":
                return moment(date).format('LLL');
            default:
                return moment(date).format('L')
        }
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                style={[
                    styles.dateBtn,
                    (theme === THEME_DARK ? styles.dateBtnDark : {})
                ]}
            >
                <Text style={[
                    styles.dateText,
                    (theme === THEME_DARK ? styles.dateTextDark : {})
                ]}>
                    {date ? viewDate(date) : 'select date'}
                </Text>
                <IonIcon
                    name='calendar'
                    size={24}
                    color={theme === THEME_DARK ? LIGHT_1 : DARK_1}
                />
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                mode={mode || "date"}
                date={date ? new Date(date) : new Date()}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    onChange(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}

export default DatePickerCustom;
const styles = StyleSheet.create({
    dateBtn: {
        backgroundColor: LIGHT_2,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBtnDark: {
        backgroundColor: DARK_2,
    },
    dateText: {
        color: DARK_1,
        fontSize: 14,
        flex: 1,
    },
    dateTextDark: {
        color: LIGHT_1,
    }
})
