import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import OnboardScreen from './screens/OnboardScreen';
import ChooseOption from './screens/ChooseOption';
import ClubCarousel from './screens/Club/ClubCarousel';
import ClubHome from './screens/Club/ClubHome';
import ClubNavigator from './screens/Club/ClubNavigator';
import Club from './screens/Club';
import Contact from './screens/Contact';
import DetailScreen from './screens/DetailScreen';
import FilterCategory from './screens/Club/FilterCategory';
import SalaryFilter from './screens/Club/SalaryFilter';
import Position from './screens/Club/Position';
import Age from './screens/Club/Age';
import Home from './screens/Home';
import ClubProfile from './screens/Club/ClubProfile';
import WatchList from './screens/Club/WatchList';
import OTPScreen from './screens/OTPScreen';
import PasswordChange from './screens/PasswordChange';

export default function Routes() {

    const Stack = createNativeStackNavigator();


    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="OnboardScreen" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="onboardScreen" component={OnboardScreen} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}
                    />

                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ChooseOption" component={ChooseOption} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}
                    />

                    <Stack.Screen name="clubnavigate" component={ClubNavigator} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Club-Carousel" component={ClubCarousel} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="club" component={Club} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="contact" component={Contact} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="FilterCategory" component={FilterCategory} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="SalaryFilter" component={SalaryFilter} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Position" component={Position} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="age" component={Age} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ClubProfile" component={ClubProfile} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="watchlist" component={WatchList} options={{ headerShown: false }}
                    />
                      <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }}
                    />
                    <Stack.Screen name="PasswordChange" component={PasswordChange} options={{ headerShown: false }}
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}