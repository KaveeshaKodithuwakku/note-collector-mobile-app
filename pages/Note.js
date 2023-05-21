import { View,StyleSheet, Image, FlatList,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar} from 'react-native-paper';
import { AnimatedFAB } from 'react-native-paper';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import axios from "axios";


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Note() {

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


  //get all data
  const loadData = () => {

    //const userId = localStorage.getItem('userId'); nned to uncomment after login completed
    const userId = "gy4muQqj8DW9bpPD9oZ0GjAmKO52";
  
    axios.get(`http://192.168.1.101:8080/note/get-notes-by-user-id/${userId}`)
      // axios.get('http://localhost:8080/note/get-all')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    findGreet();
    loadData();
  }, [])


  return (


   <SafeAreaView style={styles.background}>

<ScrollView style={styles.scrollView}>

  <View style={styles.container}>

        <View>
          <Text style={styles.header}>{`Good ${greet}`}</Text>
        </View>

        <View style={styles.serach_container}>
        <Searchbar style={{backgroundColor: 'white',borderColor: 'gray',borderWidth:0.5,height:52}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
        </View>

<View style={styles.emptyHeaderContainer}>
<Text style={styles.emptyHeader}>Add Notes</Text>

</View>

<View style={styles.note_card}> 

<FlatList style={styles.shadowProp}
        data={data}
        renderItem={({item}) =>  

<Card mode='elevated' style={{marginBottom:10,borderRadius:15}}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">{item.title}</Text>
      <Text variant="bodyMedium">{item.description}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
        
  }
  keyExtractor={item => item.id}
      />
</View>

<View style={styles.addBtn}>

<AnimatedFAB
        icon={'plus'}
        label={'Label'}
        color ="white"
        onPress={() => console.log('Pressed')}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />

</View>

      </View> 

</ScrollView>
    
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
    backgroundColor:'white',
    height:'100%',
   },
   container: {
     backgroundColor:'white',
   },
   serachbar: {
    borderWidth: 0.5,
    borderColor: 'gray',
    height:40,
    borderRadius: 40,
    marginVertical:15,
    fontSize:20,
  },
  serach_container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    backgroundColor:'white',
  },
  emptyHeader: {
  fontSize:30,
  textTransform:'uppercase',
  fontWeight:'bold',
  color:'gray',
  justifyContent:'center',
  alignItems:'center',
  },
  emptyHeaderContainer: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    },
    addBtn: {
   
    display:'flex',
    bottom:0,
    right:0,
    position:'absolute',
    marginRight: 24,
    marginBottom:15,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'gray'
      },
      fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor:'darkblue',
       
      },
      note_card: {
        backgroundColor: 'white',  
    borderRadius: 8,  
    paddingVertical: 45,  
    paddingHorizontal: 25,  
    width: '100%',  
    marginVertical: 10, 
      },
      shadowProp: {  
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3, 
        elevation: 5, 
      
      },  
})
