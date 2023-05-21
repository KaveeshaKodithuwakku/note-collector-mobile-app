import { View, Text } from 'react-native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './pages/SignUp';
import WelcomeScreen from './pages/WelcomeScreen';
import Login from './pages/Login';
import Note from './pages/Note';
import Settings from './pages/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabs from './components/HomeTabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (

  <NavigationContainer>

{/* 
<Tab.Navigator>
    <Tab.Screen options={{
   tabBarStyle: { display: "none" },headerShown: false
}} name="Welcome" component={WelcomeScreen} />
    <Tab.Screen name="Note" component={Note} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
    */}

     
 <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'darkblue'
      },headerTintColor:"white",
    }}>

    <Stack.Screen  options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
      <Stack.Screen options={{headerShown: false}}  name="Home" component={HomeTabs} /> 
     
   </Stack.Navigator> 
  
    

  </NavigationContainer>
    
  )
}