import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput ,Button,Image, SafeAreaView ,ScrollView, LogBox,Platform, Alert} from 'react-native';
import Firebase from '../config/firebase';
import * as Progress from 'react-native-progress';
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const firestore = firebase.firestore();

const ConfigedTextInput = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        onChangeText={(value) => onChangeText(name, value)}
        {...props}
    />
)

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


export default function VerifyScreen({navigation}){
	const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage]  = useState(null);
  const [uploading, setUpload] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(null);
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

    if(name === '' || image ==null || comment === '' || age === ''){
      setError("All parameters must be set");
    }


    else{



      const uploadUrl = await uploadImageAsync(image);

  	  const animalsRef = firestore.collection('animalList');
      event.preventDefault();
      await animalsRef.add({
  		name: name,
      url: uploadUrl,
  		age: Number(age),
      comment: comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),




  	});
      setName('');
      setAge('');
      setComment('');
      setImage(null);
      setError(false);
      Alert.alert(
        'Pet Details Uploaded Successfully!'
      );
  }
  }

  return(<SafeAreaView>
    <View>
    <TextInput placeholder = 'Enter First Name'
    autoCapitalize = 'none'
    autoCorrect = {false}
    autoFocus = {true}
    value = {name}
    onChangeText = {text => setName(text)}
    />
    <TextInput placeholder = 'Enter Middle Name'
    autoCapitalize = 'none'
    autoCorrect = {false}
    keyboardType = 'phone-pad'
    autoFocus = {true}
    value = {age}
    onChangeText = {text => setAge(text.replace(/[^0-9]/g, ""))}
    />
    <TextInput placeholder = 'Enter Last Name'
    autoCapitalize = 'none'
    autoCorrect = {false}
    autoFocus = {true}
    value = {comment}
    onChangeText = {text => setComment(text)}
    />

    
    <Button
      onPress={selectImage}
      backgroundColor='#f57c00'
      title='Upload proof of identity!'
      tileColor='#fff'
      titleSize={20}
      containerStyle={{
        marginBottom: 24
      }}
    />


    {image !== null ? (
          <Image source={{ uri: image }} style={styles.imageSize} />
        ) : null}
    {error? <Text> {error} </Text>: null}

    <Button
      onPress={handleSubmit}
      backgroundColor='#f57c00'
      title='Submit'
      tileColor='#fff'
      titleSize={20}
      containerStyle={{
        marginBottom: 24
      }}
    />
    {uploading? <Progress.Bar progress={transferred} width={200} />: null}
    </View>
    </SafeAreaView>
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
