import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, Image, useWindowDimensions,StyleSheet,TouchableOpacity, Text,TextInput,View,Alert, Button, Platform} from 'react-native';
import CustomInput1 from '../components/CustomInput(1)';
import CustomButton from '../components/CustomButton';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useContext } from 'react';
import Firebase from '../config/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import 'firebase/compat/firestore';

const auth = Firebase.auth();
const firestore = firebase.firestore();
export default function ApproveAdoption({route, navigation}){

    const [show, setShow] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('')
    const[data, setData] = useState(null);
    const {height} = useWindowDimensions();
    const {itemId} = route.params;
    const { user } = useContext(AuthenticatedUserContext);
    firestore.collection('adoptedRequests').doc(itemId).get().then((snapshot) => {
      if(snapshot.data().accepted==false){
        setData(snapshot.data());
      }
      else{
        setData(null);
      }
    }).catch((e) => console.log(e));

      



      const onAdoptPressed = async(event) => {

        const petAdoptionRef = firestore.collection('adoptedRequests');
        event.preventDefault();
        await petAdoptionRef.doc(itemId).update({accepted:true,declined:false});
        Alert.alert('Pet Adoption Approved!');
        navigation.navigate('ApprovePetAdoptions');
      };
      const onAdoptPressedTwo = async(event) => {

        const animalsRef = firestore.collection('animalList');
        event.preventDefault();
        await animalsRef.add({
        name: data.name,
        url: data.url,
        age: Number(data.age),
        comment: data.comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),

     });

        const petAdoptionRef = firestore.collection('adoptedRequests');
        event.preventDefault();
        await petAdoptionRef.doc(itemId).update({accepted:true,declined:true} );
        Alert.alert('Pet Adoption Declined!');
        navigation.navigate('ApprovePetAdoptions');
      };


    if(data){
      return(
        <SafeAreaView style = {styles.container}>
          <Image
          source = {{uri: data.url}}
          style = {[styles.Image,{height: height * 0.30}]}
          resizeMode="contain"
          />

          <CustomInput1
          placeholder = "Pet Name: "
          editable = {false}
          value ={data.name}

          />

          <CustomInput1
          placeholder = "Pet Age: "
          editable = {false}
          value ={String(data.age)}

          />

          <CustomInput1
          placeholder = "Pet Comment: "
          editable = {false}
          value ={data.comment}

          />

          <CustomInput1
          placeholder = "User Email: "
          editable = {false}
          value ={data.email}

          />
          <View style = {styles.margin}>
          <Button
          title = "Approve User Adoption Request"
          onPress={onAdoptPressed}
          />
         </View>

         <View style = {styles.margin}>
          <Button
          title = "Decline User Adoption Request"
          onPress={onAdoptPressedTwo}
          />
            </View>
        </SafeAreaView>

      );
    }

    else{
      return(
        
        <View style= {styles.containerr}>
        <StatusBar style='dark-content' />
             <Image 
            style = {[styles.imageStyle]}
            source ={require('./Images/notExist.png')} 
            resizeMode="contain"     
            />
        </View>

        


      );
    }
};

const styles = StyleSheet.create({
    margin:{
      margin: 10
    },
    Image:{
        width: "100%",
        height: "100%",
        borderRadius: 5
    },
   
    container:{
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
