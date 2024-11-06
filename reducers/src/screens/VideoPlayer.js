import { StyleSheet, Text, View,StatusBar,TouchableOpacity,platForm } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import COLORS from '../../Components/Color';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {  ImageURL } from '../../helpers/axios';
import { useIsFocused } from '@react-navigation/native';


const VideoPlayer = ({route}) => {
const isFocused=useIsFocused();

    const {item}=route.params;

    const [video,setVideo] = useState('');
    const [isMuted, setIsMuted] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);


    const Data=()=>{
    setVideo(`${ImageURL}${item.video}`)
    }

useEffect(()=>{
Data();
},[isFocused])

  return (
    <View style={{backgroundColor:COLORS.dark}}>
     <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.headerColor}
        />
         
          <View style={{
            height:"100%",
            width:"100%",
          }}>
             <Video
              source={{uri:video}}
              //paused={!isPlaying}
              controls={true}
              style={[StyleSheet.absoluteFill]}
              muted={isMuted}
              tapAnywhereToPause={true}
              repeat={true}
            />
          </View>

<View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              width: '100%',
              marginTop: platForm == 'ios' ? responsiveHeight(5) : 0,
              flexDirection: 'row',
              position:"absolute"
            }}>
              <Icon
                name="arrow-back-ios"
                size={24}
                color={COLORS.white}
                onPress={() => navigation.goBack()}
              />
          </View>

    </View>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({})