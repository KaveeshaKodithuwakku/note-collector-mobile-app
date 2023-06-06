import { StyleSheet, View, Modal, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper';
import { getAuth, updatePassword } from 'firebase/auth';


const ResetPassword = (props) => {

  const [password, setPassword] = useState('');
  const [secureTextPwEntry, setSecurePwTextEntry] = useState(true);
  const auth = getAuth();


  const reset = (user, newPassword, e) => {
    e.preventDefault();
    console.log('user' + auth.currentUser);

    updatePassword(user, newPassword).then(() => {
      ToastAndroid.show("New password update successfully!", ToastAndroid.SHORT);
        console.log('success');
        setPassword('');
        props.onDismiss();
    }).catch((error) => {
        console.log(error.code);
       
        if (error.code == 'auth/requires-recent-login') {
          ToastAndroid.show("Please login from fireabse account!", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Password Reset Failed", ToastAndroid.SHORT);
        }
        console.log(error + "failed");
    });
}

  return (


    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {

        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View>
              <Text style={styles.title} variant="bodyLarge">Reset Password</Text>
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
         
            <View style={styles.bottom_container}>
              <TouchableOpacity>
                <Button style={styles.button_reset} mode="contained" onPress={(e) => reset(auth.currentUser, password.trim(), e)}>
                 Reset
                </Button>
              </TouchableOpacity>

              <TouchableOpacity>
                <Button style={styles.button_cancle} mode="contained" onPress={props.onDismiss}>
                  Cancle
                </Button>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>

  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    color: "darkblue",
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom:10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width:280,
    marginTop: 5,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  button_reset: {
    width: 150,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'green'
  },
  button_cancle: {
    width: 150,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'gray'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});


export default ResetPassword;
