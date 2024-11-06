import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import {Alert, Modal,ActivityIndicator} from 'react-native';
import {Button} from 'react-native-paper';
import COLORS from './Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'react-native-axios'
import { ApiURL } from '../helpers/axios';
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function ClubVideo({item,setVideo,video}) {
  
const isFocused=useIsFocused();
const userDetail = useSelector(state => state.user);


  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading,setIsLoading] = useState(false);


  const GetData=async()=>{
    setIsLoading(true)
    let res1=await axios.get(`${ApiURL}stadium-gallery/?uid=${item.id}&type=video`)
    setVideo(res1?.data.data);
    setIsLoading(false)
 }

 useEffect(()=>{
  GetData()
 },[isFocused])

  const updateImagesFromGallery = async item => {
    console.log(item)
    ImagePicker.openPicker({
      mediaType: "video",
  }).then(async image => {
      try {
        let formdata = new FormData();
        formdata.append('id', item);
        formdata.append('type', 'video');
        formdata.append('media', {
          uri: image.path,
          name: 'video.mp4',
          type: 'video/mp4',
        });
        const data = await axios.post(`${ApiURL}update-stadium-gallery/${item}`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(data.data);
        GetData();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    });
  };


  
const deleteImageData = async item => {
Alert.alert('Delete', 'Do you want to delete this?', [
  {
    text: 'No',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {
    text: 'Yes',
    onPress: async () => {
      try {
        setIsLoading(true);
        await axios.delete(`${ApiURL}delete-stadium-gallery/${item}`);
        await GetData();
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e.message);
      }
    },
  },
]);
};


  const PlayVideo = item => {
    setUrl(item.media);
    setModalVisible(!modalVisible);
  };


  const renderItem = ({item}) => {
    
    return (
      <View style={{padding: 10}}>
        <View>
          <ImageBackground
            style={styles.thumbnail}
            source={require('../Assets/soccer.jpg')}
            imageStyle={{borderRadius: responsiveWidth(2)}}>

{userDetail?.userData.id==item.cms_users_id?<View
              style={{
                position: 'absolute',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
              }}>
       
             <TouchableOpacity
                onPress={() => updateImagesFromGallery(item.id)}
                style={{
                  marginLeft: 7,
                  marginVertical: 7,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  backgroundColor: COLORS.darkgrey2,
                }}>
                <FontAwesome
                  name="pencil"
                  size={responsiveFontSize(2)}
                  style={{color: COLORS.white}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteImageData(item.id)}
                style={{
                  marginRight: 7,
                  marginVertical: 7,
                  borderRadius: 14,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  backgroundColor: COLORS.darkgrey2,
                }}>
                <FontAwesome
                  color={COLORS.warning}
                  name="trash"
                  size={responsiveFontSize(2)}
                />
              </TouchableOpacity>
          
              
            </View>:""}

            <TouchableOpacity
              onPress={() => PlayVideo(item)}
              style={{
                position: 'absolute',
                display: 'flex',
                //alignSelf: 'center',
                //top: 30,
                width: '100%',
                //left: 40,
                borderRadius: 100,
                width: 30,
                height: 30,
                resizeMode: 'cover',
                marginTop:responsiveHeight(8)
              }}>
              <Image
                style={{
                  position: 'relative',
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  tintColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                source={require('../Assets/play.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          style={styles.modalStyle}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
       
            <View
              style={{
                height: responsiveHeight(4),
                width: responsiveWidth(100),
                justifyContent: 'center',
                backgroundColor:COLORS.headerColor,
                zIndex:10000
              }}>
              <Icon
                name="arrow-back-ios"
                size={24}
                color={COLORS.white}
                style={{marginLeft: responsiveWidth(3)}}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View style={{
              height:responsiveHeight(100),
              width:responsiveWidth(100),
              backgroundColor:COLORS.headerColor
            }}></View>
            <Video
              source={{uri: url}}
              paused={!isPlaying}
              controls={true}
              style={[StyleSheet.absoluteFill]}
              muted={isMuted}
              tapAnywhereToPause={true}
            />
        </Modal>
      </View>

      <View>
        <View style={{marginTop: 20}}>
          <FlatList
            horizontal={true}
            data={video}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        {isLoading && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  photos: {
    width: Dimensions.get('screen').width - 290,
    height: Dimensions.get('screen').width - 300,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  backgroundVideo: {
height:responsiveHeight(100),
width:responsiveWidth(100)
  },
  modalStyle: {
    width: '100%',
    height: '100%',
    
  },
  centeredView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    height: responsiveHeight(20),
    width: responsiveWidth(60),
    //justifyContent: 'center',
    alignItems: 'center',
  },
});
