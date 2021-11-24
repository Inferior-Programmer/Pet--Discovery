import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';
import { StyleSheet, Text, View,TextInput ,Button,Image,TouchableOpacity, SafeAreaView ,ScrollView, LogBox,Platform, Alert, Touchable} from 'react-native';
import Firebase from '../config/firebase';
import * as Progress from 'react-native-progress';
import { useState,useEffect, useContext} from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function isVerified(userList){

  if(userList !=null &&(userList.length !=0)){
    if(userList[0]!=null){
      if(userList[0].verified){
        return 1;
      }
      else{
        return -1;
      }

  }

}

  return 0;

}

const firestore = firebase.firestore();

const auth = Firebase.auth();
const ConfigedTextInput = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        onChangeText={(value) => onChangeText(name, value)}
        {...props}
    />
);

export default function Verify({route,navigation}){
  const {itemId,id} = route.params
  const usersRef = firestore.collection('verifiedUsers');
  const [userList] = useCollectionData(usersRef.where("uid", "==",itemId), { idField: 'id' });
  let verification = isVerified(userList);
  if(verification == -1){
    return(<View style ={styles.View}>

      <Text> First Name: {userList[0].firstName}</Text>
      <Text> Middle Name: {userList[0].middleName} </Text>
      <Text> Last Name: {userList[0].lastName} </Text>
      <Text> Proof of Identity: </Text>
      <Image source = {{uri: userList[0].url}} style = {styles.imageSize}/>

      <View style ={styles.margin}>
      <Button title = 'Approve User Verification' 
      onPress = {async(event) => await firestore.collection('verifiedUsers').doc(id).update({verified:true})} />
      </View>
      <View style ={styles.margin}>
      <Button title = 'Reject User Verification' onPress = {async(event) => await firestore.collection('verifiedUsers').doc(id).delete()} />
      </View>
      </View>
    );
  }
  else if(verification == 1){
    return (
      <View style= {styles.container}>
      <StatusBar style='dark-content' />
      <Image 
     style = {[styles.imageStyle]}
     source ={require('./Images/verified.png')} 
     resizeMode="contain"     
     />
    </View>
    )
  }
  else{
    console.log(userList);
    return(
    <View style= {styles.container}>
      <StatusBar style='dark-content' />
      <Image 
     style = {[styles.imageStyle]}
     source ={require('./Images/rejected.png')} 
     resizeMode="contain"     
     />
    </View>
    );
  }





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
 display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderColor: '#ccc', borderWidth: 1,
            width: 300, height: 300, margin: 10,
            borderRadius: 15, backgroundColor: "#fff",
},
imageSize:{
    height:'40%',
    width:'80%',
  },
  View:{
    alignItems:"center",
    
    padding: 20,
    backgroundColor: "#fff",
    flex: 1    

  },margin:{
    marginBottom:10,
    
  },
  imageStyle: {
    width: "125%",
    height: 1440
  }
});
