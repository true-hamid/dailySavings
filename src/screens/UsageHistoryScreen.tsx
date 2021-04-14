import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Platform } from 'react-native'

import { TabNav } from '../utils/navigation'
import { DatePicker, PaymentsHistory } from '../components';
import { SecondaryButton } from '../components/Button';
import { Colors, Storage, Arrays } from '../constants';
import { getFromStorage, removeFromStorage } from '../packages/AsyncStorage';

const UsageHistoryScreen = (props: any) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [data, setData] = useState([])
    const [paymentsHistory, setPaymentsHistory] = useState([]);

    useEffect(() => {
        if (props.visibleScreen === TabNav.UsageHistoryScreen) {
            getData();
        }
    }, [props.visibleScreen]);

    useEffect(() => {
        if (!pickerVisible && selectedDate) {
            if (data) {
                const datum = data.find((datum: any) => compareDates(datum));
                if (datum) {
                    setPaymentsHistory(datum.payments);
                }
            }
        }
    }, [data]);
    
    useEffect(() => {
        if (data) {
            const datum = data.find((datum: any) => compareDates(datum));
            if (datum) {
                setPaymentsHistory(datum.payments);
            }else {
                setPaymentsHistory([]);
            }
        };
    }, [selectedDate]);

    const compareDates = (datum: any) => {
        const month = datum.date.split('/')[0] - 1;
        const year = datum.date.split('/')[1];
        console.warn(`${Arrays.YEAR_MONTHS[month]}/${year}`, selectedDate)
        return (`${Arrays.YEAR_MONTHS[month]}/${year}` === selectedDate);
    }

    const getData = async () => {
        // removeFromStorage(Storage.USAGE_HISTORY);
        const data = await getFromStorage(Storage.USAGE_HISTORY);
        setData(data);
    }

    return (
        <>
            {
                props.visibleScreen === TabNav.UsageHistoryScreen &&
                <SafeAreaView style={styles.safeAreaView}>
                    <View style={styles.container}>
                        <SecondaryButton
                            label={selectedDate || 'Selected Report Time'}
                            onPress={() => setPickerVisible(!pickerVisible)}
                            style={styles.dateSelectButton}
                            textStyle={styles.calendarButtonText}
                            endIcon={Platform.OS == 'ios' ? pickerVisible ? 'caret-up' : 'caret-down' : 'calendar-alt'}
                        />
                        <DatePicker
                            visible={pickerVisible}
                            setVisible={setPickerVisible}
                            setDate={setSelectedDate}
                        />
                        <PaymentsHistory
                            payments={paymentsHistory}
                        />
                    </View>
                </SafeAreaView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.APP_BACKGROUND,
        height: '100%'
    },
    container: {
        backgroundColor: Colors.APP_BACKGROUND,
        padding: 16,
        flex: 1,
    },
    dateSelectButton: {
        flex: 0.1,
    },
    calendarButtonText: {
        fontSize: 20,
    },
    reportContainer: {}
});

export default UsageHistoryScreen;
