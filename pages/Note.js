import { View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { AnimatedFAB } from 'react-native-paper';
import { Avatar, Card, Text } from 'react-native-paper';
import axios from "axios";
import { IconButton, MD3Colors } from 'react-native-paper';
import NoteList from '../components/NoteList';
import AddButton from '../components/AddButton';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Note({ navigation }) {

  const [greet, setGreet] = useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isExtended, setIsExtended] = React.useState(true);
  const [data, setData] = useState([]);

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



  //delete data by id
  // const deleteRow = (id, e) => {
  //   e.preventDefault();

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(`http://localhost:8080/note/delete-note/${id}`)
  //         .then(function (response) {
  //           Swal.fire(
  //             'Deleted!',
  //             'Your note has been deleted.',
  //             'success'
  //           )
  //           loadData();
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           console.log(error);
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Something went wrong!',
  //           })
  //         })
  //     }
  //   })
  // }


  const updateIsFavorite = (id, status, e) => {

    if (e.target.checked) {
      status = 1;
      console.log('true')
    } else {
      status = 0
      console.log('false')
    }

    e.preventDefault();
    // console.log(`http://localhost:8080/note/update-note-favorite/${id}/${status}`);

    axios.put(`http://192.168.8.103/note/update-note-favorite/${id}/${status}`)
      .then(function (response) {
        if (status === 1) {
          // swal("Note added to favorite list", "", "success", {
          //   button: "Ok",

          // });
        } else if (status === 0) {
          // swal("Note remove from favorite list", "", "success", {
          //   button: "Ok",

          // });
        }
        loadData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong!',

        // })
      })

  }


  useEffect(() => {
    findGreet();
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
        <NoteList type='normal' />
      </ScrollView>

      <AddButton />

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
  }
})
