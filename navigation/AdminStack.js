import React from 'react';

import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import { useContext } from 'react';
import { StyleSheet, Text, View,TextInput ,Button,Image, SafeAreaView ,ScrollView, LogBox } from 'react-native';

import AddPetScreen from '../screens/AddPetScreen';
import ApprovePetAdoptions from '../screens/ApprovePetAdoptions';
import ApproveAdoption from '../screens/ApproveAdoption';
import VerifyUsers from '../screens/VerifyUsers';
import Verify from '../screens/Verify';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
const Drawer = createDrawerNavigator();

const auth = Firebase.auth();
function DrawerSpecializedContent(props){
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

	return(
		<DrawerContentScrollView {...props}>
      <View style = {styles.container}>
      <Image 
      source ={require('./Image/LOGO.png')} 
      style = {styles.imageSize}
      resizeMode = 'contain' 
      />
      </View>
			<View>

      <Text style ={styles.font}> Welcome Admin! </Text>

      <DrawerItem label = "Add pet"

      onPress = {() => props.navigation.navigate("Add pet")}
      />
			<DrawerItem
				label = "Verify Users"
        onPress = {() => props.navigation.navigate("Verify Users")}
				/>

        <DrawerItem
          label = "Approve Pet Adotpions"
          onPress = {() => props.navigation.navigate("ApprovePetAdoptions")}
          />

      <DrawerItem
      label = "Sign Out"
      onPress = {handleSignOut}
      />




			</View>
		</DrawerContentScrollView>


	);


}

export default function AdminStack() {
  return (
    <Drawer.Navigator drawerContent = {(props) => <DrawerSpecializedContent{...props}/>} initialRouteName="Home">
      <Drawer.Screen name = "Add pet" component = {AddPetScreen} options = {{title: 'Add Pet'}}/>
      <Drawer.Screen name = "Verify Users" component = {VerifyUsers}/>
      <Drawer.Screen name = "VerifyUser" component ={Verify}  options = {{title: 'Verify User'}}/>
      <Drawer.Screen name = "ApprovePetAdoptions" component = {ApprovePetAdoptions} options = {{title: 'Approve Pet Adoptions'}}/>
      <Drawer.Screen name = "ApproveAdoption" component = {ApproveAdoption} options = {{title: 'Approve Pet Adoption'}}/>
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
  font:{
    fontWeight:'bold'
  },
  imageSize:{   
    height:140,
    width:250,
    marginBottom:20,
  },

})