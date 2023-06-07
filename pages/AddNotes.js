import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ToastAndroid,BackHandler, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function AddNotes({ navigation,route}) {


    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [image, setImage] = React.useState("");
    const [imageName, setImageName] = React.useState("");
    const [favorite, setFavorite] = useState(false);


    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();


    useEffect(() => {
        setDate(currDate + " " + currTime);
    }, [])

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
      );
    

    const handleSelectImage = async () => {
        const options = {
          mediaType: 'photo',
          selectionLimit: 1,
          includeBase64: false,
        }

        try {
          const result = await launchImageLibrary(options);
    
          if (result.didCancel) {
            console.log('Cancelled');
          } else if (result.errorCode) {
            console.log("code - "+result.errorCode);
          } else if (result.errorMessage) {
            console.log("msg - "+result.errorMessage);
          } else if (result.assets) {
              setImage(result.assets[0]);
              setImageName(result.assets[0].fileName);
          } else {
            console.log('No assets');
          }
        } catch (error) {
          console.log(error);
        }
      }
    

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const handleSave = async () => {
        console.log("press save");
        
        const formData = new FormData();

    
      const userId = await AsyncStorage.getItem('userId');

        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('dateTime', date)
        formData.append('favorite', favorite)
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
          })

        if (title.trim().length > 0 || description.trim().length > 0) {
            await axios({
                method: "post",
                url: "http://192.168.1.102:8080/note/save-notes",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    console.log(response.data);
                    showToast('Note save sucessfully');
                    clearFeilds();
                   navigation.replace('HomeTabs');
                })
                .catch(function (error) {
                    console.log(error);
                    showToast('Note save failed');
                })
        } else {
            Alert.alert('Please add a title or description');
        }
    }

    const clearFeilds = () => {
        setTitle('');
        setDescription('');
        setImage('');
    }


    return (
        <SafeAreaView>

            <View style={{ backgroundColor: 'white' }}>

                <View>
                    <Text style={styles.title} variant="titleLarge">Add Note</Text>
                </View>

                <View>
                    <TextInput style={styles.text_box}
                        label="Title"
                        mode='outlined'
                        onChangeText={text => setTitle(text)}
                    />
                </View>


                <View>
                    <TextInput style={styles.text_box}
                        label="Description"
                        mode='outlined'
                        multiline={true}
                        numberOfLines={5}
                        //   value={title}
                        onChangeText={text => setDescription(text)}
                    />
                </View>

                <View style={styles.container}>
                    <View style={styles.textimage_box}>
                        <TextInput
                            label="Image"
                            mode='outlined'
                            value={imageName}
                       
                        />
                    </View>

                    <TouchableOpacity>
                        <IconButton style={{ justifyContent: 'center', alignContent: 'center', marginTop: 32 }}
                            icon="image"
                            mode='contained'
                            iconColor='white'
                            backgroundColor='purple'
                            size={30}
                            onPress={handleSelectImage}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Button style={styles.button} icon="plus" mode="contained" onPress={handleSave}>
                        Save Note
                    </Button>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground style={styles.logo} source={require("../assets/images/note.png")} resizeMode="cover" >
</ImageBackground>
                </View>
               
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    full_container: {
        backgroundColor: 'white',
        zIndex: 1,
    },
    title: {
        color: "blue",
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    text_box: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        borderColor: 'gray',
        display: 'flex',
    },
    textimage_box: {
        width: '78%',
        height: 60,
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 10,
        borderColor: 'gray',
        display: 'flex',
    },
    button: {
        margin: 20,
        borderRadius: 5,
        marginTop: 80,
        backgroundColor: 'green'
    }, logo: {
        width: 300,
        height: 300,
    },

})
