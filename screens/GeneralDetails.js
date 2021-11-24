import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, Image,StyleSheet, View} from 'react-native';


export default function GeneralDetails({navigation}){
  return(
    
<View style= {styles.container}>
             <StatusBar style='dark-content' />
             <Image 
            style = {[styles.imageStyle]}
            source ={require('./Images/rules.png')} 
            resizeMode="contain"     
            />
        </View>
    
  );

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
