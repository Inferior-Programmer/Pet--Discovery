import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput ,Button,Image, SafeAreaView ,ScrollView, LogBox,Platform, Alert} from 'react-native';
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
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
const firestore = firebase.firestore();

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

const auth = Firebase.auth();
const ConfigedTextInput = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        onChangeText={(value) => onChangeText(name, value)}
        {...props}
    />
);

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuidv4());
  const snapshot = await ref.put(blob);
  const remoteUri = await snapshot.ref.getDownloadURL();

  // We're done with the blob, close and release it
  blob.close();

  return remoteUri
}


export default function UserVerificationScreen({navigation}){
	const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage]  = useState(null);
  const [uploading, setUpload] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(null);
  const [verified, setVerified] = useState(false);
  const { user } = useContext(AuthenticatedUserContext);

  const usersRef = firestore.collection('verifiedUsers');

  const [userList] = useCollectionData(usersRef.where("uid", "==",user.uid), { idField: 'id' });




  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

  };


  const handleSubmit = async(event) => {

    if(firstName === '' || image ==null || lastName === '' || middleName === ''){
      setError("All parameters must be set");
    }


    else{



      const uploadUrl = await uploadImageAsync(image);

  	  const animalsRef = firestore.collection('verifiedUsers');
      event.preventDefault();
      await animalsRef.add({
  		firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      url: uploadUrl,
      verified: false,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
  	});
      setFirstName('');
      setLastName('');
      setMiddleName('');
      setImage(null);
      setError(false);
      Alert.alert(
        'User Verification Uploaded Successfully'
      );
  }
  }
  if(isVerified(userList) == -1){
    return(

        <View style= {styles.AnimatedContainer}>
             
             <Image 
            style = {[styles.imageStyle]}
            source ={{uri:"https://i.ibb.co/JBNwjzm/wait.gif"}} 
            resizeMode="contain"     
            />
        </View>

      
    );
  }
  else if(isVerified(userList) == 1){
    return (
      <SafeAreaView>

        <Text> User Verified ! </Text>

        </SafeAreaView>
    )
  }
  else{
    return(
      <View style = {styles.View}>
      <CustomInput 
      placeholder = 'Enter first name'
      autoCapitalize = 'none'
      autoCorrect = {false}
      autoFocus = {true}
      value = {firstName}
      setValue = {setFirstName}
      />
      <CustomInput
       placeholder = 'Enter middle name'
      autoCapitalize = 'none'
      autoCorrect = {false}
      autoFocus = {true}
      value = {middleName}
      setValue = {setMiddleName}
      />
      <CustomInput 
      placeholder = 'Enter last name'
      autoCapitalize = 'none'
      autoCorrect = {false}
      autoFocus = {true}
      value = {lastName}
      setValue = {setLastName}
      />
      <CustomButton
        onPress={selectImage}
        type = "PRIMARY"
        text='Upload Proof of Identity'       
        
        
      />


      {image !== null ? (
            <Image source={{ uri: image }} style={styles.imageSize} />
          ) : null}
      {error? <Text> {error} </Text>: null}

      <CustomButton
        onPress={handleSubmit}
        type = "PRIMARY"
        text='Submit'      
        
      />
      {uploading? <Progress.Bar progress={transferred} width={200} />: null}
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

    height:100,
    width:100,
  },
  View:{
    alignItems:"center",
        padding: 20,    
  },
  AnimatedContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1  
  },
    imageStyle: {
    width: "125%",
    height: 1440
  }
});
