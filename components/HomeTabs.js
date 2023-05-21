import { View, Text } from 'react-native'
import React from 'react'
import Note from '../pages/Note'
import Settings from '../pages/Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FavoriteNotes from '../pages/FavoriteNotes';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
   
    <Tab.Navigator initialRouteName="Home"
    activeColor="#e91e63"
    labelStyle={{ fontSize: 12 }}>
    <Tab.Screen   name="Home" component={Note} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="home" color={color} size={26} ></AwesomeIcon >
          ),
        }}/>
    <Tab.Screen  name="Favorite" component={FavoriteNotes} options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="heart" color={color} size={26} ></AwesomeIcon >
          ),
        }}/>

<Tab.Screen  name="Favorite" component={FavoriteNotes} options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="heart" color={color} size={26} ></AwesomeIcon >
          ),
        }}/>

<Tab.Screen  name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="user" color={color} size={26} ></AwesomeIcon >
          ),
        }}/>

<Tab.Screen  name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="gear" color={color} size={26} ></AwesomeIcon >
          ),
        }}/>
 
  </Tab.Navigator>
  )
}