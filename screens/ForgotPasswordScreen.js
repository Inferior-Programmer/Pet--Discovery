import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {View, Text,StyleSheet, Alert} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Firebase from '../config/firebase';

const auth = Firebase.auth();


const ForgotPasswordScreen = ({navigation}) => {
    
    const [email, setEmail] = useState('');
    const[signupError, setSignupError] = useState('');
    const onHandleSignup = async () => {
        try {
            setSignupError('');
      
            await auth.sendPasswordResetEmail(email);
            Alert.alert('Reset password successful!');
          } catch (error) {
            setSignupError(error.message);
          }
        };

    return (
        
        <View style={styles.container}>
            <StatusBar style='dark-content' />
           <Text style={styles.title}>Reset your Password</Text> 

        
            <CustomInput 
            placeholder = "Email" 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = 'email-address'
            autoFocus = {true}
            value ={email}
            setValue={setEmail}/>    

            {signupError ? <Text> {signupError} </Text> : null}

     
            <CustomButton 
            text = "Reset your Password" 
            onPress={onHandleSignup}
            type  = "PRIMARY"
            />

            <CustomButton 
            text = "Sign in Instead" 
            onPress={() => navigation.navigate('Login')}
            type ="PRIMARY"
            />

            <CustomButton 
            text = "Don't Have an account? Create One"
            onPress={() => navigation.navigate('Signup')}
            type ="TERTIARY"
            />


          
        </View>
        
    );
};

const styles = StyleSheet.create({
    
   
    container:{
        alignItems:"center",
        padding: 20,       
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#48b9b6',
        margin: 10,
    },
    text : {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: 'tomato'

    }
});
export default ForgotPasswordScreen;