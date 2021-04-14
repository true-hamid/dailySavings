import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    TextInput,
} from 'react-native';


import { StackNav, TabNav } from '../utils/navigation';
import { savePaymentToStorage, formatToMoney } from '../utils/helpers';
import { PrimaryButton, SelectButtons } from '../components';
import { PAYMENT_TYPES } from '../constants/arrays';
import { getFromStorage } from '../packages/AsyncStorage';
import { Storage, Arrays } from '../constants';

const PaymentDetailsScreen = (props: any) => {
    const [amount, setAmount] = useState('');
    const [payedTo, setPayedTo] = useState('');
    const [paymentType, setPaymentType] = useState('');

    useEffect(() => {
        if (props.visibleScreen === StackNav.PaymentDetailsScreen)
            getPayedToAndAmountFromStorage();
    }, [props.visibleScreen]);

    // useEffect(() => {
    //     if (payedTo)
    //         smartSwitch();
    // }, [payedTo]);

    const getPayedToAndAmountFromStorage = async () => {
        const payedTo = await getFromStorage(Storage.PAYED_TO);
        if (payedTo) {
            setPayedTo(payedTo);
        }
        const payedAmount = await getFromStorage(Storage.PAYED_AMOUNT);
        if (payedAmount) {
            setAmount(payedAmount);
        }
    }

    const onBackPressed = () => {
        props.setVisibleScreen(TabNav.CounterScreen);
        setAmount('');
        setPayedTo('');
    }

    const paymentConfirmationDialog = () => {
        Alert.alert(
            `Payed ${amount} for ${payedTo}, right?`,
            '',
            [
                { text: "Cancel" },
                { text: "OK", onPress: () => savePaymentToStorage(amount, payedTo, onBackPressed) }
            ],
            { cancelable: true }
        )
    }

    const autoSetPaymentType = (index) => {
        setPaymentType(Arrays.PAYMENT_TYPES[index].value)
    }

//     const smartSwitch = () => {
//         // switch (payedTo) {
//         if (payedTo.toLowerCase().includes(' mart') || payedTo.toLowerCase().includes(' supermarket')) {
//             autoSetPaymentType(0);
//             return;
//         }
//         // else if()
//         // case :
//         // case :
//         //     autoSetPaymentType(0)
    
// }

return (
    <>
        {props.visibleScreen === StackNav.PaymentDetailsScreen &&
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onBackPressed}>
                        <Text style={styles.buttonText}>BACK</Text>
                    </TouchableOpacity>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.formInput}
                            placeholder={'Amount'}
                            onChangeText={setAmount}
                            value={amount}
                            editable
                            maxLength={40}
                            keyboardType={'decimal-pad'}
                        />
                        <TextInput
                            style={styles.formInput}
                            placeholder={'Payed To'}
                            onChangeText={setPayedTo}
                            value={payedTo}
                            editable
                            maxLength={40}
                        />
                        <SelectButtons
                            data={PAYMENT_TYPES}
                            selectedButton={paymentType}
                            onSelection={setPaymentType}
                        />
                        <PrimaryButton
                            disabled={amount === '' || payedTo === '' || paymentType === ''}
                            style={styles.confirmationButton}
                            onPress={paymentConfirmationDialog}
                            label='Confirm Payment'
                        />
                    </View>
                </View>
            </SafeAreaView>
        }
    </>
);
};

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#F3F3F3',
    },
    container: {
        backgroundColor: '#F3F3F3',
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
        color: '#d10000',
        fontSize: 16,
    },
    formContainer: {
        padding: 16,
        marginTop: '20%',
    },
    formInput: {
        height: 64,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
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

export default PaymentDetailsScreen;
