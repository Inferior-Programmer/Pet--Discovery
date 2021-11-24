import React from 'react';
import { View, StyleSheet, TextInput} from 'react-native';

const CustomInput1 = ({value, setValue,placeholder}) => {
    return (
        <View>
            <TextInput
            value ={value}
            onChangeText={setValue}
            placeholder={placeholder}
            
            />
        </View>
    );
}

const styles = StyleSheet.create({


})

export default CustomInput1;