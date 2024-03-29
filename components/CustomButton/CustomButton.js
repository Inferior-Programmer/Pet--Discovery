import React from 'react';
import {Pressable,Text, StyleSheet,TouchableOpacity} from 'react-native';

const CustomButton = ({onPress,text, type }) =>{
    return (
      
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`],]}>
            <Text style = {[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
        
    );
 
};

const styles = StyleSheet.create({
    container: {       
        width: '100%',

        padding :15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY:{
        backgroundColor: '#48b9b6',
    },
    container_TERTIARY:{
        
    },

    text:{
        fontWeight: 'bold',
        color: 'white'
    },
    text_TERTIARY: {
        color: 'gray'
    }
})

export default CustomButton;