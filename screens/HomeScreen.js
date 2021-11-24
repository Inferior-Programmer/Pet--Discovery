import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState} from 'react';
import { StyleSheet, Text, View,TextInput ,Button,Image, SafeAreaView,TouchableOpacity,useWindowDimensions ,ScrollView, LogBox } from 'react-native';
import PetResults from './PetResults'
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import AdoptDetailsScreen from './AdoptDetailsScreen';
import AdoptionScreen from './AdoptionScreen';
import GeneralDetails from './GeneralDetails';
import AboutScreen from './AboutScreen';
import ContactUs from './ContactUsScreen';
import UserVerificationScreen from './UserVerificationScreen';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import 'firebase/compat/firestore';
import ContactUsScreen from './ContactUsScreen';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
const firestore = firebase.firestore();
const auth = Firebase.auth();
const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.textButtonStyle}>{title}</Text>
  </TouchableOpacity>
); 



function Home({navigation}){
  const { user } = useContext(AuthenticatedUserContext);
  const [verified, setVerified] = useState(false);
  const [name,setName] = useState('');
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const usersRef = firestore.collection('verifiedUsers');
  const query = usersRef.where("uid", "==", user.uid).get().then((querySnapshot) =>
  {
    if(querySnapshot.size == 0){

      setVerified(false);
    }
    else{

      querySnapshot.forEach(function(doc) {
          
            setVerified(doc.data().verified);
			if(doc.data().verified){
				setName(doc.data().firstName + " " + doc.data().middleName + " " +  doc.data().lastName);
			}
        });
    }
  }
  );
  
  if(verified){
	  return(
    

    <View style ={styles.screenContainer}>
    <Text style={styles.welcomeStyle}> WELCOME {name}! </Text>
    <AppButton title="Pet Discovery" size="sm" backgroundColor="#48b9b6" />
    <Text style={styles.textStyle}> TOUCH TO NAVIGATE </Text>
    <View style={styles.controlSpace}>

      <TouchableOpacity onPress = {() => navigation.navigate("AdoptPets")}>
        <Image style={styles.imageStyle} source={require('./Images/adopt.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('About')}>
        <Image style={styles.imageStyle} source={require('./Images/about.png')} />
        </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('GeneralDetails')}>
        <Image style={styles.imageStyle} source={require('./Images/guidelines.png')} />
      </TouchableOpacity>
        
      <TouchableOpacity onPress = {() => navigation.navigate('Contact')}>
        <Image style={styles.imageStyle} source={require('./Images/contact.png')} />
        </TouchableOpacity>
      
      </View>
    </View>
    
  );s
	  
	  
  }
  
  return(
    

    <View style ={styles.screenContainer}>
    <Text style={styles.welcomeStyle}> WELCOME {user.email}! </Text>
    <AppButton title="Pet Discovery" size="sm" backgroundColor="#48b9b6" />
    <Text style={styles.textStyle}> TOUCH TO NAVIGATE </Text>
    <View style={styles.controlSpace}>
       
        <TouchableOpacity onPress = {() => navigation.navigate("AdoptPets")}>
        <Image style={styles.imageStyle} source={require('./Images/adopt.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('About')}>
        <Image style={styles.imageStyle} source={require('./Images/about.png')} />
        </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('GeneralDetails')}>
        <Image style={styles.imageStyle} source={require('./Images/guidelines.png')} />
      </TouchableOpacity>
        
      <TouchableOpacity onPress = {() => navigation.navigate('Contact')}>
        <Image style={styles.imageStyle} source={require('./Images/contact.png')} />
        </TouchableOpacity>
      
      </View>
    </View>
    
  );




}



const Drawer = createDrawerNavigator();

function DrawerSpecializedContent(props){
  const { user } = useContext(AuthenticatedUserContext);
  const [verified, setVerified] = useState(false);
  const [name,setName] = useState('');
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const usersRef = firestore.collection('verifiedUsers');
  const query = usersRef.where("uid", "==", user.uid).get().then((querySnapshot) =>
  {
    if(querySnapshot.size == 0){

      setVerified(false);
    }
    else{

      querySnapshot.forEach(function(doc) {
          
            setVerified(doc.data().verified);
			if(doc.data().verified){
				setName(doc.data().firstName + " " + doc.data().middleName + " " +  doc.data().lastName);
			}
        });
    }
  }
  );






	return(
		<DrawerContentScrollView {...props}>
      <View style = {styles.container}>
      <Image 
      source ={require('./Images/LOGO.png')} 
      style = {styles.imageSize}
      resizeMode = 'contain' 
      />
      </View>
			<View>
      
			{!verified? <Text> Welcome {user.email}! </Text>: <Text style = {styles.font}> Welcome {name} </Text> }
      {!verified? <DrawerItem label = "Get Verified Now!"  onPress ={() =>
        props.navigation.navigate("UserVerificationScreen")}/>: <Text> User Verified! </Text> }

      <DrawerItem
      label = "Home"
      onPress = {() => props.navigation.navigate("Home")}
      />
			<DrawerItem
				label = "Adopt Pets"
        onPress = {() => props.navigation.navigate("AdoptPets")}
				/>
			<DrawerItem
			label = "Adoption Status"
      onPress = {() => props.navigation.navigate("Pending")}
	  />
    	<DrawerItem
			label = "Contact Us"
      onPress = {() => props.navigation.navigate("Contact")}
	  />
    <DrawerItem
			label = "About Us"
      onPress = {() => props.navigation.navigate("About")}
	  />
    <DrawerItem
      label = "Sign Out"
      onPress = {handleSignOut}
      />




			</View>
		</DrawerContentScrollView>


	);


}









export default function HomeScreen() {
  return (


      <Drawer.Navigator drawerContent = {(props) => <DrawerSpecializedContent{...props}/>} initialRouteName="Home">
        <Drawer.Screen name = "Home" component = {Home} options={{title:'Home' }}/>
        <Drawer.Screen name = "AdoptPets" component = {PetResults} options={{ title:'Adopt pets'}}/>
        <Drawer.Screen name = "About" component = {AboutScreen} options ={{title: 'About Us'}}/>
        <Drawer.Screen name = "Contact" component = {ContactUsScreen} options ={{title: 'Contact Us'}}/>
        <Drawer.Screen name = "AdoptDetailsScreen" component = {AdoptDetailsScreen}  options={{ headerShown: true, title: 'Adopt Pets' }}/>
        <Drawer.Screen name = "Pending"  component = {AdoptionScreen} options={{ headerShown: true, title:"Adoption Status"}}/>
        <Drawer.Screen name = "GeneralDetails" component = {GeneralDetails} options={{ title: 'Adoption General Guidelines'}}/>
        <Drawer.Screen name = "UserVerificationScreen" component = {UserVerificationScreen} options={{ title: 'Verify your Account Now!' }}/>
      </Drawer.Navigator>

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
    height:140,
    width:250,
    marginBottom:20,
  },
  font:{
    fontWeight:'bold'
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff"
  }, 
  buttonStyle: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  textButtonStyle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  imageStyle: { 
    elevation: 8,
    height: 250,
    width: 160,
    marginHorizontal: 10,
    marginBottom: 0
  },
  textStyle: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
    paddingTop: 10
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  welcomeStyle: {
    fontSize: 19,
    color: 'black',
    padding: 10,
  }


});