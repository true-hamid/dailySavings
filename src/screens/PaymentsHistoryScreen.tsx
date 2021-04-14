import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from 'react-native';

import { TabNav } from '../utils/navigation';
import { getFromStorage } from '../packages/AsyncStorage';
import { getRawDate } from '../utils/helpers';
import { Arrays, Storage, Colors } from '../constants';
import PaymentsHistoryList from '../components/PaymentsHistoryList';

const PaymentsHistoryScreen = (props: any) => {
    const [payments, setPayment] = useState([]);
    

    useEffect(() => {
        if (props.visibleScreen === TabNav.PaymentsHistoryScreen) {
            getMonthlyPayments();
        }
    }, [props.visibleScreen]);

    const getMonthlyPayments = async () => {
        try {
            const monthPayments: any = await getFromStorage(Storage.CURRENT_MONTH_PAYMENT)
            setPayment(monthPayments.reverse());
        } catch (error) { }
    };

    return (
        <>
            {props.visibleScreen === TabNav.PaymentsHistoryScreen &&
                <SafeAreaView style={styles.safeAreaView}>
                    <View style={styles.container}>
                        <Text style={styles.pageTitle}>Payments for {Arrays.YEAR_MONTHS[getRawDate().getMonth()]}</Text>
                        <PaymentsHistoryList
                            payments={payments}
                        />
                    </View>
                </SafeAreaView>}
        </>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.APP_BACKGROUND,
    },
    container: {
        backgroundColor: Colors.APP_BACKGROUND,
        padding: 16,
        flex: 0,
        height: '100%'
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 32,
    },
});

export default PaymentsHistoryScreen;
