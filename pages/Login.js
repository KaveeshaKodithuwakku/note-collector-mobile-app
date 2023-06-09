import { View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, Checkbox, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../uitilites/init-firbase';


TouchableOpacity
export default function Login({ navigation }) {

  const { signInWithGoogle, register } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chEmail, setChEmail] = useState(true);
  const [chPassword, setChPassword] = useState(true);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [secureTextPwEntry, setSecurePwTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const validateEmail = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    Email = email.trim();

    if (Email == "" || Email == null) {
      setEmailErr("Please enter the email.");
      setChEmail(false);
      return false;
    } else if (!strongRegex.test(Email)) {
      setEmailErr("Please enter valid the email.");
      setChEmail(false);
      return false;
    } else {
      setEmailErr("");
      setChEmail(true);
      return true;
    }
  };

  const validatePassword = () => {

    Pw = password.trim();
    if (Pw == "" || Pw == null) {
      setPwdError("Please enter the password.");
      setChPassword(false);
      return false;
    } else {
      if (Pw.length < 6) {
        setPwdError("Please add at least 6 charachter.");
        setChPassword(false);
        return false;
      } else {
        setPwdError("");
        setChPassword(true);
        return true;
      }
    }
  };

  const storeData = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem('userId', value)
    } catch (e) {
      console.log(e);
    }
  }

  const onLogin = () => {

    if (email.length == 0 || password.length == 0) {
      ToastAndroid.show("Fill credentials", ToastAndroid.SHORT);
    } else {
      signInWithEmailAndPassword(auth, email.trim(), password.trim())
        .then((userCredential) => {
          const user = userCredential.user.uid;

          storeData(user);

          handleClick();
          clearFeilds();
        })
        .catch((error) => {
          if (error.code == 'auth/wrong-password') {
            ToastAndroid.show("Invalid Password", ToastAndroid.SHORT);
          } else if (error.code == 'auth/invalid-email') {
            ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
          }
          else {
            ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
          }

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    }
  }

  const forgotPassword = () => {

    if (email != null) {
      sendPasswordResetEmail(auth, email.trim())
        .then(() => {
          Alert.alert(
            "password reset email has been sent successfully"
          )
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        "Please Enter Valid Email",
        [
          {
            text: "Ok",
          },
        ]
      );
    }
  };


  const signIn = () => {
    validateEmail();
    validatePassword();

    if (validateEmail && validatePassword) {
      onLogin();
    }
  };

  const clearFeilds = () => {
    setEmail("");
    setPassword("");
  }

  function handleClick() {
    navigation.navigate('HomeTabs')
  }


  return (

    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title} variant="titleLarge">Welcome Back!</Text>
          <Text style={styles.title_1} variant="bodyMedium">Login to your account</Text>

        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground style={styles.logo} source={require("../assets/images/login.png")} resizeMode="cover" >
          </ImageBackground>
        </View>

        <View>
          <TextInput style={styles.text}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.text}>
          {
            chEmail == true ? null : <Text style={{ color: "red" }}>{emailErr}</Text>
          }
        </View>

        <View>

          <TextInput style={styles.text}
            mode="outlined"
            label="Password"
            secureTextEntry={secureTextPwEntry}
            right={
              <TextInput.Icon
                icon="eye"
                name="eye"
                onPress={() => {
                  setSecurePwTextEntry(!secureTextPwEntry);
                  return false;
                }} />
            }
            value={password}
            onChangeText={setPassword} />
        </View>

        <View style={styles.text}>
          {
            chPassword == true ? null : <Text style={{ color: "red" }}>{pwdError}</Text>
          }
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
{/* 
          <View style={styles.checkbox_remember}>
            <TouchableOpacity>
              <Checkbox
                value={checked}
                onPress={() => setChecked(checked)}
              />
            </TouchableOpacity>

          </View> */}

          {/* <View>
            <Text style={styles.text_remember} >Remember Me</Text>
          </View> */}

          <View>
            <Text variant="labelLarge" style={styles.text_forgot} onPress={forgotPassword}>Forgot Password?</Text>
          </View>
        </View>

        <Button style={styles.save_btn} mode="contained" onPress={signIn}>
          Sign In
        </Button>

        <View style={{ flexDirection: 'row' }}>

          <View style={styles.text_normal}>
            <Text>Don't have an account ?</Text>
          </View>

          <View>
            <Text variant="labelLarge" style={styles.text_bold} onPress={() => navigation.navigate('SignUp')}>Sign up here</Text>
          </View>
        </View>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  text: {
    marginTop: 5,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    marginTop: 55,
    display: 'flex',
    marginLeft: 40,
  },
  title_1: {
    color: "gray",
    fontWeight: 'bold',
    marginLeft: 40,
    display: 'flex',
    marginBottom: 40,
  },
  save_btn: {
    backgroundColor: 'darkblue',
    textAlign: 'center',
    margin: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  google_btn: {
    backgroundColor: 'white',
    color: 'drakblue',
    textAlign: 'center',
    margin: 30,
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
  footer_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  text_normal: {
    width: 200,
    fontStyle: 'normal',
    marginLeft: 40,
    marginTop: 10,
    display: 'flex',
  },
  text_bold: {
    color: "orange",
    width: 100,
    display: 'flex',
    marginTop: 10,
  },
  checkbox_remember: {
    width: 5,
    fontStyle: 'normal',
    marginLeft: 40,
    marginTop: 10,
    display: 'flex',
  },
  text_remember: {
    width: 150,
    fontSize: 12,
    fontStyle: 'normal',
    marginLeft: 40,
    marginTop: 10,
    display: 'flex',
  },
  text_forgot: {
    color: "darkblue",
    fontSize: 12,
    width: 200,
    marginLeft:300,
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: 30,
    marginBottom: 30,
  },

})
