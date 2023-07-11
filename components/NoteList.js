import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Alert } from 'react-native'
import axios from "axios";
import { IconButton, MD3Colors, Avatar, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        const userId = await AsyncStorage.getItem('userId');
console.log("888888888"+userId)
        await axios.get(`note/get-notes-by-user-id/${userId}`)
            .then(response => {
                setNoteData(response.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setRefresh(false);
            });
    }

    const handleDeleteNote = (id, e) => {

        e.preventDefault();

        axios.delete(`note/delete-note/${id}`)
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
                        <Card.Cover source={{ uri: axios.defaults.baseURL + 'api/v1/note/download/' + item.image }} />
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
                                onPress={() => {
                                    navigation.navigate('Edit Notes', {
                                        itemId: item.noteId,
                                    });
                                }}
                            />
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

