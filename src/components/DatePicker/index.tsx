import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';
import { Arrays } from '../../constants';
import { getRawDate } from '../../utils/helpers';

const DatePicker = (props: any) => {
    const { visible, setVisible, setDate } = props;
    const [date, setStateDate] = useState(getRawDate());

    useEffect(() => {
        onChange(null,date);
    }, [])

    const onChange = (event: any, selectedDate: any) => {
        // const currentDate = selectedDate || date;
        setStateDate(selectedDate);
        const formattedMonth = new Date(selectedDate).getMonth();
        const formattedYear = new Date(selectedDate).getFullYear();
        const formattedDate = `${Arrays.YEAR_MONTHS[formattedMonth]}/${formattedYear}` 
        
        // setVisible(Platform.OS === 'ios');
        setDate(formattedDate);
    };

    return (
        <>
            {visible &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date('2020-12-01T00:00:00-00:00')}
                    maximumDate={getRawDate()}
                    style={props.style}
                />
            }
        </>

    )
}

export default DatePicker;
