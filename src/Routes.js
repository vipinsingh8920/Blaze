import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import Discover from './screens/Discover';
import UpcomingMatches from './screens/UpcomingMatches';
import PopularTeams from './screens/PopularTeams';
import DetailScreen from './screens/DetailScreen';
import OnboardScreen from './screens/OnboardScreen';
import ChooseOption from './screens/ChooseOption';
import DrawerNavigator from './screens/DrawerNavigator';
import ChangePassword from './screens/ChangePassword';
import MatchScreen from './screens/MatchScreen';
import Highlights from './screens/Highlights';
import EditProfile from './screens/EditProfile';
import Club from './screens/Club';
import Contact from './screens/Contact';
import Carousal from './screens/Carousel';
import Profile from './screens/Profile';
// import SignUpScreen from './screens/SignUpScreen';
import ClubHome from './screens/Club/ClubHome';
import ClubDrawerNavigator from './screens/ClubDrawerNavigator';
import { ClubDrawerContent } from './screens/Club/ClubDrawerContent';
import FilterPlayer from './screens/FilterPlayer';
import ClubCriteria from './screens/ClubCriteria';
import UserList from './screens/UserList';
import Message from './screens/Message';
import Notification from './screens/Notification';
import VideoPlayer from './screens/VideoPlayer';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClubNavigator from './screens/Club/ClubNavigator';
import ClubProfile from './screens/Club/ClubProfile';
import AllPlayers from './screens/AllPlayers';
import WatchList from './screens/Club/WatchList';




export default function Routes() {

    const Stack = createNativeStackNavigator();

    const [service,setService] = useState(2);

const data=async()=>{
const res=await AsyncStorage.getItem('userDetail')
setService(JSON.parse(res)?.data.detail.id_cms_privileges)
}

useEffect(()=>{
data();
},[])

   // DrawerNavigator
   //ClubDrawerNavigator
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
                headerShown: false
            }}>

                <Stack.Screen name='HomeScreen' component={service==2?DrawerNavigator:ClubNavigator} />
               
                <Stack.Screen name="onboardScreen" component={OnboardScreen} options={{ headerShown: false }}
                />
                 <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }}
                />
                 <Stack.Screen name="Message" component={Message} options={{ headerShown: false }}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}
                />

                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}
                />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}
                />


                <Stack.Screen name="discover" component={Discover} options={{ headerShown: false }}
                />
                <Stack.Screen name="Teams" component={PopularTeams} options={{ headerShown: false }}
                />
                <Stack.Screen name="Upcoming" component={UpcomingMatches} options={{ headerShown: false }}
                />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}
                />
                <Stack.Screen name="ChooseOption" component={ChooseOption} options={{ headerShown: false }}
                />
                <Stack.Screen name="ChangePass" component={ChangePassword} options={{ headerShown: false }}
                />
                <Stack.Screen name="Matches" component={MatchScreen} options={{ headerShown: false }}
                />
                <Stack.Screen name="High" component={Highlights} options={{ headerShown: false }}
                />
                
                <Stack.Screen name="Edit" component={EditProfile} options={{ headerShown: false }}
                />
                <Stack.Screen name="club" component={Club} options={{ headerShown: false }}
                />

                <Stack.Screen name="contact" component={Contact} options={{ headerShown: false }}
                />
                <Stack.Screen name="carousel" component={Carousal} options={{ headerShown: false }}
                />
                <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }}
                />
{/* 
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}
                /> */}
                <Stack.Screen name="clubhome" component={ClubHome} options={{ headerShown: false }}
                />
                <Stack.Screen name="clubContent" component={ClubDrawerContent} options={{ headerShown: false }}
                />
                <Stack.Screen name="FilterPlayer" component={FilterPlayer} options={{ headerShown: false }}
                />
                <Stack.Screen name="clubcriteria" component={ClubCriteria} options={{ headerShown: false }}
                />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}
                />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }}
                />
                 <Stack.Screen name="ClubProfile" component={ClubProfile} options={{ headerShown: false }}
                />
                <Stack.Screen name="AllPlayers" component={AllPlayers} options={{ headerShown: false }}
                />
                <Stack.Screen name="WatchList" component={WatchList} options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )}