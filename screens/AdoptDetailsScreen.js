import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, View,Image, useWindowDimensions,StyleSheet, Text,Alert, Button} from 'react-native';
import CustomInput1 from '../components/CustomInput(1)';
import CustomButton from '../components/CustomButton';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useContext } from 'react';
import Firebase from '../config/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/compat/firestore';
import { setStatusBarBackgroundColor } from 'expo-status-bar';



function isVerified(userList){

  if(userList !=null &&(userList.length !=0)){
    if(userList[0]!=null){
      if(userList[0].verified){
        return 1;
      }

  }

}

  return 0;

}

const auth = Firebase.auth();
const firestore = firebase.firestore();
export default function AdoptDetailsScreen({route, navigation}){
    const[data, setData] = useState(null);
    const {height} = useWindowDimensions();
    const {itemId} = route.params;
    const { user } = useContext(AuthenticatedUserContext);

    const usersRef = firestore.collection('verifiedUsers');

    const [userList] = useCollectionData(usersRef.where("uid", "==",user.uid), { idField: 'id' });

    firestore.collection('animalList').doc(itemId).get().then((snapshot) => {
      if(snapshot.exists){
        setData(snapshot.data());
      }
      else{
        setData(null);
      }
  }).catch((e) => console.log(e));




  const onAdoptPressed = async(event) => {

    const petAdoptionRef = firestore.collection('adoptedRequests');
    event.preventDefault();
    await petAdoptionRef.add({

    accepted: false,
    name: data.name,
    url: data.url,
    comment:data.comment,
    age: Number(data.age),
    uid: user.uid,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),




  });
  await firestore.collection('animalList').doc(itemId).delete().then(res => {

    Alert.alert('To View Details about pet adoption! Check the Pending Adoptions Screen');
  navigation.navigate('AdoptPets');
  }).catch((error) => {
    Alert.alert('Pet Adoption unsuccessful');
  });
};


    if(data && isVerified(userList) == 1){
      return(
        <View style = {styles.container}>
          <Image
          source = {{uri: data.url}}
          style = {[styles.Image,{height: height * 0.67}]}
          resizeMode="contain"
          />

          <CustomInput1
          placeholder = "Name: "
          editable = {false}
          value ={data.name}

          />

          <CustomInput1
          placeholder = "Age: "
          editable = {false}
          value ={String(data.age)}

          />

          <CustomInput1
          placeholder = "Comment: "
          editable = {false}
          value ={data.comment}

          />

          <Button
          title = "Adopt This Pet Now"
          onPress={onAdoptPressed}

          />
        </View>

      );
    }
    else if(data && isVerified(userList) == 0){
      return(
        <View style= {styles.container}>
        <StatusBar style='dark-content' />
             <Image 
            style = {[styles.imageStyle]}
            source ={require('./Images/verify.png')} 
            resizeMode="contain"     
            />
        </View>
    );
    }

    else{
      return(
        <View style= {styles.container}>
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

    Image:{
        width: "100%",
        height: "100%",
        borderRadius: 5
    },
   
      container: {
        alignItems:'center',
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
