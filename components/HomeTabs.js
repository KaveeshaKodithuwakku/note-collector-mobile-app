import { View, Text } from 'react-native'
import React from 'react'
import Note from '../pages/Note'
import Settings from '../pages/Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
   
    <Tab.Navigator>
    <Tab.Screen   name="Home" component={Note} />
    <Tab.Screen  name="Settings" component={Settings} />
 
  </Tab.Navigator>
  )
}