import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import back from "../assets/images/Background_1.jpg"


export default function WelcomeScreen({ navigation }) {
  return (

    <ImageBackground source={back} style={{flex:1}}>
<SafeAreaView>

<StatusBar
  animated={true}
  backgroundColor="#00134d"
/>
{/* 
  <View style={styles.container}>
       <ImageBackground style={styles.logo} source={require("../assets/images/welocme-img.png")} resizeMode="cover" >

        </ImageBackground>
       </View> */}


<View>
        <Text style={styles.title} variant="displayMedium">My Notes !</Text>
      </View>

      <View>
        <Text style={styles.title2} variant="titleSmall">Best place to store your notes and life events</Text>
      </View>

      <View >
        <Button style={styles.login_btn} mode="contained" onPress={() => navigation.navigate('Login')}>
          Login
        </Button>

        <Button style={styles.signup_btn} mode="outlined" onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Button>

      </View> 
 

</SafeAreaView>
    </ImageBackground>
    

      //  <View style={styles.container}>
      //   <ImageBackground style={styles.logo} source={require("../assets/images/welocme-img.png")} resizeMode="cover" >

      //   </ImageBackground>
      // </View>


   



  )
}

const styles = StyleSheet.create({

  container: {
    
   height:'100%'
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 100,
  },
  title: {
    color: "darkblue",
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title2: {
    color: "gray",
    fontWeight: 'normal',
    textAlign: 'center',
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  login_btn: {
    backgroundColor: 'darkblue',
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
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
    borderColor: '#0f1db1',
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
