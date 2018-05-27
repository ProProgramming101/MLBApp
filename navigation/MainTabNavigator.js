import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import GamesScreen from '../screens/GamesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TestStack = createStackNavigator({
  Test: TestScreen,
});

TestStack.navigationOptions = {
  tabBarLabel: 'Test',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"code-tags"}
    />
  ),
};

const GamesStack = createStackNavigator({
  Games: GamesScreen,
});

GamesStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"gamepad"}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"settings"}
    />
  ),
};

export default createBottomTabNavigator({
  TestStack,
  GamesStack,
  SettingsStack,
});
