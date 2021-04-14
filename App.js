/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StatusBar,
  View,
} from 'react-native';

import CounterScreen from './src/screens/CounterScreen';
import PaymentDetailsScreen from './src/screens/PaymentDetailsScreen';
import MonthlyBudgetScreen from './src/screens/MonthlyBudgetScreen';
import PaymentsHistoryScreen from './src/screens/PaymentsHistoryScreen';
import UsageHistoryScreen from './src/screens/UsageHistoryScreen';

import { BottomNavigation } from './src/components';

import { TabNav } from './src/utils/navigation';
import { Colors } from './src/constants';

const App: () => React$Node = () => {
  const [visibleScreen, setVisibleScreen] = useState(TabNav.CounterScreen);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          height: '90%',
          backgroundColor: Colors.APP_BACKGROUND,
          paddingBottom: 8
        }}>
        <CounterScreen
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
        <PaymentsHistoryScreen
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
        <PaymentDetailsScreen
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
        <MonthlyBudgetScreen
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
        <UsageHistoryScreen
          visibleScreen={visibleScreen}
          setVisibleScreen={setVisibleScreen}
        />
      </View>
      {Object.values(TabNav).includes(visibleScreen) && (
        <BottomNavigation
          setVisibleScreen={setVisibleScreen}
          visibleScreen={visibleScreen}
        />
      )}
    </>
  );
};

export default App;
