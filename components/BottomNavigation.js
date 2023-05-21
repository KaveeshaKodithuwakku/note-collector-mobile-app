import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Note from '../pages/Note';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={Note} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
  )
}