import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NoteList from '../components/NoteList';
import AddButton from '../components/AddButton';


export default function FavoriteNotes({ navigation }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isExtended, setIsExtended] = React.useState(true);

  const onChangeSearch = query => setSearchQuery(query);


  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.serach_container}>
          <Searchbar style={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 0.5, height: 52 }}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <NoteList type='favorite' />
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