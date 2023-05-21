import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';



export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <ImageBackground style={styles.logo} source={require("../assets/images/welocme-img.png")} resizeMode="cover" >

        </ImageBackground>
      </View>

      <View>
        <Text style={styles.title} variant="displayMedium">My Notes !</Text>
      </View>

      <View>
      <Text style={styles.title2} variant="titleSmall">Best place to store your notes and life events</Text>
      </View>

      <View >
      <Button style={styles.login_btn}  mode="contained" onPress={() => navigation.navigate('Login')}>
   Login
  </Button>

  <Button style={styles.signup_btn}  mode="outlined" onPress={() => navigation.navigate('Home')}>
 Sign Up
  </Button>

      </View>

{/* <View>
<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0f1db1',   '#2a0fb1']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
</View>
       */}

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  background: {
   backgroundColor:'white',
   height:'100%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginTop:100,
  },
  title: {
    color: "blue",
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title2: {
    color: "gray",
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
 login_btn: {
    backgroundColor: 'blue',
    textAlign: 'center',
    fontSize: 30,
   color:'white',
    marginTop: 30,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signup_btn: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
    borderColor:'#0f1db1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  output: {
    color: "green",
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  linearGradient: {
  
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})
