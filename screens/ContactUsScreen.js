import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View,Image,StyleSheet} from 'react-native'

const ContactUsScreen = ({navigation}) => {
    return(
          <View style= {styles.container}>
             <StatusBar style='dark-content' />
             <Image 
            style = {[styles.imageStyle]}
            source ={require('./Images/contactUs.png')} 
            resizeMode="contain"     
            />
        </View>
      
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor: "#fff"  
    },
    imageStyle: {
      width: "125%",
      height: 1440
    }
  });
export default ContactUsScreen;