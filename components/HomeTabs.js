import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Note from '../pages/Note'
import Settings from '../pages/Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
   
    <Tab.Navigator  initialRouteName="Home"
    activeColor="#694fad"
    labelStyle={{ fontSize: 12 }}
  >
      
    <Tab.Screen   name="Home" component={Note} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="home" color={color} size={18} ></AwesomeIcon >
          ),
        }}/>


<Tab.Screen  name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <AwesomeIcon  name="gear" color={color} size={18} ></AwesomeIcon >
          ),
        }}/>
 
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  round_icon: {
    width: 55,
    height: 50,
    backgroundColor:'red',
    borderRadius: '50%',
    justifyContent:'center',
    alignItems:'center',
  },
  plus_icon:{
    width: 22,
    height: 22,
    tintColor:'white',
  },
});