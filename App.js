import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './pages/SignUp';
import WelcomeScreen from './pages/WelcomeScreen';
import Login from './pages/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabs from './components/HomeTabs';
import AddNotes from './pages/AddNotes';
import EditNotes from './pages/EditNotes';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (

  <NavigationContainer>
     
 <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'darkblue'
      },headerTintColor:"white",
    }}>

    <Stack.Screen  options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
      <Stack.Screen options={{headerShown: false}}  name="HomeTabs" component={HomeTabs} /> 
      <Stack.Screen name="Add Notes" component={AddNotes} /> 
      <Stack.Screen  name="Edit Notes" component={EditNotes} /> 
   </Stack.Navigator> 

  </NavigationContainer>
    
  )
}