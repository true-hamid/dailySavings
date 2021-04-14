import React, { useState } from 'react'
import { FlatList, View, Text, Image, StyleSheet } from 'react-native'

import { CardView } from '..';

import { getTransactionDateAndTime, formatToMoney } from '../../utils/helpers';
import { Colors } from '../../constants';

const PaymentsHistoryList = (props: any) => {

    const EmptyView = () => (
        <View style={styles.emptyListContainer} >
            <Image source={require('../../assets/png/broke.png')} />
        </View>
    );

    const Item = ({ amount, payedTo, date, index }) => (
        <View style={styles.main}>
            <CardView containerStyle={styles.cardView}>
                <View style={styles.leftContainer}>
                    <Text style={styles.descriptionText}>{payedTo}</Text>
                    <Text>{getTransactionDateAndTime(date)}</Text>
                </View>
                <Text style={styles.amoutForMonthText}>
                    {formatToMoney(amount)}
                    <Text style={styles.aedText}> AED</Text>
                </Text>
            </CardView>
        </View>
    );


    const renderItem = ({ item, index }) => (
        <Item
            amount={item.amount}
            payedTo={item.payedTo}
            date={item.timeStamp}
            index={index}
        />
    );

    return (
        <FlatList
            data={props.payments}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyView />}
        />
    )
}


const styles = StyleSheet.create({
    cardView: {
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'column',
    },
    descriptionText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    amoutForMonthText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.DANGER_RED,
    },
    aedText: {
        fontWeight: '100',
        fontSize: 14,
    },
    emptyListContainer: {
        flex: 1,
        marginTop: 128,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PaymentsHistoryList;
