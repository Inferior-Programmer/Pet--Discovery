import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {View, Text, Image,StyleSheet,TouchableOpacity, useWindowDimensions} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

const LoginScreen = ({navigation}) => {
    
    const [email, setEmail] = useState('');
    
    const [password, setPassword] = useState('');
    
    const {height} = useWindowDimensions();

    const [error, setError] = useState(false);
	
	const [passwordVisibility, setPasswordVisibility] = useState(true);

    const onSignInPressed = async () => { 
        try {
            if (email !== '' && password !== ''){
                await auth.signInWithEmailAndPassword(email, password);
                setError(false);

            }

        }
        catch(error){
            setError(true);
        }
    };

    const onForgotPassPressed = () => {
        navigation.navigate('Forgot Password')
    };

    const onSignedUpPressed = () => {
        navigation.navigate('Signup')
    };
        
    return (
        
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <Image 
            source ={require('./Images/LOGO.png')} 
            style = {[styles.logo,{height: height * 0.3}]}
            resizeMode="contain"
            />

            <CustomInput 
            placeholder = "Email" 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = 'email-address'
            autoFocus = {true}    
            value ={email}
            setValue={setEmail}
            />

            <CustomInput
            placeholder= "Password"
            autoCapitalize = 'none'
            autoCorrect = {false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            autoFocus = {true}
            value={password}
            setValue={setPassword}
            
            />
			<TouchableOpacity onPress = {()=>setPasswordVisibility(x => !x)}>
			{passwordVisibility? <Text style = {styles.font}> Show Password </Text> : <Text style ={styles.font}> Hide Password </Text>}
	  
			</TouchableOpacity>

            <CustomButton 
            text = "Sign In" 
            onPress={onSignInPressed}
            type  = "PRIMARY"
            />
            {error ? <Text> Failed to Login </Text> : null}
            
            <CustomButton 
            text = "Forgot Password" 
            onPress={onForgotPassPressed}
            type ="TERTIARY"
            />

            <CustomButton 
            text = "Don't Have an account? Create One" 
            onPress={onSignedUpPressed}
            type ="TERTIARY"
            />

          
        </View>
        
    );
};

const styles = StyleSheet.create({
    
    logo:{
        width: "40%",
        
        maxWidth: 300,
        maxHeight: 300,
    },
    container:{
        alignItems:"center",
        padding: 20,       
    },
    font:{
        color: 'gray',
        fontWeight: 'bold',
    }
});
export default LoginScreen;