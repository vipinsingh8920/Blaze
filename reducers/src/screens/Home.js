import { View, Text, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'react-native-axios';
import Carousal from './Carousel'
import PopularSports from './PopularSports'
import UpcomingMatches from './UpcomingMatches';
import {ApiURL} from '../../helpers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import COLORS from '../../Components/Color';

export default function Home() {

const[topPlayer,setTopPlayer]=useState([]);
const[topClub,setTopClub]=useState([]);
const[playerSlider,setPlayerSlider]=useState([]);

const[isLoading,setIsLoading]=useState(false);

const userDetail = useSelector(state => state.user);
//  /console.log(userDetail.userData.id)   
 
      const getAllApi=async()=>{
      setIsLoading(true);
      try{
      const player = axios.get(`${ApiURL}top-player/2/${userDetail?.userData.id}`);
      const club = axios.get(`${ApiURL}top-club/3`);
      const slider = axios.get(`${ApiURL}player-slider/Player`);
      await axios.all([player, club, slider],{headers: {
        'secretkey': `${await AsyncStorage.getItem('secretkey')}`,
        'Authorization': `Bearer ${await AsyncStorage.getItem('access_token')}`,
      }}).then(axios.spread(function(res1, res2, res3) {
          setIsLoading(false);
          setTopPlayer(res1.data.data);
          setTopClub(res2.data.data);
          setPlayerSlider(res3.data.data);
      }));
        }
        catch(e){
          setIsLoading(false);
          console.log(e);
        }}


  useEffect(()=>{
    getAllApi();
  },[]);
  return (
    <>
    {isLoading==true&&<Loader/>}   
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '100%', backgroundColor: COLORS.dark }}>
          <View style={{height:330,width:"100%"}}>
          <Carousal playerSlider={playerSlider} />
          </View>
          <View style={{ paddingTop: 10,marginTop:10 }}>
            <PopularSports topPlayer={topPlayer} />
          </View>

        </View>
        <View style={{ marginTop: 0 }}>
          <UpcomingMatches topClub={topClub} />
        </View>
      </ScrollView>

    </>
  )
}