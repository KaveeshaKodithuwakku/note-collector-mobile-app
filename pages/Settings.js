import { View,StyleSheet,ImageBackground,Pressable,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../uitilites/init-firbase';
import ResetPassword from '../components/ResetPassword';


export default function Settings({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);

      const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure?',
            [
              {
                text: "Yes",
                onPress: () => {
                    signOut(auth);
                    handleClick();
                },
              },
              {
                text: "No",
              },
            ]
          );
      
    }

    const handleClick = () => {
        navigation.navigate('Welcome');
    }
    
    const hideModal = () => {
        setModalVisible(false);
      };
    

  return (
    <SafeAreaView style={styles.main_box}>

<Pressable style={{margin:30}} onPress={logout}>
<Card styles={{backgroundColor:'white'}} mode='elevated'>
     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground style={styles.logo} source={require("../assets/images/logout1.png")} resizeMode="cover" >
          </ImageBackground>
        </View>

<View style={styles.footer_title}>
<Card.Title title="Logout" />
</View>
        
  </Card>
</Pressable>

<Pressable style={{margin:30}}  onPress={() => setModalVisible(true)}>
<Card containerStyle={{backgroundColor: 'white'}} mode='elevated'>
     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground style={styles.logo} source={require("../assets/images/forgot.png")} resizeMode="cover" >
          </ImageBackground>
        </View>

<View style={styles.footer_title}>
<Card.Title title="Reset Password" />
</View>
        
  </Card>
</Pressable>
<ResetPassword visible={modalVisible} onDismiss={hideModal} /> 


    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
      },
      main_box: {
        margin: 50,
        },
    card_box: {
     width:150,
     height:100,
     backgroundColor:'white',
    },
    logo: {
        width: 50,
        height: 50,
        marginTop:30,
        marginBottom:30,
      },
      footer_title: {
        justifyContent:'center',
        alignContent:'center'
      },
  })
  