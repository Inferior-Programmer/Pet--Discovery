import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useContext } from 'react';
import {useState } from 'react';
import {TextInput ,Button, View, StyleSheet,Image, SafeAreaView, Text,ScrollView, LogBox} from 'react-native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Firebase from '../config/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import 'firebase/compat/firestore';


const firestore = firebase.firestore();

const auth = Firebase.auth();


function DeclinedAdoptions({navigation}){



  const animalsRef = firestore.collection('adoptedRequests');
  const { user } = useContext(AuthenticatedUserContext);
  const query = animalsRef.where("uid", "==", user.uid).limit(50);
  const [animals] = useCollectionData(query);


  return (
  <SafeAreaView style = {styles.container}>
    <ScrollView>
		<View style = {styles.container}>
		{animals && 	 animals.map(animal =>{
      if(animal.accepted && animal.declined){
        return(
  		<View style = {styles.box}>
      <Image style ={styles.imageSize} source = {{uri:animal.url}}/>
  		<Text > {"Name:" + animal.name} {"\n"} {"Age:"+animal.age} </Text>

      <Button title = "Application Denied Please Retry to Adopt the Pet on our page"
      disabled = {animal.declined}
      onPress = {() => {
        navigation.navigate('GeneralDetails')}} />
  		</View>);
      }
      else{
        return(<View>
        </View>)
      }
    }
    )}
		</View>
    </ScrollView>
	</SafeAreaView >
  );
}


function AcceptedAdoptions({navigation}){



  const animalsRef = firestore.collection('adoptedRequests');
  const { user } = useContext(AuthenticatedUserContext);
  const query = animalsRef.where("uid", "==", user.uid).limit(50);
  const [animals] = useCollectionData(query);


  return (
  <SafeAreaView style = {styles.container}>
    <ScrollView>
		<View style = {styles.container}>
		{animals && 	 animals.map(animal =>{
      if(animal.accepted && !animal.declined){
        return(
  		<View style = {styles.box}>
      <Image style ={styles.imageSize} source = {{uri:animal.url}}/>
  		<Text > {"Name:" + animal.name} {"\n"} {"Age:"+animal.age} </Text>

      <Button 
      style = {styles.buttonColor}
      title = "Check Details on where to or how to get your new friend!"
      disabled = {!animal.accepted}
      onPress = {() => {
        navigation.navigate('GeneralDetails')}} />
  		</View>
    );
      }
      else{
        return(<View>
        </View>)
      }
    }
    )}
		</View>
    </ScrollView>
	</SafeAreaView >
  );
}


function PendingAdoptions({navigation}){



  const animalsRef = firestore.collection('adoptedRequests');
  const { user } = useContext(AuthenticatedUserContext);
  const query = animalsRef.where("uid", "==", user.uid).limit(50);
  const [animals] = useCollectionData(query);


  return (
  <SafeAreaView 
  style = {styles.container}>
    
    <ScrollView>
		<View style = {styles.container}>
		{animals && 	 animals.map(animal =>{
      if(!animal.accepted){
        console.log(animal.accepted);
        return(
  		<View style = {styles.box}>
      <Image style ={styles.imageSize} source = {{uri:animal.url}}/>
  		<Text > {"Name:" + animal.name} {"\n"} {"Age:"+animal.age} </Text>

      <Button 
      style = {styles.buttonColor}
      title = {animal.accepted?"Check Details on where to or how to get your new friend!" :"Application is Pending"}
      disabled = {!animal.accepted}
      onPress = {() => {
        navigation.navigate('GeneralDetails')}} />
  		</View>);
      }
      else{
        return(<View>
        </View>)
      }
    }
    )}
		</View>
    </ScrollView>
	</SafeAreaView >
  );
}


const Tab = createBottomTabNavigator();


export default function AdoptionScreen({ navigation }) {
    return(


      <Tab.Navigator screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
            fontWeight:"700",
            fontSize: 10
        },
        tabBarIconStyle: { display: "none" }}}>
        <Tab.Screen name="Pending Adoptions" component={PendingAdoptions} />
        <Tab.Screen name="Declined Adoptions" component={DeclinedAdoptions} />
        <Tab.Screen name="Accepted Adoptions" component={AcceptedAdoptions}/>
      </Tab.Navigator>
  
    )

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
    height:100,
    width:100,
  },
  buttonColor:{
    backgroundColor: '#48b9b6'
  }
});
