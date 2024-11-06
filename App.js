
import React, {useState,useEffect} from 'react';
import Routes from './src/Routes';
import AuthScreen from './src/AuthScreen';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { addToken } from './reducers/authReducer'
import NetInfo from "@react-native-community/netinfo";
import LottieView from 'lottie-react-native';
import {View,StyleSheet,StatusBar,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen'
import { requestUserPermission,notificationListener } from './Utils/notificationServices';


const store = configureStore({
  reducer: {
    user: authReducer
  }
})

function App() {
  const dispatch = useDispatch();
  const {token,loading} = useSelector(state => state.user)
  const [isConnected, setIsConnected] = useState(false);
  const [isloading, setIsLoading]=useState('splash');

   useEffect(()=>{
    requestUserPermission()
    notificationListener();
   },[])

  useEffect(()=>{
    // Subscribe
   const unsubscribe = NetInfo.addEventListener(state => {
   setIsConnected(state.isConnected);
   if(!state.isConnected){
   setIsLoading('netInfo');
   }
   });

   return ()=>{
   unsubscribe();
   };
   },[]);

   useEffect(() => {
    SplashScreen.hide();
    dispatch(addToken())
    
  }, [])

 
   

  const Check_Internet=async()=>{
 
    await NetInfo.fetch().then(state => {
          setIsConnected(state.isConnected)
          setIsLoading('netInfo');
      });
  }

  function CheckInterNet(){
    return (
       <View style={styles.container}>
                    <LottieView source={require('./Assets/no-internet-connection.json')} autoPlay loop />
                    <Button  style={{marginTop:250,backgroundColor:"#000",padding:5}} onPress={()=>Check_Internet()} icon="wifi" mode="contained" >
                      retry
                  </Button>
       </View>
    );
  }

     
  const routeName= {
    'netInfo': <CheckInterNet/>,
    'auth':<AuthScreen/>,
    'home':<Routes/>
 }

  const Loader=()=>{
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar
          animated={true}
          backgroundColor="#888888"
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }
 
  
  setTimeout(() => {
    if(!loading){
  if(token===null||token===undefined){
    setIsLoading('auth');
  }
  else{
    setIsLoading('home');
  }
   }
   }, 1000);

  return (
    routeName[isloading]||<Loader/>
 );

}



export default () => {

  

  return (

    <Provider store={store}>
     <App />
      <FlashMessage
        position="top"
        duration={4000}
      />
    </Provider>
   
  )
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center",
  }
})

