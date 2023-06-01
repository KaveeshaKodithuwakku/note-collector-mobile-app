import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton, TextInput } from 'react-native-paper';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';


export default function EditNotes({ navigation, route }) {

    const noteId = route.params.itemId;
    const refresh = route.params.onLoad;

    const [noteData, setNoteData] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [image, setImage] = React.useState("");
    const [imageName, setImageName] = React.useState("");
    const [previousImage, setPreviousImage] = React.useState("");
    const [favorite, setFavorite] = useState(false);


    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();


    useEffect(() => {
    
        getNoteById(noteId);
        setDate(currDate + " " + currTime);
    }, [])

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

    

    const getNoteById = async (id) => {

        await axios.get(`http://192.168.1.101:8080/note/get-note/${id}`)
            .then(response => {
                setNoteData(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setImage(response.data.image);
                setImageName(response.data.file_path);
                setPreviousImage(response.data.file_path);
                setFavorite(response.data.favorite);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleUpdate = async (id,e) => {

        e.preventDefault();
    
        if ((title.trim().length > 0 || description.trim().length > 0) && imageName === previousImage) {
            updateNoteTitleAndDescription(id);
        }else{
            updateNoteWithImage(id);
        }
    }


    const updateNoteTitleAndDescription = (id) => {
    
        const data = {
          noteId: noteId,
          userId:userId,
          title: title,
          description: description,
          dateTime: date,
        }
      
        axios.put(`http://192.168.1.101:8080/note/update-note-without-image/${id}`, data)
        .then(response => {
            console.log('All requests were completed');
            clearFeilds();
            showToast('Note update sucessfully');
            navigation.replace('Home');
            // route.params.onLoad();
          })
          .catch((error) => {
            console.error(error);
            showToast('Note update failed');
          })
         
      }


      const updateNoteWithImage = async (id) => {
      
        const formData = new FormData();

        const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";

        formData.append('userId', userId)
     //   formData.append('userId', localStorage.getItem('userId'))
        formData.append('title', title)
        formData.append('description', description)
        formData.append('dateTime', date)
        formData.append('favorite', favorite)
        console.log("uri" + image.uri);
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
          })
          console.log("id" + id);
           axios({
                method: "put",
                url: `http://192.168.1.101:8080/note/update-note/${id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    console.log(response.data);
                    clearFeilds();
                    navigation.replace('Home');
                    showToast('Note update sucessfully');
                    // route.params.onLoad();
                })
                .catch(function (error) {
                    console.log(error);
                    showToast('Note update failed');
                })
       
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
            <Text style={styles.title} variant="displayMedium">Edit Note</Text>
        </View>

        <View>
            <TextInput style={styles.text_box}
                label="Title"
                mode='outlined'
                value= {title}
                onChangeText={text => setTitle(text)}
            />
        </View>


        <View>
            <TextInput style={styles.text_box}
                label="Description"
                mode='outlined'
                multiline={true}
                numberOfLines={5}
                value={description}
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
            <Button style={styles.button} icon="plus" mode="contained" onPress={(e) => handleUpdate(noteId,e)}>
                Update Note
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
fontSize: 35,
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
