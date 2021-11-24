import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

const SignUpScreen = ({navigation}) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const[signupError, setSignupError] = useState('');
	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [passwordVisibility2, setPasswordVisibility2] = useState(true);
    const onHandleSignup = async () => {
        try {
          if(passwordVerify !== password){
            setSignupError('Passwords do not match')
          }
          else if (email !== '' && password !== '') {
            await auth.createUserWithEmailAndPassword(email, password);
          }
          else{
            setSignupError("Email and password can't be blank")
          }
        } catch (error) {
          setSignupError(error.message);
        }
      };
    

   

    const onTermsPressed = () => {
        console.warn("Terms of Use");
    };

    const onPrivacyPressed = () => {
        console.warn("Privacy"); 
    };
        
    const onSignedInPressed = () => {
        navigation.navigate('Login')
    };
        
    return (
        
        <View style={styles.container}>
            <StatusBar style='dark-content' />
           <Text style={styles.title}>Create an Account</Text> 


            <CustomInput 
            placeholder = "Email" 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = 'email-address'
            autoFocus = {true}
            value ={email}
            setValue={setEmail}/>    

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
			{passwordVisibility? <Text style = {styles.font}> Show Password </Text> : <Text style = {styles.font}> Hide Password </Text>}
	  
			</TouchableOpacity>

            <CustomInput
            placeholder= "Confirm Password"
            autoCapitalize = 'none'
            autoCorrect = {false}
            secureTextEntry={passwordVisibility2}
            textContentType='password'
            autoFocus = {true}
            value={passwordVerify}
            setValue={setPasswordVerify}           
            />
			<TouchableOpacity onPress = {()=>setPasswordVisibility2(x => !x)}>
			{passwordVisibility2? <Text style = {styles.font}> Show Password </Text> : <Text style = {styles.font}> Hide Password </Text>}
	  
			</TouchableOpacity>

            {signupError ? <Text> {signupError} </Text> : null} 

            <CustomButton 
            text = "Register" 
            onPress={onHandleSignup}
            type  = "PRIMARY"
            />

            <Text style ={styles.text}>
                By registering, you confirm that you accept our
                <Text style ={styles.link} onPress={onTermsPressed}> Terms of use</Text> and 
                <Text style ={styles.link} onPress ={onPrivacyPressed}> Privacy Policy </Text>
            </Text>

            <CustomButton 
            text = "Already have an account? Sign in" 
            onPress={onSignedInPressed}
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
    },
    font:{
        color: 'gray',
        fontWeight: 'bold',
    }
});
export default SignUpScreen;