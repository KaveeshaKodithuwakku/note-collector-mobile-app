import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, ImageBackground, ToastAndroid } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { auth } from '../uitilites/init-firbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [chEmail, setChEmail] = useState(true);
  const [chPassword, setChPassword] = useState(true);
  const [chConPassword, setChConPassword] = useState(true);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [conPwdError, setConPwdError] = useState(false);
  const [secureTextPwEntry, setSecurePwTextEntry] = useState(true);
  const [secureTextConPwEntry, setSecureConPwTextEntry] = useState(true);

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

  const validateConfirmPassword = () => {

    conPw = conPassword.trim();
    if (conPw == "" || conPw == null) {
      setConPwdError("Please enter the confirm password.");
      setChConPassword(false);
      return false;
    } else {
      if (Pw.length < 6) {
        setConPwdError("Please add at least 6 charachter.");
        setChConPassword(false);
        return false;
      } else {
        setConPwdError("");
        setChConPassword(true);
        return true;
      }
    }
  };

  const matchPassowrds = () => {

    pw = password.trim();
    conPw = conPassword.trim();

    if (pw != conPw) {
      setConPwdError("Password and confirm password is mis match");
      setChConPassword(false);
      return false;
    } else {
      setConPwdError("");
      setChConPassword(true);
      return true;
    }
  };

  const signUp = (e) => {
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (!email == "" && !password == "" && !conPassword == "") {
      matchPassowrds();
    }

    if (validateEmail && validatePassword && validateConfirmPassword && matchPassowrds) {

      onSubmit(e);
    }
  };

  const clearFeilds = () => {
    setEmail("");
    setPassword("");
    setConPassword("");
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (email !== '' || password !== '' || conPassword !== '') {
      if (password === conPassword) {
        console.log(password);
        console.log(email);
        await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
          .then((userCredential) => {
            const user = userCredential.user.uid;

            storeData(user);

            handleClick();
            clearFeilds();
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
            } else if (error.code === 'auth/missing-password') {
              ToastAndroid.show("Missing Password", ToastAndroid.SHORT);
            }
            else {
              ToastAndroid.show("Signup Failed", ToastAndroid.SHORT);
            }
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else {
        console.log("mis match");
        ToastAndroid.show("Please check your password and confirm password again...", ToastAndroid.SHORT);
      }

    } else {
      console.log("please fill all the fields");
      ToastAndroid.show("Please fill all the fields...", ToastAndroid.SHORT);
    }
  }

  function handleClick() {
    navigation.navigate('HomeTabs');
  }

  const storeData = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem('userId', value)
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title} variant="titleLarge">Welcome !</Text>
          <Text style={styles.title_1} variant="bodyMedium">Create your account</Text>

        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground style={styles.logo} source={require("../assets/images/test.png")} resizeMode="cover" >
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

        <View>
          <TextInput style={styles.text}
            mode="outlined"
            label="Confirm Password"
            secureTextEntry={secureTextConPwEntry}
            right={
              <TextInput.Icon
                icon="eye"
                name="eye"
                onPress={() => {
                  setSecureConPwTextEntry(!secureTextConPwEntry);
                  return false;
                }} />
            }
            value={conPassword}
            onChangeText={setConPassword}
          />
        </View>


        <View style={styles.text}>
          {
            chConPassword == true ? null : <Text style={{ color: "red" }}>{conPwdError}</Text>
          }
        </View>


        <Button style={styles.save_btn} mode="contained" onPress={(e) => signUp(e)}>
          Sign Up
        </Button>

        <View style={{ flexDirection: 'row' }}>

          <View style={styles.text_normal}>
            <Text>Already have an account ?</Text>
          </View>

          <View>
            <Text variant="labelLarge" style={styles.text_bold} onPress={() => navigation.navigate('Login')}>Login</Text>
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
    marginBottom: 30,
    display: 'flex',
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
    borderColor: 'darkblue',
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
  logo: {
    width: 200,
    height: 120,
    marginTop: 30,
    marginBottom: 30,
  },

})
