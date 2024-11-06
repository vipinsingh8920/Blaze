import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions,ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import COLORS from '../../../Components/Color';
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native';
import { responsiveHeight,responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions';
import ClubVideo from '../../../Components/ClubVideo';
import { ApiURL, postData } from '../../../helpers/axios';
import axios from 'react-native-axios'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function ClubGallery({item}) {

const isFocused=useIsFocused();

    const navigation = useNavigation();
    const [image, setImage] = useState("");
    const [video, setVideo] = useState('');
    const [isLoading,setIsLoading] = useState(false);

 const GetData=async()=>{
    setIsLoading(true)
    let res1=await axios.get(`${ApiURL}stadium-gallery/?uid=${item.id}&type=video`)
    let res2=await axios.get(`${ApiURL}stadium-gallery/?uid=${item.id}&type=image`)
    setImage(res2?.data.data)
    setVideo(res1?.data.data);
    setIsLoading(false)
 }

 useEffect(()=>{
    GetData()
 },[isFocused])
  
    const chooseImagesFromGallery = async () => {
        ImagePicker.openPicker({
          width: 800,
          height: 800,
          cropping: true,
        }).then(async image => {
          try {
            setIsLoading(true)
            let formdata = new FormData();
            formdata.append('uid', item.id);
            formdata.append('type', 'image');
            formdata.append('media', {
                uri: image.path,
                name: 'image.jpg',
                type: 'image/jpeg',
              });
            let res= await axios.post(`${ApiURL}add-stadium-gallery`, formdata, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            });
            GetData()
            console.log(res.data)
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        });
      };
    

      const ChooseVideossFromGallery = async () => {
        ImagePicker.openPicker({
            mediaType: "video",
        }).then(async image => {
          try {
            setIsLoading(true)
            let formdata = new FormData();
            formdata.append('uid', item.id);
            formdata.append('type', 'video');
            formdata.append('media', {
                uri: image.path,
                name: 'video.mp4',
                type: 'video/mp4',
              });
            let res= await axios.post(`${ApiURL}add-stadium-gallery`, formdata, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            });
            GetData()
            console.log(res.data)
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        });
      };

      const updateImagesFromGallery = async item => {
        console.log(item)
        ImagePicker.openPicker({
          width: 800,
          height: 800,
          cropping: true,
        }).then(async image => {
          try {
            let formdata = new FormData();
            formdata.append('id', item);
            formdata.append('type', 'image');
            formdata.append('media', {
              uri: image.path,
              name: 'image.jpg',
              type: 'image/jpeg',
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
 
const userDetail=useSelector(state=>state.user);

    const renderItem=({item,index})=>{
   
      return(
        
        <View key={index}>
      <View style={{borderColor: '#fff', padding: 8}} >
        <TouchableOpacity
          onPress={() => updateImagesFromGallery(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
          }}>
          <View style={{borderRadius: 10}}>
            <Image style={styles.photos} source={{uri: `${item.media}`}} />

     {userDetail?.userData.id==item.cms_users_id?    <View
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
           
          </View>
        </TouchableOpacity>
      </View>
      </View>
      )
    }

    return (
        <View style={styles.maincontainer}>

          {userDetail?.userData.id==item.id?  <TouchableOpacity style={styles.btn} onPress={chooseImagesFromGallery}>
                <Text style={styles.photoss}>Upload Photos</Text>
            </TouchableOpacity>: <TouchableOpacity style={styles.btn} >
                <Text style={styles.photoss}>Photos</Text>
            </TouchableOpacity>}
            {/* <Image
                style={{ marginLeft: 20, width: 100, height: 100, resizeMode: 'cover', borderRadius: 10, borderWidth: 1, borderColor: COLORS.white }}
                source={{ uri: image }}
            /> */}

            <View style={{ marginTop: 20 }}>
                <FlatList
                horizontal={true}
                    data={image}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    //numColumns={3}
                />
            </View>
            <View style={{ marginTop: 20 }}>
               {userDetail?.userData.id==item.id? <TouchableOpacity style={styles.btn} onPress={ChooseVideossFromGallery}>
                    <Text style={styles.photoss}>Upload videos</Text>
                </TouchableOpacity>:<TouchableOpacity style={styles.btn}>
                    <Text style={styles.photoss}>videos</Text>
                </TouchableOpacity>}

               <ClubVideo setVideo={setVideo} item={item} video={video}/>

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
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: '100%',
        marginTop: 10
    },
   
    photos: {
        width: Dimensions.get('screen').width - 230,
        height: Dimensions.get('screen').width - 200,
        resizeMode: 'cover',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 1
    },
    photoss: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.dark,
        display: 'flex',
        alignSelf: 'center'
    },
    header: {
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: COLORS.lightGrey,
        // paddingBottom: 20,
        borderColor: COLORS.white,
        borderWidth: 1,
        paddingTop: 10
    },
    btn: {
        backgroundColor: COLORS.headerColor,
        padding: 5,
        borderColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        width: '30%',
        display: 'flex',
        alignSelf: 'flex-end'
    }
});