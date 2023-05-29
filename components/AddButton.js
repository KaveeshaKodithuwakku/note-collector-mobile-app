import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const AddButton = () => {

    const navigation = useNavigation();

    const handleGoToAddNote = () => {
        navigation.navigate('Add Notes');
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={handleGoToAddNote} style={styles.TouchableOpacityStyle} >
                <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                    style={styles.FloatingButtonStyle} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    }
})

export default AddButton