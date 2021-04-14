import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    TextInput,
} from 'react-native';
import RNRestart from 'react-native-restart'; 



import { StackNav, TabNav } from '../utils/navigation';
import { saveToStorageValue, getFromStorage } from '../packages/AsyncStorage';
import { Storage, Colors } from '../constants';
import { getRawDate } from '../utils/helpers';

const MonthlyBudgetScreen = (props: any) => {
    const [amount, setAmount] = useState('');
    const [currentBudget, setCurrentBudget] = useState('0.00');

    useEffect(() => {
        getCurrentBudget();
    }, [])

    const getCurrentBudget = async () => {
        const budgetDetails: any = await getFromStorage(Storage.CURRENT_MONTH_BUDGET);
        if (budgetDetails)
            setCurrentBudget(budgetDetails.budget)
    }

    const saveBudgetToStorage = async () => {
        const data = { budget: amount, month: getRawDate().getMonth() + 1 }
        saveToStorageValue(Storage.CURRENT_MONTH_BUDGET, data);
        RNRestart.Restart();
    }

    const onBackPressed = () => {
        props.setVisibleScreen(TabNav.CounterScreen);
        setAmount('');
    }

    const budgetConfirmationDialog = () => {
        Alert.alert(
            `Budget is ${amount}, right?`,
            '',
            [
                { text: "Cancel" },
                { text: "OK", onPress: saveBudgetToStorage }
            ],
            { cancelable: true }
        )
    }

    return (
        <>
            {props.visibleScreen === StackNav.MonthlyBudgetScreen &&
                <SafeAreaView>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onBackPressed}>
                            <Text style={styles.buttonText}>BACK</Text>
                        </TouchableOpacity>
                        <View style={styles.formContainer}>
                            <Text style={styles.formHeader}>{currentBudget} is our currently set budget</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder={'Amount'}
                                onChangeText={setAmount}
                                value={amount}
                                editable
                                maxLength={40}
                                keyboardType={'decimal-pad'}
                            />
                            <TouchableOpacity
                                disabled={amount === ''}
                                style={styles.confirmationButton}
                                onPress={budgetConfirmationDialog}
                            >
                                <Text style={styles.addExpenseButtonText}>
                                    Set Budget
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: '100%'
    },
    button: {
        flex: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 8,
    },
    buttonText: {
        color: Colors.DANGER_RED,
        fontSize: 16,
    },
    formContainer: {
        padding: 16,
        marginTop: '40%',
    },
    formHeader: {
        fontSize: 18,
        fontWeight: '600',
    },
    formInput: {
        height: 64,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        fontSize: 18,
    },
    confirmationButton: {
        height: 48,
        borderRadius: 2,
        backgroundColor: '#98a6ae',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    }
});

export default MonthlyBudgetScreen;
