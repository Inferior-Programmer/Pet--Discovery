import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useState } from 'react';
import {TextInput ,Button, View, StyleSheet,Image, SafeAreaView, Text,ScrollView, LogBox} from 'react-native';

import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import 'firebase/compat/firestore';


const firestore = firebase.firestore();




export default function ApprovePetAdoptions({ navigation }) {
  const animalsRef = firestore.collection('adoptedRequests');
  const query = animalsRef.where("accepted", "==", false).limit(25);
  const [animals] = useCollectionData(query, { idField: 'id' });


  return (
  <SafeAreaView style = {styles.container}>
    <ScrollView>
		<View>
		{animals && 	 animals.map(animal =>




		<View style = {styles.box}>
    <Image style ={styles.imageSize} source = {{uri:animal.url}}/>
		<Text > {"Pet Name:" + animal.name} {"\n"} {"Pet Age:"+animal.age} {"\n"} {"User email: " + animal.email}</Text>

    <Button title = "Approve this user's adoption request!" onPress = {() => {
      console.log(animal.id);
    navigation.navigate("ApproveAdoption", {itemId: animal.id})}} />
		</View>
		)}
		</View>
    </ScrollView>
	</SafeAreaView >
  );
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
});
