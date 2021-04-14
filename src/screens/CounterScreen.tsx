import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Clipboard from '@react-native-community/clipboard';

import { TabNav, StackNav } from '../utils/navigation';
import { getFromStorage, saveToStorageValue, removeFromStorage } from '../packages/AsyncStorage';
import TwoColumnsRow from '../components/TwoColumnsRow';
import { savePaymentToStorage, formatToMoney, getRawDate, PAYED_TO } from '../utils/helpers';
import { Storage, Colors, Arrays } from '../constants';
import { SecondaryButton, PrimaryButton } from '../components';

const CounterScreen = (props: any) => {

    const [amoutLeftForMonth, setAmoutLeftForMonth] = useState('0.00');
    const [currentMonthBudget, setCurrentMonthBudget] = useState(-1);
    const [todaySpending, setTodaySpending] = useState('0.00');
    const [currentMonth, setCurrentMonth] = useState(-1);
    const [daysGoneInMonth, setDaysGoneInMonth] = useState(-1);
    const [daysLeftInMonth, setDaysLeftInMonth] = useState(-1);
    const [averageDailySpending, setAverageDailySpending] = useState(-1);
    const [maxDailySpending, setMaxDailySpending] = useState(-1);

    useEffect(() => {
        if (props.visibleScreen === TabNav.CounterScreen) {
            monthSetup();
        }
    }, [, props.visibleScreen]);

    useEffect(() => {
        if (currentMonth !== -1 && currentMonth !== null) {
            daysInMonthManager();
        }
    }, [currentMonth]);

    useEffect(() => {
        if (daysGoneInMonth !== -1 && daysLeftInMonth !== -1) {
            dashboardManager();
        }
    }, [daysGoneInMonth, daysLeftInMonth, props.visibleScreen]);

    const dashboardManager = async () => {
        const monthBudget = await getMonthTotalBudget();
        const spentThisMonth = await getTotalSpentThisMonth();

        if (spentThisMonth) {
            const spentToday = await getTotalSpentToday();
            setTodaySpending(formatToMoney(spentToday));
        }

        if (monthBudget) {
            setCurrentMonthBudget(monthBudget);

            const amoutLeftForMonth = monthBudget - spentThisMonth;
            setAmoutLeftForMonth(formatToMoney(amoutLeftForMonth));

            const maxDailySpending = amoutLeftForMonth / daysLeftInMonth;
            setMaxDailySpending(formatToMoney(maxDailySpending));

            const averageDailSpending = daysGoneInMonth !== 0 ? spentThisMonth / daysGoneInMonth : spentThisMonth;
            setAverageDailySpending(formatToMoney(averageDailSpending));
        }

        if (monthBudget === null && props.visibleScreen === TabNav.CounterScreen) {
            Alert.alert(
                "Please setup this month's budget",
                "",
                [
                    { text: "OK", onPress: () => props.setVisibleScreen(StackNav.MonthlyBudgetScreen) },
                ],
                { cancelable: false }
            );
        }
    }

    const getMonthTotalBudget = async () => {
        const monthBudgetStorage: any = await getFromStorage(Storage.CURRENT_MONTH_BUDGET);

        if (monthBudgetStorage) {
            const { budget, month } = monthBudgetStorage;
            //check if the budget month is the current month, otherwise default currentBudget in the storage
            // console.warn('month', month, 'curr', currentMonth);
            if (month == currentMonth) {
                return budget;
            } else if (currentMonth !== -1 && currentMonth !== null) {
                showEndOfTheMonthDialog(month);
                // return null;
            }
        } else {
            return null;
        }
    }

    const getTotalSpentThisMonth = async () => {
        const monthlyPayments: any = await getFromStorage(Storage.CURRENT_MONTH_PAYMENT);
        let totalSpent = 0;
        if (monthlyPayments) {
            for (let i = 0; i < monthlyPayments.length; i++) {
                const payment = monthlyPayments[i].amount
                totalSpent = totalSpent + Number(payment);
            }
        }
        return totalSpent;
    }

    const getTotalSpentToday = async () => {
        const monthlyPayments: any = await getFromStorage(Storage.CURRENT_MONTH_PAYMENT);
        const todaysTransactions =
            monthlyPayments.filter((transaction: any) =>
                new Date(transaction.timeStamp).getDate() === getRawDate().getDate()
            );
        let totalSpent = 0;
        if (todaysTransactions) {
            for (let i = 0; i < todaysTransactions.length; i++) {
                const payment = todaysTransactions[i].amount
                totalSpent = totalSpent + Number(payment);
            }
        }
        return totalSpent;
    }

    const generateEndOfTheMonthReport = async () => {
        const usageHistory: any = await getFromStorage(Storage.USAGE_HISTORY);
        const monthBudget: any = await getFromStorage(Storage.CURRENT_MONTH_BUDGET);
        const monthPayments = await getFromStorage(Storage.CURRENT_MONTH_PAYMENT);
        console.warn(monthBudget.month);
        const endOfTheMonthReport = {
            date: `${monthBudget.month}/${ monthBudget.month == '12' ? getRawDate().getFullYear() - 1 : getRawDate().getFullYear()}`,
            budget: monthBudget.budget,
            payments: monthPayments,
        };

        if (usageHistory) {
            const updatedUsageHistory = [...usageHistory, endOfTheMonthReport];
            saveToStorageValue(Storage.USAGE_HISTORY, updatedUsageHistory);
        } else {
            saveToStorageValue(Storage.USAGE_HISTORY, [endOfTheMonthReport]);
        }

        return 'done';
    }

    const monthSetup = async () => {
        const month = getRawDate().getMonth();
        const currentMonth = `${month + 1}`;
        const monthInStorage = await getFromStorage(Storage.CURRENT_MONTH);
        if (monthInStorage !== currentMonth) {
            saveToStorageValue(Storage.CURRENT_MONTH, currentMonth);
        }
        setCurrentMonth(currentMonth);
    }

    const daysInMonthManager = () => {
        const dayToday = getRawDate().getDate();
        const daysInThisMonth = getDaysInThisMonth();
        setDaysGoneInMonth(dayToday - 1);
        setDaysLeftInMonth(daysInThisMonth - dayToday);
    }

    const getDaysInThisMonth = () => {
        return new Date(getRawDate().getFullYear(), currentMonth, 0).getDate()
    }

    const showEndOfTheMonthDialog = (month: number) => {
        Alert.alert(
            `End ${Arrays.YEAR_MONTHS[month - 1]}'s cycle?`,
            "",
            [
                { text: "Cancel", onPress: () => { showEndOfTheMonthDialog(month) } },
                { text: "OK", onPress: endMonthProcesses },
            ],
            { cancelable: false }
        );
    }

    const endMonthProcesses = async () => {
        const reportGenerated = await generateEndOfTheMonthReport();
        if (reportGenerated === 'done') {
            removeFromStorage(Storage.CURRENT_MONTH_BUDGET);
            removeFromStorage(Storage.CURRENT_MONTH);
            removeFromStorage(Storage.CURRENT_MONTH_PAYMENT);
        }
    }

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        // const text = 'Purchase of AED 32.00 with Debit Card ending 3814 at BROADWAY SUPERMARKET, DUBAI. Avl Balance is AED 5,066.73.';
        try {
            const payedAmount = text.split("with")[0].split("AED")[1].trim();
            const payedTo = text.split("at")[1].split(",")[0].trim();
            Alert.alert(
                "Payment Details",
                `${payedAmount} to ${payedTo}, right?`,
                [
                    { text: "Yes", onPress: () => {
                        saveToStorageValue(Storage.PAYED_TO, payedTo);  
                        saveToStorageValue(Storage.PAYED_AMOUNT, payedAmount);  
                        props.setVisibleScreen(StackNav.PaymentDetailsScreen);
                    }},
                    {
                        text: "Manual Entry",
                        onPress: () => props.setVisibleScreen(StackNav.PaymentDetailsScreen)
                    },
                    { text: "Cancel" },
                ],
                { cancelable: true }
            );
        } catch (error) {
            props.setVisibleScreen(StackNav.PaymentDetailsScreen)
        }
    };

    return (
        <>
            {props.visibleScreen === TabNav.CounterScreen &&
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.container}>
                        <View style={[styles.rowMain, styles.headerContainer]}>
                            <Text style={styles.dateText}>
                                {getRawDate().toDateString()}
                            </Text>
                        </View>

                        <View style={styles.rowMain}>
                            <Text
                                style={
                                    [
                                        styles.amoutForMonthText,
                                        maxDailySpending !== -1 && Number(todaySpending) > Number(maxDailySpending) ?
                                            styles.redFont
                                            : {}]}>
                                {todaySpending} <Text style={styles.aedText}>AED</Text>
                            </Text>
                        </View>
                        <Text style={styles.mainSectionTitle}>spent today</Text>

                        <View style={styles.rowMain}>
                            <Text style={[styles.amoutForMonthText, ((amoutLeftForMonth / currentMonthBudget) * 100) < 10 && currentMonthBudget !== -1 ? styles.redFont : {}]}>
                                {amoutLeftForMonth} <Text style={styles.aedText}>AED</Text>
                            </Text>
                        </View>
                        <Text style={styles.mainSectionTitle}>until the end of the month</Text>

                        <TwoColumnsRow
                            leftSection={
                                <>
                                    <View style={styles.rowMain}>
                                        <Text style={styles.daysText}>
                                            {daysGoneInMonth !== -1 ? daysGoneInMonth : 'N/A'}
                                        </Text>
                                    </View>
                                    <Text style={styles.sectionTitle}>days gone</Text>
                                </>
                            }
                            rightSection={
                                <>
                                    <View style={styles.rowMain}>
                                        <Text style={styles.daysText}>
                                            {daysLeftInMonth !== -1 ? daysLeftInMonth : 'N/A'}
                                        </Text>
                                    </View>
                                    <Text style={styles.sectionTitle}>days left</Text>
                                </>
                            }
                        />

                        <TwoColumnsRow
                            leftSection={
                                <>
                                    <View style={styles.rowMain}>
                                        <Text style={styles.amountSpentAverageText}>
                                            {averageDailySpending !== -1 ? averageDailySpending : 'N/A '}
                                            <Text style={styles.aedPerDayText}>AED/Day</Text>
                                        </Text>
                                    </View>
                                    <Text style={styles.sectionTitle}>Average Daily Spending</Text>
                                </>
                            }
                            rightSection={
                                <>
                                    <View style={styles.rowMain}>
                                        <Text style={styles.amountSpentAverageText}>
                                            {maxDailySpending !== -1 ? maxDailySpending : 'N/A '}
                                            <Text style={styles.aedPerDayText}>AED/Day</Text>
                                        </Text>
                                    </View>
                                    <Text style={styles.sectionTitle}>Max Daily Spending</Text>
                                </>
                            }
                        />
                        <PrimaryButton
                            label='Add Expense'
                            onPress={fetchCopiedText}
                        />
                        <SecondaryButton
                            label='Set/Reset Month Budget'
                            onPress={() => props.setVisibleScreen(StackNav.MonthlyBudgetScreen)}
                            style={styles.setBudgetButton}
                        />

                    </View>
                </ScrollView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    engine: {
        position: 'absolute',
        right: 0,
    },
    container: {
        width: '100%',
        backgroundColor: Colors.APP_BACKGROUND,
    },
    rowMain: {
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'center',
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.PRIMRAY_COLOR,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    dateText: {
        fontSize: 24,
    },
    mainSectionTitle: {
        fontSize: 16,
        marginHorizontal: 16,
        textAlign: 'right'
    },
    sectionTitle: {
        fontSize: 16,
        marginHorizontal: 16,
        textAlign: 'center',
    },
    amoutForMonthText: {
        fontSize: 64,
        marginTop: 16,
    },
    redFont: {
        color: Colors.DANGER_RED,
    },
    aedText: {
        fontSize: 24,
    },
    daysText: {
        fontSize: 48,
    },
    amountSpentAverageText: {
        fontSize: 48,
    },
    aedPerDayText: {
        fontSize: 16,
    },
    addExpenseButton: {
        height: 64,
        borderRadius: 2,
        backgroundColor: Colors.PRIMRAY_COLOR,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 16,
    },
    setBudgetButton: {
        marginBottom: 16
    },
    addExpenseButtonText: {
        color: Colors.JET_BLACK,
        fontWeight: 'bold'
    }
});

export default CounterScreen;
