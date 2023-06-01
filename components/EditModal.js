import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';



function EditModal({visible, hideModal}) {

    const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View>
     <PaperProvider>
    <Portal>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
      <View style={{ backgroundColor: 'white' }}>

        <View>
          <Text  variant="displayMedium">Edit Note</Text>
          <Text  variant="displayMedium">Edit Note</Text>
          <Text  variant="displayMedium">Edit Note</Text>
          <Text  variant="displayMedium">Edit Note</Text>
          <Text  variant="displayMedium">Edit Note</Text>   
          <Text  variant="displayMedium">Edit Note</Text>
        </View>

        {/* <View>
          <TextInput style={styles.text_box}
            label="Title"
            mode='outlined'
            value={title}
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
          <Button style={styles.button} icon="plus" mode="contained" onPress={(e) => handleUpdate(noteId, e)}>
            Update Note
          </Button>
        </View>

        <View>
          <Button style={styles.button} icon="plus" mode="contained" onPress={(e) => props.onDismiss()}>
            Cancle
          </Button>
        </View> */}

      </View>

    </Modal>
    </Portal>
     
    </PaperProvider>

    </View>
  )
}

export default  EditModal;