import { StyleSheet, View, Modal, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';


const UpdateModal = (props) => {


  //const { pNoteId, pTitle, pDescription, pImage, pFavorite, visible, } = props;
  const [noteData, setNoteData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [favorite, setFavorite] = useState(false);

  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();


  useEffect(() => {
    console.log("id****" + props.noteId)
  //  getNoteById(props.noteId);
  setTitle(props.pTitle);
  setDescription(props.pDes);
  setImageName(props.pImage);
  setPreviousImage(props.pImage);


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
        console.log("code - " + result.errorCode);
      } else if (result.errorMessage) {
        console.log("msg - " + result.errorMessage);
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
    console.log("title" + title)
    await axios.get(`http://192.168.1.100:8080/note/get-note/${id}`)
      .then(response => {
        setNoteData(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setImageName(response.data.file_path);
        setPreviousImage(response.data.file_path);
        setFavorite(response.data.favorite);
        console.log("title after" + title)
      
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleUpdate = async (id, e) => {

    e.preventDefault();
    console.log("id" + id)
    if ((title.trim().length > 0 || description.trim().length > 0) && imageName === previousImage) {
      console.log("no im" + id)
      updateNoteTitleAndDescription(id);
    } else {
      console.log("with im" + id)
      updateNoteWithImage(id);
    }
  }


  const updateNoteTitleAndDescription = (id) => {

    const data = {

      userId: userId,
      title: title,
      description: description,
      dateTime: date,
      favorite: favorite,
    }

    axios.put(`http://192.168.1.100:8080/note/update-note-without-image/${id}`, data)
      .then(response => {
        console.log('All requests were completed');
        clearFeilds();
       
        props.onLoad();
        props.onDismiss();
        props.noteId = "";
        showToast('Note update sucessfully');
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
      url: `http://192.168.1.100:8080/note/update-note/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response.data);
        clearFeilds();
        props.onLoad();
        props.onDismiss();
        props.noteId = "";
        showToast('Note update sucessfully');
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
              <Text style={styles.title} variant="titleLarge">Edit Note</Text>
            </View>

            <View>
              <TextInput style={styles.text_box}
                label="Title"
                mode='outlined'
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </View>


            <View >
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
                <IconButton style={{ justifyContent: 'center', alignContent: 'center', marginTop: 20 }}
                  icon="image"
                  mode='contained'
                  iconColor='white'
                  backgroundColor='purple'
                  size={20}
                  onPress={handleSelectImage}
                />
              </TouchableOpacity>
            </View>


            <View style={styles.bottom_container}>
              <TouchableOpacity>
                <Button style={styles.button_update} mode="contained" onPress={(e) => handleUpdate(props.noteId, e)}>
                  Update Note
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_box: {
    marginLeft: 20,
    width: 300,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
    display: 'flex',
  },
  textimage_box: {
    width: 270,
    height: 60,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
    display: 'flex',
  },
  button_update: {
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


export default UpdateModal
