import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';


const LeftContent = props => <Avatar.Icon {...props} backgroundColor='red' icon="pin" color='yellow' />

export default function Login({ navigation }) {

    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');

  return (

    <SafeAreaView style={styles.background}>
    <View>

<Appbar.Header>
    <Appbar.BackAction color='blue' onPress={() => navigation.navigate('Welcome')} />
    {/* <Appbar.Content title="Title" />
    <Appbar.Action icon="magnify" onPress={_handleSearch} />
    <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
  </Appbar.Header>
  </View>

  <View>
        <Text style={styles.title} variant="displayMedium">WELCOME !</Text>
      </View>

      <View>
      <Text style={styles.title2} variant="titleSmall">Sign in to continue</Text>
      </View>

      <View>
      <TextInput style={{backgroundColor:Colors.POWDER_BLUE}}
        placeholder ="email"
        placeholderTextColor={Colors.GRAY}
      />
      </View>


      <View>

 
      </View>
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
      color: "darkblue",
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
   
  })
  