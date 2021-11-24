import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {useState } from 'react';
import {TextInput ,Button, View, StyleSheet,Image, SafeAreaView, Text,ScrollView, LogBox} from 'react-native';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import 'firebase/compat/firestore';


const firestore = firebase.firestore();




export default function VerifyUsers({ navigation }) {
  const usersRef = firestore.collection('verifiedUsers');
  const query = usersRef.where("verified", "==", false).limit(25);
  const [users] = useCollectionData(query, { idField: 'id' });


  return (
  <SafeAreaView style = {styles.container}>
    <ScrollView>
		<View>
		{users && 	 users.map(user =>




		<View style = {styles.box}>

		<Text >{"First Name:" + user.firstName} {"\n"} {"Middle Name:"+user.middleName} {"\n"} {"Last name: " + user.lastName}</Text>

    <Button title = "Check This User's Verification Request!" onPress = {() => {
      navigation.navigate('VerifyUser',{itemId: user.uid, id: user.id});
    }} />
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
