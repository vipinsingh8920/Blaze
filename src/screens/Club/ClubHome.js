import react,{useState,useEffect} from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import PopularSports from '../PopularSports';
import axios from 'react-native-axios';
import ClubCarousel from './ClubCarousel';
import Newz from './Newz';
import { ApiURL } from '../../../helpers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import COLORS from '../../../Components/Color';


export default function ClubHome({navigation}) {
    const[topPlayer,setTopPlayer]=useState([]);
    const[topNews,setNews]=useState([]);
    const[playerSlider,setPlayerSlider]=useState([]);

    const userDetail = useSelector(state => state.user);
   

    const getAllApi=async()=>{
              try{
            const player = axios.get(`${ApiURL}top-player/2/${userDetail.userData.id}`);
            const news = axios.get(`${ApiURL}news`);
            const slider = axios.get(`${ApiURL}player-slider/Club`);
            await axios.all([player, news, slider],{headers: {
              'secretkey': `${await AsyncStorage.getItem('secretkey')}`,
              'Authorization': `Bearer ${await AsyncStorage.getItem('access_token')}`,
            }}).then(axios.spread(function(res1, res2, res3) {
                setTopPlayer(res1.data.data);
                setNews(res2.data.data.data);
                setPlayerSlider(res3.data.data);
            }));
              }
              catch(e){
                console.log(e);
              }}
      
        useEffect(()=>{
          getAllApi();
        },[]);

    return (
        <>
            <ScrollView>
                <View style={{ flex: 1, width: '100%', backgroundColor:COLORS.dark }}>
                    <ClubCarousel playerSlider={playerSlider} />
                    <View>
                    <PopularSports topPlayer={topPlayer}/>
                    </View>
                    <Newz  topNews={topNews}/>
                </View>
            </ScrollView>
        </>
    );
}