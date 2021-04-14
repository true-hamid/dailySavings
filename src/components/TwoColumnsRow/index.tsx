import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const TwoColumnsRow = (props: any) => {

    return (
        <View style={styles.container}>
            <View style={[styles.leftSection]}>
                {props.leftSection}
            </View>
            <View style={[styles.rightSection]}>
                {props.rightSection}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        height: 150,
    },
    leftSection: {
        borderRightWidth: 0.5,
        borderRightColor: '#98a6ae',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 8,
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        borderLeftWidth: 0.5,
        borderLeftColor: '#98a6ae',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 8,
        flex: 1,
        alignItems: 'center',
    },
    rowMain: {
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'center',
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#98a6ae',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    dateText: {
        fontSize: 24,
    },
    sectionTitle: {
        fontSize: 16,
        marginHorizontal: 16,
        textAlign: 'right'
    },
    amoutForMonthText: {
        fontSize: 14,
        marginTop: 16,
    },
    aedText: {
        fontSize: 24
    },
});

export default TwoColumnsRow;
