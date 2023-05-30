import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList,Alert } from 'react-native'
import axios from "axios";
import { IconButton, MD3Colors, Avatar, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function NoteList(props) {

    const [noteDate, setNoteData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (props.type === 'normal') {
            getAllNotes();
        } else if (props.type === 'favorite') {
            getFavoriteNotes();
        }

    }, [])


    const getAllNotes = async () => {

        const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";

        await axios.get(`http://192.168.1.100:8080/note/get-notes-by-user-id/${userId}`)
            .then(response => {
                setNoteData(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getFavoriteNotes = async () => {

        const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";

        await axios.get(`http://192.168.1.100:8080/note/get-all-favorites/${userId}`)
            .then(response => {
                setNoteData(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleDeleteNote = (id, e) => {

        e.preventDefault();
     
        axios.delete(`http://192.168.1.100:8080/note/delete-note/${id}`)
            .then((response) => {
                console.log(response.data);
               getAllNotes();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDeleteIconPress = (nId,e) => {
      Alert.alert(
            "Delete Note..!",
            "Are you sure ?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        handleDeleteNote(nId,e);
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }


    const handleUpdateNote = (id, e) => {

        e.preventDefault();
     
        axios.delete(`http://192.168.1.100:8080/note/delete-note/${id}`)
            .then((response) => {
                console.log(response.data);
               getAllNotes();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (

        <>

            <FlatList style={styles.noteList}
                data={noteDate}
                keyExtractor={item => item.noteId}
                renderItem={({ item }) =>

                    <Card mode='elevated' style={styles.shadowProp}>
                        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                        <Card.Content>
                            <Text variant="titleLarge">{item.title}</Text>
                            <Text variant="bodyMedium">{item.description}</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions>
                            <IconButton
                                icon="heart"
                                mode='outlined'
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            />
                            <IconButton
                                icon="pen"
                                mode='outlined'
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() =>  {
                                    /* 1. Navigate to the Details route with params */
                                    navigation.navigate('Edit Notes', {
                                      itemId: item.note_id,
                                      otherParam: 'anything you want here',
                                    });
                                  }}
                            />
                            <IconButton
                                icon="delete"
                                mode='outlined'
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={(e) => handleDeleteIconPress( item.noteId,e)}
                            />
                        </Card.Actions>
                    </Card>

                }

            />
        </>

    )
}

const styles = StyleSheet.create({

    note_card: {
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

