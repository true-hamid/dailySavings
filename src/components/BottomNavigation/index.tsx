/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { TabNav } from '../../utils/navigation';
import { AppIcon } from '../';
import { Colors } from '../../constants';

const BottomNavigation = (props: any) => {

    const changeView = (ScreenName) => {
        props.setVisibleScreen(ScreenName)
    }

    const tabsArrayData = [
        {
            id: '1',
            label: 'Counter',
            screen: TabNav.CounterScreen,
        },
        {
            id: '2',
            label: 'Payments History',
            screen: TabNav.PaymentsHistoryScreen,
        },
        {
            id: '3',
            label: 'Usage History',
            screen: TabNav.UsageHistoryScreen,
        }
    ];

    const iconsResolver = (iconName: any) => {
        switch (iconName) {
            case tabsArrayData[0].label:
                return <AppIcon name={'chart-line'} />
            case tabsArrayData[1].label:
                return <AppIcon name={'cash-register'} />
            case tabsArrayData[2].label:
                return <AppIcon name='history' />

        }
    }

    const TabButton = (item: any) => {
        return (
            <TouchableOpacity
                style={[styles.button, props.visibleScreen === item.screen ? styles.selectedButton : null]}
                onPress={() => changeView(item.screen)}>
                <Text style={styles.selectedButtonText}>
                    {iconsResolver(item.label)}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View
            style={styles.container}>
            {
                tabsArrayData.map((data: any) =>
                    <TabButton
                        key={data.id}
                        label={data.label}
                        screen={data.screen}
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'space-between',
        // marginTop: 8,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 4,
        borderTopColor: 'transparent',
    },
    selectedButton: {
        borderTopWidth: 4,
        borderTopColor: Colors.PRIMRAY_COLOR,
    },
    selectedButtonText: {
        color: '#848a8d',
        fontWeight: 'bold',
    }
});

export default BottomNavigation;
