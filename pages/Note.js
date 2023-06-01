import { View, StyleSheet, Image, FlatList, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, MD3Colors, Avatar, Card, Text, Searchbar, Modal } from 'react-native-paper';
import axios from "axios";
import AddButton from '../components/AddButton';
import UpdateModal from '../components/UpdateModal';
const containerStyle = { backgroundColor: 'white', padding: 20 };

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Note({ navigation }) {

  const [greet, setGreet] = useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isExtended, setIsExtended] = React.useState(true);
  const [noteDate, setNoteData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [nId, setNid] = React.useState('');



  const hideModal = () => {
    setVisible(false);
  };

  const showModal = (id, e) => {
    e.preventDefault();
    setNid(id);
    setVisible(true);
  };


  const onChangeSearch = query => setSearchQuery(query);

  const findGreet = () => {
    const hrs = new Date().getHours();

    if (hrs === 0 || hrs < 12) {
      return setGreet('Morning !');
    } else if (hrs === 1 || hrs < 17) {
      return setGreet('Afternon !');
    } else {
      return setGreet('Evening !');
    }
  }


  const getAllNotes = async () => {

    const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";

    await axios.get(`http://192.168.1.101:8080/note/get-notes-by-user-id/${userId}`)
      .then(response => {
        setNoteData(response.data);
      })
      .catch(err => {
        console.error(err);
      })

  }

  const getNoteById = async (id) => {
  
    await axios.get(`http://192.168.1.101:8080/note/get-note/${id}`)
      .then(response => {
        setNoteData(response.data);
        // setTitle(response.data.title);
        // setDescription(response.data.description);
        // setImage(response.data.image);
        // setImageName(response.data.file_path);
        // setPreviousImage(response.data.file_path);
        // setFavorite(response.data.favorite);
        console.log("title after" + title)
      
      })
      .catch(err => {
        console.error(err);
      });
  }


  const getFavoriteNotes = async () => {

    const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";

    await axios.get(`http://192.168.1.101:8080/note/get-all-favorites/${userId}`)
      .then(response => {
        setNoteData(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleDeleteNote = (id, e) => {

    e.preventDefault();

    axios.delete(`http://192.168.1.101:8080/note/delete-note/${id}`)
      .then((response) => {
        console.log(response.data);
        getAllNotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDeleteIconPress = (nId, e) => {
    Alert.alert(
      "Delete Note..!",
      "Are you sure ?",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDeleteNote(nId, e);
          },
        },
        {
          text: "No",
        },
      ]
    );
  }


  useEffect(() => {
    findGreet();
    getAllNotes();
  }, [])


  return (

    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{`Good ${greet}`}</Text>
        </View>

        <View style={styles.serach_container}>
          <Searchbar style={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 0.5, height: 52 }}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <FlatList style={styles.noteList}
          data={noteDate}
          keyExtractor={item => item.noteId}
          renderItem={({ item }) =>

            <Card mode='elevated' style={styles.shadowProp}>
              <Card.Title title={item.title} subtitle={item.dateTime} left={LeftContent} />
              <Card.Content>
              <Text variant="bodyMedium">{item.noteId}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: `http://192.168.1.101:8080/note/download/${item.file_path}` }} />
              <Card.Actions>
                {/* <IconButton
                                icon="heart"
                                mode='outlined'
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            /> */}


              
                <IconButton
                  icon="pen"
                  mode='outlined'
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Edit Notes', {
                      itemId: item.noteId,
                    });
                  }}
                  // onPress={(e) => showModal(item.noteId, e)}
                />
{/* <UpdateModal visible={visible} onDismiss={hideModal} noteId={nId} onLoad={getAllNotes} pTitle={item.title} pDes={item.description} pImage={item.file_path}/> */}

                <IconButton
                  icon="delete"
                  mode='outlined'
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={(e) => handleDeleteIconPress(item.noteId, e)}
                />

              </Card.Actions>
            </Card>

          }
        />
      </ScrollView>

      <AddButton onLoad={getAllNotes} />

    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkblue',
    marginTop: 10,
    marginLeft: 5,
  },
  background: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
  },
  serachbar: {
    borderWidth: 0.5,
    borderColor: 'gray',
    height: 40,
    borderRadius: 40,
    marginVertical: 15,
    fontSize: 20,
  },
  serach_container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
  }, note_card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,

  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
  },
  noteList: {
    marginLeft: 20,
    marginRight: 20,
  }
})
